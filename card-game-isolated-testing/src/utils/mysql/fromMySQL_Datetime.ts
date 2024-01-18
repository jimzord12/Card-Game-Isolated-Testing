export function fromMySQL_Datetime(mysqlDatetime: string) {
  const localDatetime = mysqlDatetime.slice(0, 19);
  const date = new Date(localDatetime);
  return date.getTime() * 1000;
}
