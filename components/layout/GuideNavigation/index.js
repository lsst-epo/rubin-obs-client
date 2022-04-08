import ExpandToggle from "@/components/atomic/ExpandToggle";
import useToggle from "@/hooks/useToggle";
import { tokens } from "@/styles/globalStyles";
import { stripUnit } from "@castiron/style-mixins/dist/base";
import useResizeObserver from "use-resize-observer";
import Container from "../Container";
import * as Styled from "./styles";

const FAKE_DATA = {
  title: "Program Guides",
  items: [
    { title: "Our Education Products", active: true },
    { title: "Audience", active: false },
    { title: "Online Investigations", active: false },
    { title: "Teacher Guides", active: false },
    { title: "NGSS Design and Support Standards", active: false },
    { title: "Assessments", active: false },
    { title: "Diversity, Equity and Inclusion", active: false },
    { title: "Accessibility", active: false },
  ],
};

const BREAKPOINT = stripUnit(tokens.BREAK_PHABLET);

export default function GuideNavigation() {
  const [isOpen, onToggle, setIsOpen] = useToggle(false);

  const { ref } = useResizeObserver({
    onResize: ({ width }) => {
      if (width >= BREAKPOINT) {
        setIsOpen(true);
      }
    },
  });

  return (
    <Container width="regular" bgColor="orange02" paddingSize="medium">
      <Styled.Wrapper ref={ref}>
        <Styled.Title>
          <h2>{FAKE_DATA.title}</h2>
          <ExpandToggle
            onClick={onToggle}
            isOpen={isOpen}
            controlsId="guideNavList"
          />
        </Styled.Title>
        <Styled.NavList
          id="guideNavList"
          $rows={FAKE_DATA.items.length / 2}
          open={isOpen}
        >
          {FAKE_DATA.items.map((item, i) => (
            <Styled.NavItem key={i} $active={item.active}>
              <Styled.NavLink
                href="#"
                aria-current={item.active ? "page" : undefined}
              >
                <span>{item.title}</span>
              </Styled.NavLink>
            </Styled.NavItem>
          ))}
        </Styled.NavList>
      </Styled.Wrapper>
    </Container>
  );
}
