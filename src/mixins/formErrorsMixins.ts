const checkErrors = ({
  grossAmount,
  deductibleAmount = null,
  salaryMonths = null,
  setErrors
}) => {
  console.log("Reset initialErrors");
  setErrors({
    field: "reset"
  });

  let isValid = true;
  if (!grossAmount) {
    setErrors({
      field: "grossAmount",
      error: "Please enter the gross amount!"
    });
    isValid = false;
  }

  if (grossAmount && isNaN(grossAmount)) {
    setErrors({
      field: "grossAmount",
      error: "The gross amount must be a number!"
    });
    isValid = false;
  }

  if (deductibleAmount && isNaN(deductibleAmount)) {
    setErrors({
      field: "deductibleAmount",
      error: "The deductible amount must be a number!"
    });
    isValid = false;
  }

  if (salaryMonths && isNaN(salaryMonths)) {
    setErrors({
      field: "salaryMonths",
      error: "The salary months must be a number!"
    });
    isValid = false;
  }

  const validSalaryMonths = [12, 13, 14];
  if (salaryMonths && !validSalaryMonths.includes(parseInt(salaryMonths))) {
    setErrors({
      field: "salaryMonths",
      error: `The salary months is not valid, only admitted ${validSalaryMonths}!`
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
