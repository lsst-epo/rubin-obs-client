"server-only";
import { revalidateTag } from "next/cache";
import tags from "@/lib/api/client/tags";

type Revalidator = (parts: Array<string>) => void;

const revalidateGalleries: Revalidator = (parts) => {
  const [, , slug] = parts;

  if (slug) {
    revalidateTag(slug);
  }
};

const revalidators: Record<string, Revalidator> = {
  gallery: revalidateGalleries,
};

const additionalRevalidations: Revalidator = (parts) => {
  const section = parts[0];
  const revalidator = revalidators[section];

  if (tags[section]) {
    revalidateTag(tags[section]);
  }

  revalidator && revalidator(parts);

  revalidateTag(tags.globals);
};

export default additionalRevalidations;
