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
  |> rename(columns: {direction: "windDirection", speed: "windSpeed"})
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
  const date = new Date();
  date.setDate(date.getDate() - 7);
  date.setHours(0, 0, 0, 0);
  return flux`data = from(bucket: "${bucket}")
      |> range(start: ${date}, stop: now())
      |> filter(fn: (r) => r["_measurement"] == "lsst.sal.ESS.pressure" or r["_measurement"] == "lsst.sal.ESS.dewPoint" or r["_measurement"] == "lsst.sal.ESS.temperature" or r["_measurement"] == "lsst.sal.ESS.relativeHumidity" or r["_measurement"] == "lsst.sal.ESS.airFlow")
      |> filter(fn: (r) => r["_field"] == "relativeHumidity" or r["_field"] == "dewPoint" or r["_field"] == "temperature0" or r["_field"] == "speed" or r["_field"] == "pressure0" or r["_field"] == "direction")
      |> drop(columns: ["_measurement"])
      
  min = data
      |> aggregateWindow(every: 1d, fn: min, createEmpty: true)
      |> map(fn: (r) => ({r with _field: r._field + "_min"}))
        
  mean = data
      |> aggregateWindow(every: 1d, fn: mean, createEmpty: true)
      |> map(fn: (r) => ({r with _field: r._field + "_mean"}))
  
  max = data
      |> aggregateWindow(every: 1d, fn: max, createEmpty: true)
      |> map(fn: (r) => ({r with _field: r._field + "_max"}))
      
  union(tables: [min, mean, max])
      |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
      |> sort(columns: ["_time"])
      |> yield(name: "historical")`;
};
