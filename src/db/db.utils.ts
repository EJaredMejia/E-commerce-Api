import { type SQL, sql, type Column } from "drizzle-orm";
type JsonBuildObjectParam = Record<string, Column | SQL>;

interface JsonAggParams<T extends JsonBuildObjectParam> {
  columnsMap: T;
  filter: SQL;
}

type InferJsonBuildObjectParam<T extends JsonBuildObjectParam> =
  T extends JsonBuildObjectParam
    ? {
        [K in keyof T]: T[K] extends Column
          ? T[K]["_"]["data"]
          : T[K] extends SQL | SQL.Aliased
            ? T[K]["_"]["type"]
            : never;
      }
    : never;
export function jsonAgg<T extends JsonBuildObjectParam>({
  columnsMap,
  filter,
}: JsonAggParams<T>) {
  return sql<InferJsonBuildObjectParam<T>[]>`
              COALESCE(
                json_group_array(${jsonBuildObject(columnsMap)}) FILTER (WHERE ${filter}),
                json_array()
              )`.mapWith({ mapFromDriverValue: (v: string): InferJsonBuildObjectParam<T>[] => JSON.parse(v) });
}

export function jsonBuildObject<T extends JsonBuildObjectParam>(columnsMap: T) {
  const chunks = Object.entries(columnsMap).map(([key, column]) => {
    return sql`'${sql.raw(key)}', ${column}`;
  });
  return sql<
    InferJsonBuildObjectParam<T>
  >`json_object(${sql.join(chunks, sql`, `)})`;
}
