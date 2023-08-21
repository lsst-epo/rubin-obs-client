import { flux } from "@influxdata/influxdb-client";

export const currentWeather = (bucket) => flux`from(bucket: "${bucket}")
  |> range(start: -60s)
  |> filter(fn: (r) => r["_measurement"] == "lsst.sal.ESS.pressure" or r["_measurement"] == "lsst.sal.ESS.dewPoint" or r["_measurement"] == "lsst.sal.ESS.temperature" or r["_measurement"] == "lsst.sal.ESS.relativeHumidity" or r["_measurement"] == "lsst.sal.ESS.airFlow")
  |> filter(fn: (r) => r["_field"] == "relativeHumidity" or r["_field"] == "dewPoint" or r["_field"] == "temperature0" or r["_field"] == "speed" or r["_field"] == "pressure0" or r["_field"] == "direction")
  |> last()
  |> set(key: "_pivoter", value: "stuff")
  |> group()
  |> pivot(rowKey:["_pivoter"], columnKey: ["_field"], valueColumn: "_value")
  |> drop(columns: ["_pivoter"])
  |> rename(columns: {direction: "windDirection", speed: "windspeed"})
  |> yield(name: "realtime")`;

export const hourlyWeather = (bucket) => {
  return flux`
  import "date"
data = from(bucket: "${bucket}")
    |> range(start: date.truncate(t: now(), unit: 1d), stop: now())
    |> filter(fn: (r) => r["_measurement"] == "lsst.sal.ESS.pressure" or r["_measurement"] == "lsst.sal.ESS.dewPoint" or r["_measurement"] == "lsst.sal.ESS.temperature" or r["_measurement"] == "lsst.sal.ESS.relativeHumidity" or r["_measurement"] == "lsst.sal.ESS.airFlow")
    |> filter(fn: (r) => r["_field"] == "relativeHumidity" or r["_field"] == "dewPoint" or r["_field"] == "temperature0" or r["_field"] == "speed" or r["_field"] == "pressure0" or r["_field"] == "direction")
    |> drop(columns: ["_measurement"])
    
min = data
    |> aggregateWindow(every: 1h, fn: min)
    |> map(fn: (r) => ({r with _field: r._field + "_min"}))
      
mean = data
    |> aggregateWindow(every: 1h, fn: mean)
    |> map(fn: (r) => ({r with _field: r._field + "_mean"}))

max = data
    |> aggregateWindow(every: 1h, fn: max)
    |> map(fn: (r) => ({r with _field: r._field + "_max"}))
    
union(tables: [min, mean, max])
    |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
    |> yield(name: "historical")`;
};

export const dailyWeather = (bucket) => {
  const start = new Date();
  const end = new Date();

  start.setUTCDate(start.getUTCDate() - 7);
  start.setUTCHours(0, 0, 0, 0);
  const observatoryDate = new Date(
    start.toLocaleString("en-US", { timeZone: "America/Santiago" })
  );
  const diff = 24 - observatoryDate.getHours();

  start.setUTCHours(diff, 0, 0, 0);
  end.setUTCHours(diff, 0, 0, 0);

  return flux`data = from(bucket: "${bucket}")
      |> range(start: ${start}, stop: ${end})
      |> filter(fn: (r) => r["_measurement"] == "lsst.sal.ESS.temperature")
      |> filter(fn: (r) => r["_field"] == "temperature0")
      |> drop(columns: ["_measurement"])
      
  min = data
      |> aggregateWindow(every: 1d, fn: min, createEmpty: true)
      |> map(fn: (r) => ({r with _field: r._field + "_min"}))
  
  max = data
      |> aggregateWindow(every: 1d, fn: max, createEmpty: true)
      |> map(fn: (r) => ({r with _field: r._field + "_max"}))
      
  union(tables: [min, max])
      |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
      |> sort(columns: ["_time"])
      |> yield(name: "historical")`;
};
