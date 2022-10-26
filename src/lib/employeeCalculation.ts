interface Rate { amount: number; percentage: number }

const calculateTaxAmount = (...args: [
  taxableAmount: number, 
  rates: Rate[]
]) => {
  const [taxableAmount, rates] = args
  console.log(`CalculateNet gross:${taxableAmount} rates:`, rates);
  let remainingAmount = taxableAmount

  return rates.map((rate, i) => {
      const rateAmount = i === (rates.length-1) || remainingAmount < rate.amount ? 
        remainingAmount : 
        rate.amount
      remainingAmount -= rate.amount
      if (remainingAmount < 0) remainingAmount = 0
      const rateTaxAmount = rateAmount * rate.percentage / 100
      console.log(`  rateAmount:${rateAmount} remainingAmount:${remainingAmount} rate:${rate.percentage} rateTaxAmount:${rateTaxAmount}`);
      return rateTaxAmount
    })
    .reduce((a,b) => a+b)
};

type TaxesOutcome = {
  netAmount: number,
  irpefAmount: number,
  inpsAmount: number,
  regionAmount: number,
  cityAmount: number,
}

const calculateTaxes = (...args: [
    grossAmount: number
  ]): TaxesOutcome => {
  const [grossAmount] = args  

  //Scaglioni IRPEF 2022	Aliquote IRPEF 2022
  //Fino a 15.000 euro	23 per cento
  //Oltre 15.000 euro e fino a 28.000 euro	25 per cento
  //Oltre 28.000 euro e fino a 50.000 euro	35 per cento
  //Oltre 50.000 euro	43 per cento
  const rates: Rate[] = [
    { amount: 15000, percentage: 23 },
    { amount: 13000, percentage: 25 },
    { amount: 12000, percentage: 35 },
    { amount: Infinity, percentage: 43 }
  ];
  const taxableAmount = grossAmount;
  const irpefAmount = calculateTaxAmount(taxableAmount, rates);
  const inpsAmount = (grossAmount * 9.19) / 100;
  const regionAmount = (taxableAmount * 1.72) / 100;
  const cityAmount = (taxableAmount * 0.80) / 100;
  const netAmount = grossAmount - 
                    irpefAmount - 
                    inpsAmount - 
                    regionAmount - 
                    cityAmount;
  return {
    netAmount, 
    irpefAmount, 
    inpsAmount, 
    regionAmount, 
    cityAmount
   } as TaxesOutcome
}

export { calculateTaxes, TaxesOutcome }