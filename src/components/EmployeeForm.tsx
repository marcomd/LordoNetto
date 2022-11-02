import React, { useReducer, useState, useEffect, useRef } from "react";
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
  const [grossAmount, setGrossAmount] = useState(0);
  const [salaryMonths, setSalaryMonths] = useState(0);
  const refResult = useRef<HTMLInputElement>(null);

  const [errors, dispatchErrors] = useReducer(reducerErrors, initialErrors);
  const salaryMonthsOrDefault = salaryMonths || DEFAULT_SALARY_MONTH;

  const calculate = (): void => {
    setOutcomeAmounts(initialAmounts);
    console.log(`grossAmount:${grossAmount}`);
    if (!checkErrors({ grossAmount, salaryMonths, dispatchErrors })) return;

    const {
      netAmount,
      irpefAmount,
      detractionAmount,
      inpsAmount,
      regionAmount,
      cityAmount
    }: TaxesOutcome = calculateTaxes(grossAmount);

    setOutcomeAmounts({
      netAmount,
      irpefAmount,
      detractionAmount,
      inpsAmount,
      regionAmount,
      cityAmount
    });
    refResult.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!grossAmount && !salaryMonths) return;
    const debounceCalculate = setTimeout(() => calculate(), DEBOUNCE_TIMEOUT);
    return () => clearTimeout(debounceCalculate);
  }, [grossAmount, salaryMonths]);

  return (
    <StyledContainer>
      <h3>Calcolo stipendio netto</h3>
      <form>
        <StyledFormRow>
          <span className="input-symbol input-symbol-euro">
            <StyledTextInput
              type="text"
              id="grossAmount"
              placeholder="Lordo"
              onChange={(e) => setGrossAmount(parseInt(e.target.value))}
            />
          </span>
          <StyledErrorField>{errors.grossAmount}</StyledErrorField>
        </StyledFormRow>

        <StyledFormRow>
          <span className="input-symbol input-symbol-calendar">
            <StyledTextInput
              type="number"
              id="salaryMonths"
              placeholder="Numero mensilità"
              defaultValue={DEFAULT_SALARY_MONTH}
              onChange={(e) => setSalaryMonths(parseInt(e.target.value))}
            />
          </span>
          <StyledErrorField>{errors.salaryMonths}</StyledErrorField>
        </StyledFormRow>

        <div ref={refResult}></div>
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
              Addizionale regionale:&nbsp; ≃
              {numberFormatter.format(outcomeAmounts.regionAmount)}
            </StyledResultNormalRow>
            <StyledResultNormalRow>
              Addizionale comunale:&nbsp; ≃
              {numberFormatter.format(outcomeAmounts.cityAmount)}
            </StyledResultNormalRow>
            <StyledResultMainRow>
              Netto: <b>{numberFormatter.format(outcomeAmounts.netAmount)}</b>
            </StyledResultMainRow>
            <StyledResultNormalRow>
              Netto mese (/{salaryMonthsOrDefault}):&nbsp;
              {numberFormatter.format(
                outcomeAmounts.netAmount / salaryMonthsOrDefault
              )}
            </StyledResultNormalRow>
          </StyledResultContainer>
        )}
      </form>
    </StyledContainer>
  );
}
