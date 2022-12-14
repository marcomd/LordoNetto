// Tabs management
//
// <Tabs defaults="pizza">
//   <TabLink to="burrito">Burrito</TabLink>
//   <TabLink to="pizza">Pizza</TabLink>
//   <TabContent id="burrito">I like Burrito</TabContent>
//   <TabContent id="pizza">I don't like pizza</TabContent>
// </Tabs>
import { createContext, useContext, useState } from "react";
import { StyledTabContainer, StyledTabButton, StyledTabContent } from "../styled/StyledTab"
import { SharedContext } from "../../contexts/SharedContext";

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
  const { mobile } = useContext(SharedContext)

  function handleClick(): void {
    setActiveTabId(to);
    // We have to wait the render of the content ends
    setTimeout(
      () =>
        mobile && document.querySelector(`#${to}`)
                          ?.scrollIntoView({ behavior: "smooth" })
      , 400
    );
  }

  return (
    <StyledTabButton
      className={activeTabId === to ? "selected" : ""}
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

  return <StyledTabContent id={id} className={activeTabId !== id ? "hidden" : ""}>{children}</StyledTabContent>;
};

export { Tabs, TabLink, TabContent };
