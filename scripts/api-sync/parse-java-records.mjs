import { javaTypeToTsType, toDtoTypeName } from "./java-type-map.mjs";

// ----------------------
// Java record 파서
// ----------------------
// Spring 서버 DTO가 public record 중심이라, class 전체 AST 대신 record 선언만 가볍게 읽습니다.
// 예: public record PostDetailResponse(Long postId, List<String> categories) {}

function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

function splitRecordFields(rawBody) {
  const fields = [];
  let current = "";
  let depth = 0;

  for (const character of rawBody) {
    if (character === "<") depth += 1;
    if (character === ">") depth -= 1;
    if (character === "," && depth === 0) {
      if (current.trim()) fields.push(current.trim());
      current = "";
      continue;
    }
    current += character;
  }

  if (current.trim()) fields.push(current.trim());
  return fields;
}

function parseRecordField(rawField) {
  // @JsonInclude(NON_NULL)은 응답에서 빠질 수 있는 값이라 TS 타입에 null을 붙입니다.
  const isNullable = /@JsonInclude\s*\(\s*JsonInclude\.Include\.NON_NULL\s*\)/.test(rawField);
  const normalized = rawField
    .replace(/@\w+(?:\([^)]*(?:\)[^)]*)?\))?/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const match = normalized.match(/^(.+)\s+([A-Za-z_$][\w$]*)$/);
  if (!match) {
    throw new Error(`Unable to parse Java record field: ${rawField}`);
  }

  const javaType = match[1].trim();
  const tsType = javaTypeToTsType(javaType);
  return {
    name: match[2],
    javaType,
    tsType: isNullable && !tsType.includes("null") ? `${tsType} | null` : tsType,
  };
}

export function parseJavaRecords(files) {
  const records = [];

  for (const file of files) {
    const source = stripComments(file.source);
    const recordPattern = /public\s+record\s+([A-Za-z_$][\w$]*)\s*\(([\s\S]*?)\)\s*\{/g;
    let match = recordPattern.exec(source);

    while (match !== null) {
      const name = match[1];
      const rawFields = match[2].trim();
      records.push({
        name,
        tsName: toDtoTypeName(name),
        sourcePath: file.path,
        fields: rawFields ? splitRecordFields(rawFields).map(parseRecordField) : [],
      });
      match = recordPattern.exec(source);
    }
  }

  return records.sort((left, right) => left.name.localeCompare(right.name));
}
