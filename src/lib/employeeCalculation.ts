import { 
  Rate, 
  getRates, 
  getOtherDetractions,
  SpouseDetraction,
  getSpouseDetractions,
} from "./employee/employeeData"

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
    grossAmount: number,
    dependentSpouse: boolean,
  ]): TaxesOutcome => {
  console.log("Employee calculateTaxes")
  const [grossAmount, dependentSpouse] = args  

  const rates: Rate[] = getRates(grossAmount);
  const inpsAmount = (grossAmount * 9.19) / 100;
  const taxableAmount = grossAmount - inpsAmount;
  const [
    irpefAmount, 
    detractionAmount
  ] = calculateTaxAmount(taxableAmount, rates);

  // --- SPOUSE DETRACTIONS
  const spouseDetractions: SpouseDetraction[] = dependentSpouse ?
  getSpouseDetractions(grossAmount) :
  []
  let spouseDetractionAmount = 0
  spouseDetractions.forEach(d => {
    if (grossAmount >= d.fromAmount && grossAmount <= d.toAmount) {
      const rateDetraction = d.detraction()
      if (rateDetraction > 0) spouseDetractionAmount += d.detraction()
    }
  })

  // OTHER DETRACTIONS
  const otherDetractions = getOtherDetractions();
  let otherDetractionAmount = 0
  otherDetractions.forEach(d => {
    if (grossAmount >= d.fromAmount && grossAmount <= d.toAmount) {
      otherDetractionAmount += d.detraction
    }
  })

  const totalDetractionAmount = detractionAmount + 
    otherDetractionAmount + 
    spouseDetractionAmount
  
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