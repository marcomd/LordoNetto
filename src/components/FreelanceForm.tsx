import React, { useReducer, useState } from "react";
import { calculateTaxes, TaxesOutcome } from "../lib/freelanceCalculation";
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

export default function Form() {
  const [netAmount, setNetAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [pensionAmount, setPensionAmount] = useState(0);

  const [errors, setErrors] = useReducer(reducerErrors, initialErrors);

  // useEffect(() => {
  //   console.log(`errors`, errors);
  // }, [errors]);

  const calculate = (event) => {
    event.preventDefault();
    setNetAmount(0);

    const grossAmount = event.target.elements.grossAmount.value;
    const deductibleAmount = event.target.elements.deductibleAmount.value;
    console.log(
      `grossAmount:${grossAmount} deductibleAmount:${deductibleAmount}`
    );

    if (!checkErrors({ grossAmount, deductibleAmount, setErrors })) return;

    const [netAmount, taxAmount, pensionAmount]: TaxesOutcome = calculateTaxes(
      grossAmount,
      deductibleAmount
    );

    setTaxAmount(taxAmount);
    setPensionAmount(pensionAmount);
    setNetAmount(netAmount);
  };

  return (
    <StyledContainer>
      <h3>
        Calcolo dei saldi del primo anno di attività con partita iva iscritto
        alla gestione separata INPS
      </h3>
      <form onSubmit={calculate}>
        <StyledFormRow>
          <span className="input-symbol input-symbol-euro">
            <StyledTextInput type="text" id="grossAmount" placeholder="Lordo" />
          </span>
          <StyledErrorField>{errors.grossAmount}</StyledErrorField>
        </StyledFormRow>

        <StyledFormRow>
          <span className="input-symbol input-symbol-euro">
            <StyledTextInput
              type="text"
              id="deductibleAmount"
              placeholder="Spese detraibili"
            />
          </span>
          <StyledErrorField>{errors.deductibleAmount}</StyledErrorField>
        </StyledFormRow>

        <StyledFormRow>
          <StyledButton id="freelanceSubmit">Calcola</StyledButton>
        </StyledFormRow>
        {netAmount > 0 && (
          <StyledResultContainer>
            <StyledResultNormalRow>
              IRPEF: {numberFormatter.format(taxAmount)}
            </StyledResultNormalRow>
            <StyledResultNormalRow>
              INPS: {numberFormatter.format(pensionAmount)}
            </StyledResultNormalRow>
            <StyledResultMainRow>
              Netto: <b>{numberFormatter.format(netAmount)}</b>
            </StyledResultMainRow>
            <StyledResultNormalRow>
              Netto mese: {numberFormatter.format(netAmount / 12)}
            </StyledResultNormalRow>
          </StyledResultContainer>
        )}
      </form>
    </StyledContainer>
  );
}
