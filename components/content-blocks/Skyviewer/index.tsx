import { FC } from "react";
import { z } from "zod";
import Container from "@rubin-epo/epo-react-lib/Container";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import { env } from "@/env";
import { FragmentType, useFragment } from "@/gql";
import { SkyviewerBlockFragmentDoc } from "@/gql/graphql";
import { addLocaleUriSegment } from "@/lib/i18n";
import RichTextContent from "@/components/atomic/RichTextContent";
import styles from "./styles.module.css";

const skyviewerDefaultsSchema = z.object({
  embedTitle: z.string(),
  ra: z
    .number()
    .min(0)
    .max(360)
    .transform((v) => v?.toString())
    .catch(""),
  dec: z
    .number()
    .min(-90)
    .max(90)
    .transform((v) => v?.toString())
    .catch(""),
  fov: z
    .number()
    .min(0)
    .transform((v) => v?.toString())
    .catch(""),
  backgroundColor: z.string().optional().catch(undefined),
  fullWidth: z.boolean().catch(false),
});

interface SkyviewerProps
  extends FragmentType<typeof SkyviewerBlockFragmentDoc> {
  locale: string;
}

const SkyviewerBlock: FC<SkyviewerProps> = ({ locale, ...props }) => {
  const { captionRichText, ...parseAble } = useFragment(
    SkyviewerBlockFragmentDoc,
    props
  );
  const { data, error } = skyviewerDefaultsSchema.safeParse(parseAble);

  if (error) {
    console.warn(error.issues[0].message);
    return null;
  }

  const { ra, dec, fov, fullWidth, backgroundColor, embedTitle } = data;

  const params = new URLSearchParams({ ra, dec, fov });
  const path = addLocaleUriSegment(locale, `embed?${params.toString()}`);
  const src = new URL(path, env.SKYVIEWER_BASE_URL);
  const allowed = [
    "fullscreen",
    "clipboard-write",
    "clipboard-read",
    "web-share",
  ].join("; ");
  const sandbox = [
    "allow-downloads",
    "allow-scripts",
    "allow-popups",
    "allow-popups-to-escape-sandbox",
    "allow-same-origin",
  ].join(" ");

  const iframe = (
    <iframe
      data-cy="skyviewer"
      title={embedTitle}
      className={styles.iframe}
      data-embed={!fullWidth}
      src={src.href}
      allow={allowed}
      sandbox={sandbox}
      loading={fullWidth ? "eager" : "lazy"}
    />
  );

  const caption = captionRichText && <RichTextContent text={captionRichText} />;

  return fullWidth ? (
    <section
      className={styles.container}
      style={{ backgroundColor: backgroundColor && `--${backgroundColor}` }}
    >
      {iframe}
      {caption}
    </section>
  ) : (
    <Container paddingSize="small">
      <Figure caption={caption} withBackground>
        {iframe}
      </Figure>
    </Container>
  );
};

SkyviewerBlock.displayName = "ContentBlock.Skyviewer";

export default SkyviewerBlock;
