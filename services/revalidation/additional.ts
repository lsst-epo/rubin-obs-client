"server-only";
import { revalidateTag } from "next/cache";
import tags from "@/lib/api/client/tags";

type Revalidator = (props: {
  parts: Array<string>;
  tagCollection: Set<string>;
}) => void;

const revalidateGalleries: Revalidator = ({ parts, tagCollection }) => {
  const [, , slug] = parts;

  if (slug) {
    tagCollection.add(slug);
    revalidateTag(slug);
  }
};

const revalidators: Record<string, Revalidator> = {
  gallery: revalidateGalleries,
};

const additionalRevalidations: Revalidator = ({ parts, tagCollection }) => {
  const section = parts[0];
  const revalidator = revalidators[section];

  if (tags[section]) {
    const tag = tags[section];
    tagCollection.add(tag);
    revalidateTag(tag);
  }

  revalidator && revalidator({ parts, tagCollection });

  tagCollection.add(tags.globals);
  revalidateTag(tags.globals);
};

export default additionalRevalidations;
