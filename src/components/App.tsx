import { useState, useEffect, useMemo } from "react";
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

  const { t } = useTranslation();

  return (
    <StyledApp>
      <Header mobile={mobile}>{t('title')}</Header>
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
    </StyledApp>
  );
}
