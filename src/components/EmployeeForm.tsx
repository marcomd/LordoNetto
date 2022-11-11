import React, { useReducer, useState, useEffect, useRef, useContext } from "react";
import { calculateTaxes, TaxesOutcome } from "../lib/employeeCalculation";
import { numberFormatter } from "../lib/utility";
import { DEBOUNCE_TIMEOUT } from "../lib/constants";
import {
  checkErrors,
  initialErrors,
  reducerErrors
} from "../mixins/formErrorsMixins";
import {
  StyledContainer,
  StyledTextInput,
  StyledErrorField,
  StyledFormRow,
  StyledResultContainer,
  StyledResultNormalRow,
  StyledResultMainRow
} from "./styled/StyledForm";

import CheckBox from "./base/Checkbox"

import { useTranslation } from "react-i18next";
import { SharedContext } from "../contexts/SharedContext";

const initialAmounts: TaxesOutcome = {
  netAmount: 0,
  irpefAmount: 0,
  detractionAmount: 0,
  inpsAmount: 0,
  regionAmount: 0,
  cityAmount: 0
};

const DEFAULT_SALARY_MONTH = 12;

export default function Form() {
  const [outcomeAmounts, setOutcomeAmounts] = useState(initialAmounts);
  const [inGrossAmount, setInGrossAmount] = useState("");
  const [inSalaryMonths, setInSalaryMonths] = useState("");
  const grossAmount = parseInt(inGrossAmount);
  const salaryMonths = parseInt(inSalaryMonths);
  const [dependentSpouse, setDependentSpouse] = useState(false);
  const refResult = useRef<HTMLInputElement>(null);
  const salaryMonthsOrDefault = salaryMonths || DEFAULT_SALARY_MONTH;

  const [errors, dispatchErrors] = useReducer(reducerErrors, initialErrors);
  const { mobile } = useContext(SharedContext)
  const { t } = useTranslation();

  const calculate = (): void => {
    setOutcomeAmounts(initialAmounts);
    console.log(`grossAmount:${grossAmount}`);
    if (!checkErrors({ grossAmount, salaryMonths, dispatchErrors, t })) return;

    const {
      netAmount,
      irpefAmount,
      detractionAmount,
      inpsAmount,
      regionAmount,
      cityAmount
    }: TaxesOutcome = calculateTaxes(grossAmount, dependentSpouse);

    setOutcomeAmounts({
      netAmount,
      irpefAmount,
      detractionAmount,
      inpsAmount,
      regionAmount,
      cityAmount
    });
    mobile && refResult.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!inGrossAmount && !inSalaryMonths && !outcomeAmounts.netAmount) return;
    const debounceCalculate = setTimeout(() => calculate(), DEBOUNCE_TIMEOUT);
    return () => clearTimeout(debounceCalculate);
  }, [inGrossAmount, inSalaryMonths]);

  useEffect(() => {
    if (!grossAmount && !dependentSpouse) return;
    calculate()
  }, [dependentSpouse]);

  return (
    <StyledContainer>
      <div ref={refResult}></div>
      <h3>{t('employee.title')}</h3>
      <StyledFormRow>
          <span className="input-symbol input-symbol-euro">
            <StyledTextInput
              type="text"
              id="grossAmount"
              placeholder={t('inputs.placeholders.grossAmount')}
              onChange={(e) => setInGrossAmount(e.target.value)}
            />
          </span>
          <StyledErrorField>{errors.grossAmount}</StyledErrorField>
        </StyledFormRow>

        <StyledFormRow>
          <span className="input-symbol input-symbol-calendar">
            <StyledTextInput
              type="number"
              id="salaryMonths"
              placeholder={t('inputs.placeholders.salaryMonths')}
              defaultValue={DEFAULT_SALARY_MONTH}
              onChange={(e) => setInSalaryMonths(e.target.value)}
            />
          </span>
          <StyledErrorField>{errors.salaryMonths}</StyledErrorField>
        </StyledFormRow>

        <StyledFormRow>
          <CheckBox
            checked={dependentSpouse}
            onClick={(e: React.MouseEvent<HTMLInputElement>) => {
              setDependentSpouse(e.currentTarget.checked)
            }}
          >{t('inputs.placeholders.dependentSpouse')}</CheckBox>
          <StyledErrorField>{errors.dependentSpouse}</StyledErrorField>
        </StyledFormRow>

        {outcomeAmounts.netAmount > 0 && (
          <StyledResultContainer>
            <StyledResultNormalRow>
              IRPEF: {numberFormatter.format(outcomeAmounts.irpefAmount)}
              {outcomeAmounts.detractionAmount > 0 ? (
                <span>
                  (- {numberFormatter.format(outcomeAmounts.detractionAmount)}{" "}
                  di detrazioni)
                </span>
              ) : (
                ""
              )}
            </StyledResultNormalRow>
            <StyledResultNormalRow>
              INPS: {numberFormatter.format(outcomeAmounts.inpsAmount)}
            </StyledResultNormalRow>
            <StyledResultNormalRow>
              {t('result.regionTaxAmount')}:&nbsp; ≃
              {numberFormatter.format(outcomeAmounts.regionAmount)}
            </StyledResultNormalRow>
            <StyledResultNormalRow>
              {t('result.cityTaxAmount')}:&nbsp; ≃
              {numberFormatter.format(outcomeAmounts.cityAmount)}
            </StyledResultNormalRow>
            <StyledResultMainRow>
              {t('result.netAmount')}: <b>{numberFormatter.format(outcomeAmounts.netAmount)}</b>
            </StyledResultMainRow>
            <StyledResultNormalRow>
              {t('result.netAmountPerMonth')} (/{salaryMonthsOrDefault}):&nbsp;
              {numberFormatter.format(
                outcomeAmounts.netAmount / salaryMonthsOrDefault
              )}
            </StyledResultNormalRow>
          </StyledResultContainer>
        )}
    </StyledContainer>
  );
}
