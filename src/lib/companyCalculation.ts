const calculateTaxesAmount = (...args: [
  taxableAmount: number, 
  iresPercentage?: number, 
  irapPercentage?: number, 
]) => {
  const [taxableAmount, iresPercentage=24, irapPercentage=3.9] = args
  console.log(`CalculateNet gross:${taxableAmount} ires:${iresPercentage} irap:${irapPercentage}`);

  return [
    taxableAmount * iresPercentage / 100, 
    taxableAmount * irapPercentage / 100
  ]
};

type TaxesOutcome = [
  netAmount: number,
  iresAmount: number,
  irapAmount: number,
]

const calculateTaxes = (...args: [
    grossAmount: number, 
    deductibleAmount: number
  ]): TaxesOutcome => {
  const [grossAmount, deductibleAmount] = args  


  const taxableAmount = grossAmount - deductibleAmount;
  const [iresAmount, irapAmount] = calculateTaxesAmount(taxableAmount);
  const netAmount = grossAmount - iresAmount - irapAmount;
  return [netAmount, iresAmount, irapAmount]
}

export { TaxesOutcome, calculateTaxes }