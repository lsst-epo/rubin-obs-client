import { InfluxDB } from "@influxdata/influxdb-client";
import {
  currentWeather,
  dailyWeather,
  hourlyWeather,
} from "@/lib/api/queries/weather";

const types = {
  current: currentWeather,
  hourly: hourlyWeather,
  daily: dailyWeather,
};

export default function handler(req, res) {
  const url = process.env.EFD_URL;
  const bucket = process.env.EFD_BUCKET;
  const token = process.env.EFD_TOKEN;

  const influxDB = new InfluxDB({ url, token });
  const queryApi = influxDB.getQueryApi("");

  const { type } = req.query;
  const query = types[type];

  const data = [];

  queryApi.queryRows(query(bucket), {
    next(row, tableMeta) {
      data.push(tableMeta.toObject(row));
    },
    error(error) {
      return res.status(405).json(error);
    },
    complete() {
      return res.status(200).json(type === "current" ? data[0] : data);
    },
  });
}
