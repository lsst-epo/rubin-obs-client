import PropTypes from "prop-types";
import { Button } from "@/components/atomic";
import T from "@/page/Translate";
import { Container, Grid } from "@rubin-epo/epo-react-lib";

export default function SiblingNavigation({ siblings, parent }) {
  if (!siblings) return null;

  return (
    <Container width="narrow" paddingSize="large" className="l-mar-top-small">
      <Grid columns={1}>
        {(siblings.prev || siblings.next) && (
          <Grid columns={2}>
            <Button
              as="a"
              href={siblings.prev ? `/${siblings.prev.uri}` : undefined}
              aria-disabled={!siblings.prev || undefined}
            >
              <T
                translate={
                  siblings.prev
                    ? "pagination.previous_name"
                    : "pagination.previous"
                }
                values={{ name: siblings.prev?.title }}
              />
            </Button>
            <Button
              as="a"
              href={siblings.next ? `/${siblings.next.uri}` : undefined}
              aria-disabled={!siblings.next || undefined}
            >
              <T
                translate={
                  siblings.next ? "pagination.next_name" : "pagination.next"
                }
                values={{ name: siblings.next?.title }}
              />
            </Button>
          </Grid>
        )}
        {parent && (
          <Button as="a" href={`/${parent.uri}`}>
            <T
              translate="pagination.back_to_name"
              values={{ name: parent.title }}
            />
          </Button>
        )}
      </Grid>
    </Container>
  );
}

const siblingShape = PropTypes.shape({
  uri: PropTypes.string,
  title: PropTypes.string,
});

SiblingNavigation.propTypes = {
  siblings: PropTypes.shape({
    prev: siblingShape,
    next: siblingShape,
  }),
  parent: siblingShape,
};
