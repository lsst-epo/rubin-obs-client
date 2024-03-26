import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ExpandToggle, Container } from "@rubin-epo/epo-react-lib";
import useToggle from "@/hooks/useToggle";
import { tokens } from "@/styles/globalStyles";
import { stripUnit } from "@castiron/style-mixins/dist/base";
import useResizeObserver from "use-resize-observer";
import * as Styled from "./styles";

const BREAKPOINT = stripUnit(tokens.BREAK_PHABLET);

// show line between steps unless step is at end of column
function getShowBorder(index, length, columns) {
  if (index === length) return false;
  if (columns === 1) return true;
  return index !== Math.ceil(length / columns);
}

export default function StepNavigation({
  title,
  description,
  pages,
  currentUri,
  expandable = false,
  columns = 2,
}) {
  const [isOpen, onToggle, setIsOpen] = useToggle(true);
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  const { ref } = useResizeObserver({
    onResize: ({ width }) => {
      setIsBreakpoint(width >= BREAKPOINT);
    },
  });

  useEffect(() => {
    if (isBreakpoint && !isOpen) {
      setIsOpen(true);
    }
  }, [isBreakpoint, isOpen, setIsOpen]);

  if (!pages?.length) return null;

  return (
    <Container width="regular" bgColor="orange02" paddingSize="medium">
      <div ref={ref}>
        <Styled.Wrapper>
          <Styled.Header>
            <Styled.TitleDescription>
              <h2>{title}</h2>
              {description && (
                <Styled.Description
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </Styled.TitleDescription>
            {expandable && (
              <ExpandToggle
                onClick={onToggle}
                isOpen={isOpen}
                controlsId="guideNavList"
              />
            )}
          </Styled.Header>
          <Styled.NavList id="guideNavList" $columns={columns} open={isOpen}>
            {pages.map((page, i) => (
              <Styled.NavItem
                key={i}
                $active={page.url === currentUri}
                $showBorder={getShowBorder(i + 1, pages.length, columns)}
              >
                <Styled.NavLink
                  url={page.url}
                  aria-current={page.url === currentUri ? "page" : undefined}
                >
                  <span>{page.title}</span>
                </Styled.NavLink>
              </Styled.NavItem>
            ))}
          </Styled.NavList>
        </Styled.Wrapper>
      </div>
    </Container>
  );
}

StepNavigation.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  currentUri: PropTypes.string,
  columns: PropTypes.oneOf([1, 2]),
  expandable: PropTypes.bool,
};
