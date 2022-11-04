interface Rate { 
  amount: number; 
  percentage: number;
  detractionNotOver: number;
}

// Scaglioni IRPEF 2022	Aliquote IRPEF 2022
// Fino a 15.000 euro	23 per cento
// Oltre 15.000 euro e fino a 28.000 euro	25 per cento
// Oltre 28.000 euro e fino a 50.000 euro	35 per cento
// Oltre 50.000 euro	43 per cento
function getRates(grossAmount: number) {
  return [
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
  ] as Rate[];
}

function getOtherDetractions() {
  return [
    { fromAmount: 25001, toAmount: 35000, detraction: 65 }
  ]
}

type SpouseDetraction = {
  fromAmount: number;
  toAmount: number;
  detraction: Function;
}

function getSpouseDetractions(grossAmount: number) {
  return [
    { 
      fromAmount: 0, 
      toAmount: 15000, 
      detraction: function() { 
        return 800 - (110 * (grossAmount / this.toAmount))
      },
    },
    { 
      fromAmount: 15001, 
      toAmount: 40000, 
      detraction: () => { return 690 },
    },
    { 
      fromAmount: 40001, 
      toAmount: 80000, 
      detraction: function() { 
        return 690 * ((this.toAmount - grossAmount) / (this.fromAmount-1))
      },
    }
  ] as SpouseDetraction[];
}

export {
  type Rate,
  getRates,
  getOtherDetractions,
  type SpouseDetraction,
  getSpouseDetractions,
}