interface Rate { 
  amount: number; 
  percentage: number;
  detractionNotOver: number;
}

type CalculateTaxAmountOutcome = [irpefAmount: number, detractionAmount: number]

const calculateTaxAmount = (...args: [
  taxableAmount: number, 
  rates: Rate[]
]): CalculateTaxAmountOutcome => {
  const [taxableAmount, rates] = args
  console.log(`CalculateNet gross:${taxableAmount} rates:`, rates);
  let remainingAmount = taxableAmount
  let rateLimitAmount = 0
  const [ irpefAmount, detractionAmount] = rates.map((rate, i) => {
      if (taxableAmount <= rateLimitAmount) {
        console.log(`  rate:${rateLimitAmount} rate:${rate.percentage} --skipped`);
        return [0,0]
      }
      rateLimitAmount += rate.amount

      const rateAmount = i === (rates.length-1) || remainingAmount < rate.amount ? 
        remainingAmount : 
        rate.amount
      remainingAmount -= rate.amount
      if (remainingAmount < 0) remainingAmount = 0
      const detraction = (taxableAmount <= rateLimitAmount ? rate.detractionNotOver : 0)
      const rateTaxAmount = (rateAmount * rate.percentage / 100)
      const finalRateTaxAmount = rateTaxAmount > 0 ? rateTaxAmount : 0
      console.log(`  rate:${rateLimitAmount} rateAmount:${rateAmount} remainingAmount:${remainingAmount} rate:${rate.percentage} rateTaxAmount:${rateTaxAmount} finalRateTaxAmount:${finalRateTaxAmount} detraction:${detraction}`);
      return [finalRateTaxAmount, detraction]
    })
    .reduce(([totalIrpef, totalDetraction], [curIrpef, curDetraction]) => {
      //console.log("reduce", total, cur)
      // It sums taxes and detractions
      return [(totalIrpef+curIrpef), (totalDetraction+curDetraction)]
    })
  return [irpefAmount, detractionAmount]
};

type TaxesOutcome = {
  netAmount: number,
  irpefAmount: number,
  detractionAmount: number,
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
    { 
      amount: 15000, 
      percentage: 23, 
      detractionNotOver: 1880 
    },
    { 
      amount: 13000, 
      percentage: 25, 
      detractionNotOver: 1910 + 1190 * (28000-grossAmount) / 13000
    },
    { 
      amount: 22000, 
      percentage: 35, 
      detractionNotOver: 1910 * (50000-grossAmount) / 22000
    },
    { amount: Infinity, percentage: 43, detractionNotOver: 0 }
  ];
  const otherDetractions = [
    { fromAmount: 25001, toAmount: 35000, detraction: 65 }
  ]

  const inpsAmount = (grossAmount * 9.19) / 100;
  const taxableAmount = grossAmount - inpsAmount;
  const [
    irpefAmount, 
    detractionAmount
  ] = calculateTaxAmount(taxableAmount, rates);

  let otherDetractionAmount = 0
  otherDetractions.forEach(d => {
    if (grossAmount >= d.fromAmount && grossAmount <= d.toAmount) {
      otherDetractionAmount += d.detraction
    }
  })
  const totalDetractionAmount = detractionAmount + otherDetractionAmount

  
  const regionAmount = (taxableAmount * 1.50) / 100;
  const cityAmount = (taxableAmount * 0.80) / 100;
  const netAmount = grossAmount - 
                    irpefAmount +
                    totalDetractionAmount -
                    inpsAmount - 
                    regionAmount - 
                    cityAmount;
  return {
    netAmount, 
    irpefAmount, 
    detractionAmount: totalDetractionAmount,
    inpsAmount, 
    regionAmount, 
    cityAmount
   } as TaxesOutcome
}

export { calculateTaxes, type TaxesOutcome }