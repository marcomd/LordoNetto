import React, { useReducer, useState, useEffect, useRef } from "react";
import { calculateTaxes, TaxesOutcome } from "../lib/freelanceCalculation";
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
  taxAmount: 0,
  pensionAmount: 0
};

export default function Form() {
  const [outcomeAmounts, setOutcomeAmounts] = useState(initialAmounts);
  const [grossAmount, setGrossAmount] = useState(0);
  const [deductibleAmount, setDeductibleAmount] = useState(0);
  const refResult = useRef<HTMLInputElement>(null);

  const [errors, dispatchErrors] = useReducer(reducerErrors, initialErrors);

  const calculate = (): void => {
    setOutcomeAmounts(initialAmounts);

    if (!checkErrors({ grossAmount, deductibleAmount, dispatchErrors })) return;

    const {
      netAmount,
      taxAmount,
      pensionAmount
    }: TaxesOutcome = calculateTaxes(grossAmount, deductibleAmount);

    setOutcomeAmounts({
      netAmount,
      taxAmount,
      pensionAmount
    });
    refResult.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!grossAmount && !deductibleAmount) return;
    const debounceCalculate = setTimeout(() => calculate(), DEBOUNCE_TIMEOUT);
    return () => clearTimeout(debounceCalculate);
  }, [grossAmount, deductibleAmount]);

  return (
    <StyledContainer>
      <h3>
        Calcolo dei saldi del primo anno di attività con partita iva iscritto
        alla gestione separata INPS
      </h3>

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
          <span className="input-symbol input-symbol-euro">
            <StyledTextInput
              type="text"
              id="deductibleAmount"
              placeholder="Spese detraibili"
              onChange={(e) => setDeductibleAmount(parseInt(e.target.value))}
            />
          </span>
          <StyledErrorField>{errors.deductibleAmount}</StyledErrorField>
        </StyledFormRow>

        <div ref={refResult}></div>
        {outcomeAmounts.netAmount > 0 && (
          <StyledResultContainer>
            <StyledResultNormalRow>
              IRPEF: {numberFormatter.format(outcomeAmounts.taxAmount)}
            </StyledResultNormalRow>
            <StyledResultNormalRow>
              INPS: {numberFormatter.format(outcomeAmounts.pensionAmount)}
            </StyledResultNormalRow>
            <StyledResultMainRow>
              Netto: <b>{numberFormatter.format(outcomeAmounts.netAmount)}</b>
            </StyledResultMainRow>
            <StyledResultNormalRow>
              Netto mese:{" "}
              {numberFormatter.format(outcomeAmounts.netAmount / 12)}
            </StyledResultNormalRow>
          </StyledResultContainer>
        )}
      </form>
    </StyledContainer>
  );
}
