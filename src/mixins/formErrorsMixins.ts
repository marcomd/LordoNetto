interface Parameters {
  grossAmount: number;
  deductibleAmount?: number;
  salaryMonths?: number;
  dispatchErrors: Function;
}

const checkErrors = ({
  grossAmount,
  deductibleAmount,
  salaryMonths,
  dispatchErrors
}: Parameters) => {
  console.log("Reset initialErrors");
  dispatchErrors({
    field: "reset"
  });

  let isValid = true;
  if (!grossAmount) {
    dispatchErrors({
      field: "grossAmount",
      error: "Please enter the gross amount!"
    });
    isValid = false;
  }

  if (grossAmount && isNaN(grossAmount)) {
    dispatchErrors({
      field: "grossAmount",
      error: "The gross amount must be a number!"
    });
    isValid = false;
  }

  if (deductibleAmount && isNaN(deductibleAmount)) {
    dispatchErrors({
      field: "deductibleAmount",
      error: "The deductible amount must be a number!"
    });
    isValid = false;
  }

  if (salaryMonths && isNaN(salaryMonths)) {
    dispatchErrors({
      field: "salaryMonths",
      error: "Salary months must be a number!"
    });
    isValid = false;
  }

  const validSalaryMonths = [12, 13, 14, 15];
  if (salaryMonths && !validSalaryMonths.includes(salaryMonths)) {
    dispatchErrors({
      field: "salaryMonths",
      error: `Invalid salary months, only allowed ${validSalaryMonths}!`
    });
    isValid = false;
  }

  return isValid;
};

enum ErrorsActionKinds {
  GROSS_AMOUNT = 'grossAmount',
  DEDUCTIBLE_AMOUNT = 'deductibleAmount',
  SALARY_MONTHS = 'salaryMonths',
  RESET = 'reset',
}

interface ErrorsState {
  grossAmount: string | null;
  deductibleAmount: string | null;
  salaryMonths: string | null;
}

const initialErrors: ErrorsState = {
  grossAmount: null,
  deductibleAmount: null,
  salaryMonths: null
};

// An interface for our actions
interface ErrorsAction {
  field: ErrorsActionKinds;
  error: string;
}

function reducerErrors(errors: ErrorsState, action: ErrorsAction) {
  switch (action.field) {
    case ErrorsActionKinds.GROSS_AMOUNT:
      return { ...errors, grossAmount: action.error };
    case ErrorsActionKinds.DEDUCTIBLE_AMOUNT:
      return { ...errors, deductibleAmount: action.error };
    case ErrorsActionKinds.SALARY_MONTHS:
      return { ...errors, salaryMonths: action.error };
    case ErrorsActionKinds.RESET:
      return initialErrors;
    default:
      throw new Error();
  }
}

export { checkErrors, initialErrors, reducerErrors };
