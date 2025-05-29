"use server";

import { env } from "@/env";
import revalidateUri from "@/services/revalidation";

export default async function revalidate({
  uri,
  token,
}: {
  uri: string;
  token: string;
}) {
  if (uri && token === env.CRAFT_REVALIDATE_SECRET_TOKEN) {
    return revalidateUri(uri);
  }
}
