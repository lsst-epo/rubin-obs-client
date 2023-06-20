import { InfluxDB } from "@influxdata/influxdb-client";

export default function queryEfd(query) {
  const url = process.env.NEXT_PUBLIC_EFD_URL;
  const bucket = process.env.NEXT_PUBLIC_EFD_BUCKET;
  const token = process.env.NEXT_PUBLIC_EFD_TOKEN;

  const influxDB = new InfluxDB({ url, token });
  const queryApi = influxDB.getQueryApi("");

  return new Promise((resolve, reject) => {
    const data = [];
    queryApi.queryRows(query(bucket), {
      next(row, tableMeta) {
        data.push(tableMeta.toObject(row));
      },
      error(error) {
        reject(error);
      },
      complete() {
        resolve(data);
      },
    });
  });
}
