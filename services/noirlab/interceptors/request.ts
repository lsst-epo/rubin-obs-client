import { RequestOptions } from "@hey-api/client-next";
import { env } from "@/env";

const isServer = typeof window === "undefined";

const addCaching = (options: RequestOptions) => {
  const isMedia = new RegExp(/\/media\/(images|videos)\//).test(options.url);

  if (isServer) {
    if (!options.cache) {
      options.cache = "force-cache";
    }

    if (isMedia) {
      options.next = {
        revalidate: env.NOIRLAB_REVALIDATE,
        ...options.next,
      };
    }
  }
};

export default [addCaching];
