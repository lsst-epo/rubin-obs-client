import PropTypes from "prop-types";
import ExpandToggle from "@/components/atomic/ExpandToggle";
import useToggle from "@/hooks/useToggle";
import { tokens } from "@/styles/globalStyles";
import { stripUnit } from "@castiron/style-mixins/dist/base";
import useResizeObserver from "use-resize-observer";
import Container from "../Container";
import * as Styled from "./styles";

const BREAKPOINT = stripUnit(tokens.BREAK_PHABLET);

export default function GuideNavigation({ title, pages, currentUri }) {
  const [isOpen, onToggle, setIsOpen] = useToggle(false);

  const { ref } = useResizeObserver({
    onResize: ({ width }) => {
      if (width >= BREAKPOINT) {
        setIsOpen(true);
      }
    },
  });

  if (!pages) return null;

  return (
    <Container
      width="regular"
      bgColor="orange02"
      paddingSize="medium"
      className="l-mar-bottom-large"
    >
      <Styled.Wrapper ref={ref}>
        <Styled.Title>
          <h2>{title}</h2>
          <ExpandToggle
            onClick={onToggle}
            isOpen={isOpen}
            controlsId="guideNavList"
          />
        </Styled.Title>
        <Styled.NavList
          id="guideNavList"
          $rows={pages.length / 2}
          open={isOpen}
        >
          {pages.map((page, i) => (
            <Styled.NavItem key={i} $active={page.uri === currentUri}>
              <Styled.NavLink
                href={`/${page.uri}`}
                aria-current={page.uri === currentUri ? "page" : undefined}
              >
                <span>{page.title}</span>
              </Styled.NavLink>
            </Styled.NavItem>
          ))}
        </Styled.NavList>
      </Styled.Wrapper>
    </Container>
  );
}

GuideNavigation.propTypes = {
  title: PropTypes.string,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  currentUri: PropTypes.string,
};
