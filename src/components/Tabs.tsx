// Tabs management
//
// <Tabs defaults="pizza">
//   <TabLink to="burrito">Burrito</TabLink>
//   <TabLink to="pizza">Pizza</TabLink>
//   <TabContent id="burrito">I like Burrito</TabContent>
//   <TabContent id="pizza">I don't like pizza</TabContent>
// </Tabs>
import { createContext, useContext, useState } from "react";
import styled from "styled-components";

// --- STYLE
const StyledTabContainer = styled.div`
  box-sizing: border-box;
`;

const StyledTabButton = styled.button`
  padding: 1rem 0;
  width: 33.3%;
  border-radius: 0.5rem 0.5rem 0 0;
  @media only screen and (max-width: 550px) {
    padding: 0.3rem 0.6rem;
    margin: 0.1rem auto;
    width: 90%;
    border-radius: 0.5rem;
  }
  cursor: pointer;
  color: white;

  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 0.3rem solid rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  &.selected {
    border-bottom: 0.3rem solid green;
    background-color: rgba(255, 255, 255, 0.7);
    transition: all 0.5s ease;
    color: green;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const StyledTabContent = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 0.5rem 0.5rem;

  @media only screen and (max-width: 550px) {
    border-radius: 0.5rem;
    margin-top: 1rem;
    padding-left: 10px;
    padding-right: 10px;
  }

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

// --- END STYLE

const TabsContext = createContext<{
  activeTabId: string;
  setActiveTabId: (id: string) => void;
}>({ activeTabId: "", setActiveTabId: () => {} });

const Tabs: React.FC<{
  children: React.ReactNode;
  defaults: string;
}> = ({ children, defaults }) => {
  const [activeTabId, setActiveTabId] = useState(defaults);

  const context = { activeTabId, setActiveTabId };

  return (
    <StyledTabContainer>
      <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
    </StyledTabContainer>
  );
};

const TabLink: React.FC<{
  children: React.ReactNode;
  to: string;
}> = ({ children, to }) => {
  const { activeTabId, setActiveTabId } = useContext(TabsContext);

  function handleClick(): void {
    setActiveTabId(to);
    setTimeout(
      () =>
        document
          .querySelector(`#${to}`)
          ?.scrollIntoView({ behavior: "smooth" }),
      400
    );
  }

  return (
    <StyledTabButton
      className={activeTabId === to && "selected"}
      onClick={handleClick}
    >
      {children}
    </StyledTabButton>
  );
};

const TabContent: React.FC<{
  children: React.ReactNode;
  id: string;
}> = ({ children, id }): JSX.Element | null => {
  const { activeTabId } = useContext(TabsContext);
  if (activeTabId !== id) return null;

  return <StyledTabContent id={id}>{children}</StyledTabContent>;
};

export { Tabs, TabLink, TabContent };
