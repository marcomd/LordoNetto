const checkErrors = ({
  grossAmount,
  deductibleAmount = null,
  salaryMonths = null,
  dispatchErrors
}) => {
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
  if (salaryMonths && !validSalaryMonths.includes(parseInt(salaryMonths))) {
    dispatchErrors({
      field: "salaryMonths",
      error: `Invalid salary months, only allowed ${validSalaryMonths}!`
    });
    isValid = false;
  }

  return isValid;
};

const initialErrors = {
  grossAmount: null,
  deductibleAmount: null,
  salaryMonths: null
};

function reducerErrors(errors, action) {
  switch (action.field) {
    case "grossAmount":
      return { ...errors, grossAmount: action.error };
    case "deductibleAmount":
      return { ...errors, deductibleAmount: action.error };
    case "salaryMonths":
      return { ...errors, salaryMonths: action.error };
    case "reset":
      return initialErrors;
    default:
      throw new Error();
  }
}

export { checkErrors, initialErrors, reducerErrors };
