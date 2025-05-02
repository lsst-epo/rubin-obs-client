import { FC, Suspense } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import Grid from "@rubin-epo/epo-react-lib/Grid";
import { useTranslation } from "@/lib/i18n";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import { getSiblings } from "@/services/craft/siblings";
import Button from "@rubin-epo/epo-react-lib/Button";

interface SiblingNavigationContentProps {
  uri: string;
  parentId: string;
  level: number;
}

interface SiblingNavigationProps extends SiblingNavigationContentProps {
  returnTo: {
    title: string;
    uri: string;
  };
}

const SiblingNavigationContent: FC<SiblingNavigationContentProps> = async ({
  uri,
  parentId,
  level,
}) => {
  const { t } = await useTranslation();
  const data = await getSiblings(parentId, uri, level);

  if (!data) {
    return null;
  }

  const { siblings } = data;

  return (
    <>
      <Buttonish
        href={siblings?.prev ? `/${siblings.prev.uri}` : "#"}
        rel="prev"
        isInactive={siblings?.prev === null}
      >
        {t(
          siblings?.prev ? "pagination.previous_name" : "pagination.previous",
          {
            name: siblings?.prev?.title,
          }
        )}
      </Buttonish>
      <Buttonish
        href={siblings?.next ? `/${siblings?.next.uri}` : "#"}
        rel="next"
        isInactive={siblings?.next === null}
      >
        {t(siblings?.next ? "pagination.next_name" : "pagination.next", {
          name: siblings?.next?.title,
        })}
      </Buttonish>
    </>
  );
};

const SiblingNavigation: FC<SiblingNavigationProps> = async ({
  returnTo,
  ...props
}) => {
  const { t } = await useTranslation();

  return (
    <Container width="narrow" paddingSize="large" className="l-mar-top-small">
      <Grid columns={1} tablet={1} showFeature={false}>
        <Grid columns={2} tablet={2} showFeature={false}>
          <Suspense
            fallback={
              <>
                <Button disabled>{t("pagination.previous")}</Button>
                <Button disabled>{t("pagination.next")}</Button>
              </>
            }
          >
            <SiblingNavigationContent {...props} />
          </Suspense>
        </Grid>
        <Buttonish href={`/${returnTo.uri}`}>
          {t("pagination.back_to_name", { name: returnTo.title })}
        </Buttonish>
      </Grid>
    </Container>
  );
};

SiblingNavigation.displayName = "Molecule.SiblingNavigation";

export default SiblingNavigation;
