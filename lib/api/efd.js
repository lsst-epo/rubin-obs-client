import { InfluxDB, flux } from "@influxdata/influxdb-client";
import { useEffect, useState } from "react";

export default function getEfd() {
  const url = process.env.NEXT_PUBLIC_EFD_URL;
  const bucket = process.env.NEXT_PUBLIC_EFD_BUCKET;
  const token = process.env.NEXT_PUBLIC_EFD_TOKEN;

  const influxDB = new InfluxDB({ url, token });
  const queryApi = influxDB.getQueryApi("");

  return new Promise((resolve, reject) => {
    const data = {};
    queryApi.queryRows(
      flux`from(bucket: "${bucket}")
      |> range(start: -60s)
      |> filter(fn: (r) => r["_measurement"] == "lsst.sal.ESS.pressure" or r["_measurement"] == "lsst.sal.ESS.dewPoint" or r["_measurement"] == "lsst.sal.ESS.temperature" or r["_measurement"] == "lsst.sal.ESS.relativeHumidity" or r["_measurement"] == "lsst.sal.ESS.airFlow")
      |> filter(fn: (r) => r["_field"] == "temperature0" or r["_field"] == "speed" or r["_field"] == "pressure0" or r["_field"] == "direction")
      |> last()`,
      {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          const { _field } = o;
          data[_field] = o;
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

export function useEfd(fluxQuery) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const url = process.env.NEXT_PUBLIC_EFD_URL;
  const bucket = process.env.NEXT_PUBLIC_EFD_BUCKET;
  const token = process.env.NEXT_PUBLIC_EFD_TOKEN;

  const influxDB = new InfluxDB({ url, token });
  const queryApi = influxDB.getQueryApi("");

  useEffect(() => {
    async function fetchQuery() {
      try {
        setLoading(true);
        const response = new Promise((resolve, reject) => {
          const data = [];
          queryApi.queryRows(
            flux`from(bucket: "${bucket}")
                    |> range(start: 2023-05-31T19:00:00Z, stop: 2023-05-31T20:00:00Z)
                    |> filter(fn: (r) => r["_measurement"] == "lsst.sal.ESS.temperature")
                    |> filter(fn: (r) => r["_field"] == "temperature0")
                    |> last()`,
            {
              next(row, tableMeta) {
                const o = tableMeta.toObject(row);
                data.push(o);
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

        await response
          .then((res) => {
            setResult(res);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
      }
    }

    fetchQuery();
  }, [fluxQuery]);

  return [result, loading];
}
