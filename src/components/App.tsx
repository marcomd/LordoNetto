import { ErrorBoundary } from "react-error-boundary";
import { GenericErrorFallback } from "./Errors";

import { Tabs, TabLink, TabContent } from "./base/Tabs";
import FreelanceForm from "./FreelanceForm";
import CompanyForm from "./CompanyForm";
import EmployeeForm from "./EmployeeForm";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import LocaleSelector from "./base/LocaleSelector";
import { StyledApp } from "./styled/StyledApp";

import { useTranslation } from "react-i18next";
import useWindowMobile from "../hooks/useWindowMobile";
import { SharedContext } from "../contexts/SharedContext";

export default function App() {
  const mobile = useWindowMobile()

  const { t } = useTranslation();

  return (
    <StyledApp>
      <SharedContext.Provider value={{mobile}}>
        <Header>{t('title')}</Header>
        <ErrorBoundary FallbackComponent={GenericErrorFallback}>
          <LocaleSelector />
          <Tabs defaults="employee">
              <TabLink to="employee">{t('employee.name')}</TabLink>
              <TabLink to="freelance">{t('freelance.name')}</TabLink>
              <TabLink to="company">{t('company.name')}</TabLink>

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
      </SharedContext.Provider>
    </StyledApp>
  );
}
