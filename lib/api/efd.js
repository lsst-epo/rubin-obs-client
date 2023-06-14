import { InfluxDB, flux } from "@influxdata/influxdb-client";

export default function getEfd() {
  const url = process.env.NEXT_PUBLIC_EFD_URL;
  const bucket = process.env.NEXT_PUBLIC_EFD_BUCKET;
  const token = process.env.NEXT_PUBLIC_EFD_TOKEN;

  const influxDB = new InfluxDB({ url, token });
  const queryApi = influxDB.getQueryApi("");

  return new Promise((resolve, reject) => {
    let data = {};
    queryApi.queryRows(
      flux`from(bucket: "${bucket}")
      |> range(start: -60s)
      |> filter(fn: (r) => r["_measurement"] == "lsst.sal.ESS.temperature" or r["_measurement"] == "lsst.sal.ESS.relativeHumidity" or r["_measurement"] == "lsst.sal.ESS.airFlow")
      |> filter(fn: (r) => r["_field"] == "relativeHumidity" or r["_field"] == "temperature0" or r["_field"] == "speed" or r["_field"] == "pressure0")
      |> last()
      |> set(key: "_pivoter", value: "stuff")
      |> group()
      |> pivot(rowKey:["_pivoter"], columnKey: ["_field"], valueColumn: "_value")
      |> drop(columns: ["_pivoter"])
      |> rename(columns: {speed: "windSpeed"})`,
      {
        next(row, tableMeta) {
          data = tableMeta.toObject(row);
        },
        error(error) {
          reject(error);
        },
        complete() {
          resolve(data);
        },
      }
    );
  });
}
