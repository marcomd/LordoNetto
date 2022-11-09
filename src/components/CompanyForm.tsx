import React, {
  useReducer,
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";
import { calculateTaxes, TaxesOutcome } from "../lib/companyCalculation";
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

const initialAmounts: TaxesOutcome = {
  netAmount: 0,
  iresAmount: 0,
  irapAmount: 0
};

export default function Form() {
  const [outcomeAmounts, setOutcomeAmounts] = useState(initialAmounts);
  const [grossAmount, setGrossAmount] = useState(0);
  const [deductibleAmount, setDeductibleAmount] = useState(0);
  const refResult = useRef<HTMLInputElement>(null);

  const [errors, dispatchErrors] = useReducer(reducerErrors, initialErrors);
  const { t } = useTranslation();

  // useEffect(() => {
  //   console.log(`errors`, errors);
  // }, [errors]);

  const calculate = useCallback((): void => {
    setOutcomeAmounts(initialAmounts);

    //const grossAmount = event.target.elements.grossAmount.value;
    //const deductibleAmount = event.target.elements.deductibleAmount.value;
    //console.log(`grossAmount:${grossAmount} deductibleAmount:${deductibleAmount}`);

    if (!checkErrors({ grossAmount, deductibleAmount, dispatchErrors, t })) return;

    const { netAmount, iresAmount, irapAmount }: TaxesOutcome = calculateTaxes(
      grossAmount,
      deductibleAmount
    );

    setOutcomeAmounts({
      netAmount,
      iresAmount,
      irapAmount
    });
    refResult.current?.scrollIntoView({ behavior: "smooth" });
  }, [grossAmount, deductibleAmount]);

  useEffect(() => {
    if (!grossAmount && !deductibleAmount) return;
    const debounceCalculate = setTimeout(() => calculate(), DEBOUNCE_TIMEOUT);
    return () => clearTimeout(debounceCalculate);
  }, [grossAmount, deductibleAmount]);

  return (
    <StyledContainer>
      <div ref={refResult}></div>
      <h3>{ t('company.title') }</h3>
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
              IRES: {numberFormatter.format(outcomeAmounts.iresAmount)}
            </StyledResultNormalRow>
            <StyledResultNormalRow>
              IRAP: {numberFormatter.format(outcomeAmounts.irapAmount)}
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
