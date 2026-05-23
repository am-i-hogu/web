// ----------------------
// TypeScript DTO 생성
// ----------------------
// Java record를 프론트에서 import 가능한 type alias로 변환합니다.

export function generateTypeScriptDto(records, options = {}) {
  const domain = options.domain ?? "api";
  const lines = [
    "// AUTO-GENERATED from am-i-hogu/api Java records.",
    "// Do not edit manually. Run `pnpm sync:api` instead.",
    `// Domain: ${domain}`,
    "",
  ];

  for (const record of records) {
    lines.push(`export type ${record.tsName} = {`);
    for (const field of record.fields) {
      lines.push(`  ${field.name}: ${field.tsType};`);
    }
    lines.push("};", "");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}
