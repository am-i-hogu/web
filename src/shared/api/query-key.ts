type QueryKeyPart = string | number | boolean | null | undefined | Record<string, unknown>;

export function createDomainQueryKeys<const TDomain extends string>(domain: TDomain) {
  return {
    all: [domain] as const,
    lists: () => [domain, "list"] as const,
    list: (...params: QueryKeyPart[]) => [domain, "list", ...params] as const,
    details: () => [domain, "detail"] as const,
    detail: (id: string | number) => [domain, "detail", id] as const,
  };
}
