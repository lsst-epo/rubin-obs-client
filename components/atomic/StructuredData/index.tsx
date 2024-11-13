import { Thing, WithContext } from "schema-dts";

interface StructuredDataProps<T> {
  id?: string;
  jsonLd: T;
}

function StructuredData<T extends Thing>({
  jsonLd,
  id,
}: StructuredDataProps<T>) {
  if (typeof jsonLd !== "object") {
    return (
      <script
        id={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      ></script>
    );
  }

  const withContext: WithContext<T> = {
    "@context": "https://schema.org",
    ...jsonLd,
  };

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(withContext) }}
    ></script>
  );
}

StructuredData.displayName = "Atom.StructuredData";

export default StructuredData;
