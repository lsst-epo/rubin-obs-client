import { client } from "./schema/client.gen";
import requestInterceptors from "./interceptors/request";
export * from "./schema/types.gen";
export * from "./schema/sdk.gen";

requestInterceptors.forEach((interceptor) => {
  client.interceptors.request.use(interceptor);
});
