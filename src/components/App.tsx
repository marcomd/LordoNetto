import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { ErrorBoundary } from "react-error-boundary";

import FreelanceForm from "./FreelanceForm";
import CompanyForm from "./CompanyForm";
import EmployeeForm from "./EmployeeForm";
import { GenericErrorFallback } from "./Errors";
import { Tabs, TabLink, TabContent } from "./Tabs";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
//import Privacy from "./Privacy";

// --- STYLE ---
const StyledApp = styled.div`
  text-align: center;
  padding: 0rem 2rem;
  max-width: 700px;
  margin: 0 auto;

  @media only screen and (max-width: 550px) {
    padding: 0rem 0.4rem;
  }
`;

// --- CODE ---
export default function App() {
  const media: MediaQueryList = useMemo(() => {
    return window.matchMedia("(max-width: 580px)")
  }, [window.innerWidth, window.innerHeight]) 

  const [mobile, setMobile] = useState(
    media.matches
  );

  useEffect(() => {
    media
      .addEventListener("change", (e) => setMobile(e.matches));
    return () => media.removeEventListener("change", (e) => setMobile(e.matches));
  }, []);

  return (
    <StyledApp>
      <Header mobile={mobile} />
      <ErrorBoundary FallbackComponent={GenericErrorFallback}>
        <Tabs defaults="employee">
          <TabLink to="employee">Dipendente</TabLink>
          <TabLink to="freelance">Professionista</TabLink>
          <TabLink to="company">Azienda</TabLink>

          <TabContent id="employee">
            <EmployeeForm />
          </TabContent>
          <TabContent id="freelance">
            <FreelanceForm />
          </TabContent>
          <TabContent id="company">
            <CompanyForm />
          </TabContent>
        </Tabs>
      </ErrorBoundary>
      <Footer />
    </StyledApp>
  );
}
