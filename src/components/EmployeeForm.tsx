import React, { useReducer, useState, useCallback, useEffect } from "react";
import { calculateTaxes, TaxesOutcome } from "../lib/employeeCalculation";
import { numberFormatter } from "../lib/utility";
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
  StyledButton,
  StyledResultContainer,
  StyledResultNormalRow,
  StyledResultMainRow
} from "./styled/StyledForm";

const initialAmounts: TaxesOutcome = {
  netAmount: 0,
  irpefAmount: 0,
  inpsAmount: 0,
  regionAmount: 0,
  cityAmount: 0
};

const DEFAULT_SALARY_MONTH = 12;

export default function Form() {
  const [amounts, setAmounts] = useState(initialAmounts);
  const [grossAmount, setGrossAmount] = useState(0);
  const [salaryMonths, setSalaryMonths] = useState(0);

  const [errors, setErrors] = useReducer(reducerErrors, initialErrors);
  const salaryMonthsOrDefault = salaryMonths || DEFAULT_SALARY_MONTH;

  const calculate = useCallback((): void => {
    setAmounts(initialAmounts);
    console.log(`grossAmount:${grossAmount}`);
    if (!checkErrors({ grossAmount, salaryMonths, setErrors })) return;

    const {
      netAmount,
      irpefAmount,
      inpsAmount,
      regionAmount,
      cityAmount
    }: TaxesOutcome = calculateTaxes(grossAmount);

    setAmounts({
      netAmount,
      irpefAmount,
      inpsAmount,
      regionAmount,
      cityAmount
    });
  }, [grossAmount, salaryMonths]);

  useEffect(() => {
    if (grossAmount || salaryMonths) calculate();
  }, [grossAmount, salaryMonths]);

  return (
    <StyledContainer>
      <div>
        Work in progress&nbsp;
        <span role="img" aria-label="construction">
          🚧
        </span>
      </div>
      <h3>Calcolo stipendio netto</h3>
      <form>
        <StyledFormRow>
          <span className="input-symbol input-symbol-euro">
            <StyledTextInput
              type="text"
              id="grossAmount"
              placeholder="Lordo"
              onChange={(e) => setGrossAmount(e.target.value)}
            />
          </span>
          <StyledErrorField>{errors.grossAmount}</StyledErrorField>
        </StyledFormRow>

        <StyledFormRow>
          <span className="input-symbol input-symbol-calendar">
            <StyledTextInput
              type="text"
              id="salaryMonths"
              placeholder="Numero mensilità"
              onChange={(e) => setSalaryMonths(e.target.value)}
            />
          </span>
          <StyledErrorField>{errors.salaryMonths}</StyledErrorField>
        </StyledFormRow>

        {amounts.netAmount > 0 && (
          <StyledResultContainer>
            <StyledResultNormalRow>
              IRPEF: {numberFormatter.format(amounts.irpefAmount)}
            </StyledResultNormalRow>
            <StyledResultNormalRow>
              INPS: {numberFormatter.format(amounts.inpsAmount)}
            </StyledResultNormalRow>
            <StyledResultNormalRow>
              Addizionale regionale:&nbsp;
              {numberFormatter.format(amounts.regionAmount)}
            </StyledResultNormalRow>
            <StyledResultNormalRow>
              Addizionale comunale: {numberFormatter.format(amounts.cityAmount)}
            </StyledResultNormalRow>
            <StyledResultMainRow>
              Netto: <b>{numberFormatter.format(amounts.netAmount)}</b>
            </StyledResultMainRow>
            <StyledResultNormalRow>
              Netto mese (/{salaryMonthsOrDefault}):&nbsp;
              {numberFormatter.format(
                amounts.netAmount / salaryMonthsOrDefault
              )}
            </StyledResultNormalRow>
          </StyledResultContainer>
        )}
      </form>
    </StyledContainer>
  );
}
