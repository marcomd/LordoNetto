import styled from "styled-components";
import { ErrorBoundary } from "react-error-boundary";

import FreelanceForm from "./FreelanceForm";
import CompanyForm from "./CompanyForm";
import EmployeeForm from "./EmployeeForm";
import { GenericErrorFallback } from "./Errors";
import { Tabs, TabLink, TabContent } from "./Tabs";

// --- STYLE ---
const StyledApp = styled.div`
  text-align: center;
  padding: 1rem 2rem;
`;
const StyledFooter = styled.div`
  text-align: center;
  color: grey;
  font-size: 0.9rem;
  margin-top: 5rem;
`;

// --- CODE ---
export default function App() {
  return (
    <StyledApp>
      <h1>Lordo ➟ Netto</h1>
      <ErrorBoundary FallbackComponent={GenericErrorFallback}>
        <Tabs defaults="freelance">
          <TabLink to="freelance">Freelance</TabLink>
          <TabLink to="company">Azienda</TabLink>
          <TabLink to="employee">Dipendente</TabLink>
          <TabContent id="freelance">
            <FreelanceForm />
          </TabContent>
          <TabContent id="company">
            <CompanyForm />
          </TabContent>
          <TabContent id="employee">
            <EmployeeForm />
          </TabContent>
        </Tabs>
      </ErrorBoundary>
      <StyledFooter>
        Developed by Marco Mastrodonato with&nbsp;
        <span role="img" aria-label="heart">
          ❤️
        </span>
      </StyledFooter>
    </StyledApp>
  );
}
