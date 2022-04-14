import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Button } from "@/components/atomic";
import Loader from "@/components/svg/unique/Loader";
import { useSiblingNav } from "@/lib/api/sibling-nav";
import { getSiteString } from "@/lib/utils";
import T from "@/page/Translate";
import Container from "../Container";
import Grid from "../Grid";

export default function SiblingNavigation({ pageUri, pageLevel }) {
  const router = useRouter();
  const { query } = router;
  const site = getSiteString(query.uriSegments);

  const response = useSiblingNav({ uri: pageUri, site, level: pageLevel });

  const entry = response?.data?.entry;

  if (!entry) return null;

  return (
    <Container width="narrow" paddingSize="large" className="l-mar-top-small">
      {response.isLoading ? (
        <Loader />
      ) : !response.isError ? (
        <Grid columns={1}>
          <Grid columns={2}>
            <Button
              as="a"
              href={entry.prev ? `/${entry.prev.uri}` : undefined}
              aria-disabled={!entry.prev || undefined}
            >
              <T
                translate={
                  entry.prev
                    ? "pagination.previous_name"
                    : "pagination.previous"
                }
                values={{ name: entry.prev?.title }}
              />
            </Button>
            <Button
              as="a"
              href={entry.next ? `/${entry.next.uri}` : undefined}
              aria-disabled={!entry.next || undefined}
            >
              <T
                translate={
                  entry.next ? "pagination.next_name" : "pagination.next"
                }
                values={{ name: entry.next?.title }}
              />
            </Button>
          </Grid>
          {entry.parent && (
            <Button as="a" href={`/${entry.parent.uri}`}>
              <T
                translate="pagination.back_to_name"
                values={{ name: entry.parent.title }}
              />
            </Button>
          )}
        </Grid>
      ) : null}
    </Container>
  );
}

SiblingNavigation.propTypes = {
  pageUri: PropTypes.string.isRequired,
  pageLevel: PropTypes.number.isRequired,
};
