import { useReducer, useState, useEffect, useRef, useContext } from "react";
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

import { useTranslation } from "react-i18next";
import { SharedContext } from "../contexts/SharedContext";

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
  const { mobile } = useContext(SharedContext)
  const { t } = useTranslation();

  const calculate = (): void => {
    setOutcomeAmounts(initialAmounts);

    if (!checkErrors({ grossAmount, deductibleAmount, dispatchErrors, t })) return;

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
    mobile && refResult.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!grossAmount && !deductibleAmount) return;
    const debounceCalculate = setTimeout(() => calculate(), DEBOUNCE_TIMEOUT);
    return () => clearTimeout(debounceCalculate);
  }, [grossAmount, deductibleAmount]);

  return (
    <StyledContainer>
      <div ref={refResult}></div>
      <h3>{ t('freelance.title') }</h3>      
      <StyledFormRow>
        <span className="input-symbol input-symbol-euro">
          <StyledTextInput
            type="text"
            id="grossAmount"
            placeholder={t('inputs.placeholders.grossAmount')}
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
            placeholder={t('inputs.placeholders.deductibleAmount')}
            onChange={(e) => setDeductibleAmount(parseInt(e.target.value))}
          />
        </span>
        <StyledErrorField>{errors.deductibleAmount}</StyledErrorField>
      </StyledFormRow>

      {outcomeAmounts.netAmount > 0 && (
        <StyledResultContainer>
          <StyledResultNormalRow>
            IRPEF: {numberFormatter.format(outcomeAmounts.taxAmount)}
          </StyledResultNormalRow>
          <StyledResultNormalRow>
            INPS: {numberFormatter.format(outcomeAmounts.pensionAmount)}
          </StyledResultNormalRow>
          <StyledResultMainRow>
            {t('result.netAmount')}: <b>{numberFormatter.format(outcomeAmounts.netAmount)}</b>
          </StyledResultMainRow>
          <StyledResultNormalRow>
            {t('result.netAmountPerMonth')}:&nbsp;
            {numberFormatter.format(outcomeAmounts.netAmount / 12)}
          </StyledResultNormalRow>
        </StyledResultContainer>
      )}
    </StyledContainer>
  );
}
