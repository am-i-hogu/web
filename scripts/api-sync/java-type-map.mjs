const PRIMITIVE_TYPE_MAP = new Map([
  ["long", "number"],
  ["Long", "number"],
  ["int", "number"],
  ["Integer", "number"],
  ["double", "number"],
  ["Double", "number"],
  ["float", "number"],
  ["Float", "number"],
  ["boolean", "boolean"],
  ["Boolean", "boolean"],
  ["String", "string"],
  ["LocalDate", "string"],
  ["LocalDateTime", "string"],
  ["OffsetDateTime", "string"],
  ["ZonedDateTime", "string"],
  ["Instant", "string"],
]);

// ----------------------
// Java -> TypeScript 타입 매핑
// ----------------------
// 서버 record 이름은 프론트에서 DTO임을 명확히 보이도록 *Dto suffix를 붙입니다.

export function toDtoTypeName(javaType) {
  const cleanType = javaType.trim();
  return cleanType.endsWith("Dto") ? cleanType : `${cleanType}Dto`;
}

export function javaTypeToTsType(javaType) {
  const cleanType = javaType.trim();
  const listMatch = cleanType.match(/^(?:List|ArrayList|Set)<(.+)>$/);
  if (listMatch) {
    return `${javaTypeToTsType(listMatch[1])}[]`;
  }

  const nullableMatch = cleanType.match(/^JsonNullable<(.+)>$/);
  if (nullableMatch) {
    return `${javaTypeToTsType(nullableMatch[1])} | null`;
  }

  if (PRIMITIVE_TYPE_MAP.has(cleanType)) {
    return PRIMITIVE_TYPE_MAP.get(cleanType);
  }

  return toDtoTypeName(cleanType);
}

export function mockValueForTsType(tsType, fieldName) {
  if (tsType.endsWith("[]")) {
    return "[]";
  }
  if (tsType === "number") {
    return /id$/i.test(fieldName) ? "1" : "0";
  }
  if (tsType === "boolean") {
    return "false";
  }
  if (tsType === "string") {
    if (/At$|Date$|Time$/i.test(fieldName)) {
      return '"2026-05-22T00:00:00"';
    }
    return '""';
  }
  if (tsType.includes(" | null")) {
    return "null";
  }
  return null;
}
