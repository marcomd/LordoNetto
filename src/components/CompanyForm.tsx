import React, { useReducer, useState } from "react";
import { TaxesOutcome, calculateTaxes } from "../lib/companyCalculation";
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
  const [iresAmount, setIresAmount] = useState(0);
  const [irapAmount, setIrapAmount] = useState(0);

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

    const [netAmount, iresAmount, irapAmount]: TaxesOutcome = calculateTaxes(
      grossAmount,
      deductibleAmount
    );

    setIresAmount(iresAmount);
    setIrapAmount(irapAmount);
    setNetAmount(netAmount);
  };

  return (
    <StyledContainer>
      <h3>Calcolo al netto di IRAP e IRES</h3>
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
              IRES: {numberFormatter.format(iresAmount)}
            </StyledResultNormalRow>
            <StyledResultNormalRow>
              IRAP: {numberFormatter.format(irapAmount)}
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
