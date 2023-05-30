import { InfluxDB, flux } from "@influxdata/influxdb-client";
import { useEffect, useState } from "react";

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
                    |> range(start: -1s)
                    |> last()
                    |> filter(fn: (r) => r["_measurement"] == "lsst.sal.ESS.temperature")
                    |> filter(fn: (r) => r["_field"] == "temperature0")`,
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
