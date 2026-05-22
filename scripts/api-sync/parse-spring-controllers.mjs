const METHOD_BY_ANNOTATION = {
  GetMapping: "GET",
  PostMapping: "POST",
  PutMapping: "PUT",
  PatchMapping: "PATCH",
  DeleteMapping: "DELETE",
};

// ----------------------
// Spring controller 파서
// ----------------------
// @RequestMapping prefix와 각 HTTP mapping annotation을 읽어 실제 API에 걸린 DTO를 찾습니다.
// 복잡한 overload보다 현재 API repo의 Controller 패턴에 맞춘 얇은 parser입니다.

function extractAnnotationPath(source, annotationName) {
  const pattern = new RegExp(`@${annotationName}\\s*(?:\\(([^)]*)\\))?`);
  const match = source.match(pattern);
  if (!match) return "";
  const args = match[1] ?? "";
  const pathMatch = args.match(/"([^"]*)"/);
  return pathMatch?.[1] ?? "";
}

function joinPaths(prefix, endpoint) {
  const left = prefix ? `/${prefix}`.replace(/\/+/g, "/").replace(/\/$/, "") : "";
  const right = endpoint ? `/${endpoint}`.replace(/\/+/g, "/") : "";
  return `${left}${right}` || "/";
}

function extractRequestType(params) {
  const requestBodyMatch = params.match(/@RequestBody(?:\([^)]*\))?\s+([A-Za-z_$][\w$<>]*)\s+[A-Za-z_$][\w$]*/);
  if (requestBodyMatch) return requestBodyMatch[1];

  const modelAttributeMatch = params.match(/@ModelAttribute(?:\([^)]*\))?\s+([A-Za-z_$][\w$<>]*)\s+[A-Za-z_$][\w$]*/);
  return modelAttributeMatch?.[1] ?? null;
}

function extractResponseType(returnType) {
  const responseEntityMatch = returnType.match(/ResponseEntity<\s*([A-Za-z_$][\w$<>]*)\s*>/);
  if (responseEntityMatch) return responseEntityMatch[1];
  return returnType === "void" ? null : returnType;
}

export function parseSpringController(file) {
  const classMatch = file.source.match(/public\s+class\s+([A-Za-z_$][\w$]*)/);
  const controller = classMatch?.[1] ?? "UnknownController";
  const prefix = extractAnnotationPath(file.source, "RequestMapping");
  const endpoints = [];
  const endpointPattern =
    /@(GetMapping|PostMapping|PutMapping|PatchMapping|DeleteMapping)\s*(?:\(([^)]*)\))?\s+public\s+([A-Za-z_$][\w$<>]*)\s+([A-Za-z_$][\w$]*)\s*\(([\s\S]*?)\)\s*\{/g;

  let match = endpointPattern.exec(file.source);
  while (match !== null) {
    const annotation = match[1];
    const annotationArgs = match[2] ?? "";
    const endpointPath = annotationArgs.match(/"([^"]*)"/)?.[1] ?? "";
    const returnType = match[3];
    const handler = match[4];
    const params = match[5].replace(/\s+/g, " ");

    endpoints.push({
      controller,
      handler,
      method: METHOD_BY_ANNOTATION[annotation],
      path: joinPaths(prefix, endpointPath),
      responseType: extractResponseType(returnType),
      requestType: extractRequestType(params),
      sourcePath: file.path,
    });
    match = endpointPattern.exec(file.source);
  }

  return endpoints;
}
