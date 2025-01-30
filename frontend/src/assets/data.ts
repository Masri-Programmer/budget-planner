const data: {
  categories: {
    name: string;
    expected: string;
    expenses: {
      subcategory: string;
      expected: string;
      expense: string;
      amount: Number;
      bank: string;
    }[];
  }[];
  "bank connections": string[];
} = {
  "categories": [
    {
      "name": "Grundlegende Ausgaben",
      "expected": "50-60",
      "expenses": [
        {
          "subcategory": "Wohnen",
          "expected": "25-30",
          "expense": "Miete",
          "amount": 670,
          "bank": "Gewoba (Rent)"
        },
        {
          "subcategory": "Lebensmittel",
          "expected": "10-15",
          "expense": "Essen",
          "amount": 300,
          "bank": "Octopus (Grocery-related expenses)"
        },
        {
          "subcategory": "Transportation",
          "expected": "5-10",
          "expense": "Bus & Bolt",
          "amount": 15,
          "bank": "DB & Bolt (Transport)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Benzin",
          "amount": 90,
          "bank": "ADAC Auto (Car insurance)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Autoversicherung",
          "amount": 90,
          "bank": "ADAC Auto (Car insurance)"
        },
        {
          "subcategory": "Gesundheit",
          "expected": "5-10",
          "expense": "Gym",
          "amount": 45,
          "bank": "Basic Fit (Gym)"
        },
        {
          "subcategory": "Sonstige Grundausgaben",
          "expected": "",
          "expense": "Strom und Gas",
          "amount": 100,
          "bank": "Octopus (Utilities or similar expenses)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Internet",
          "amount": 50,
          "bank": "Vodafone (Internet)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Handy",
          "amount": 80,
          "bank": "O2 (Phone)"
        }
      ]
    },
    {
      "name": "Ersparnisse & Investitionen",
      "expected": "20-30",
      "expenses": [
        {
          "subcategory": "Langfristige Ersparnisse",
          "expected": "",
          "expense": "Rente Plus",
          "amount": 200,
          "bank": "C24 (Savings account)"
        },
        {
          "subcategory": "Kurzfristige Ersparnisse",
          "expected": "",
          "expense": "Verbleibende Ersparnisse",
          "amount": 1457,
          "bank": "C24 (Investment-related)"
        },
        {
          "subcategory": "Trading (60 monatlich)",
          "expected": "",
          "expense": "Eli Lilly",
          "amount": 10,
          "bank": "Trading Republic (Investment)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Intuitive Surgical",
          "amount": 10,
          "bank": "Trading Republic (Investment)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "TSMC (ADR)",
          "amount": 10,
          "bank": "Trading Republic (Investment)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Physical Gold USD (Acc)",
          "amount": 10,
          "bank": "Trading Republic (Investment)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "NVIDIA",
          "amount": 10,
          "bank": "Trading Republic (Investment)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Core S&P 500 USD (Acc)",
          "amount": 10,
          "bank": "Trading Republic (Investment)"
        }
      ]
    },
    {
      "name": "Lifestyle & Freizeit",
      "expected": "10-20",
      "expenses": [
        {
          "subcategory": "Unterhaltung & Genuss",
          "expected": "5-10",
          "expense": "Ausgehen",
          "amount": 100,
          "bank": ""
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Amazon",
          "amount": 4.50,
          "bank": "Amazon (Entertainment-related subscriptions)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Netflix",
          "amount": 4.99,
          "bank": "Amazon (Entertainment-related subscriptions)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Friseur",
          "amount": 30,
          "bank": ""
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Reisen",
          "amount": 250,
          "bank": "DB Ticket (Travel-related expenses)"
        },
        {
          "subcategory": "Kleidung & Einkäufe",
          "expected": "5",
          "expense": "Kleidung",
          "amount": 50,
          "bank": "Otto (Clothing)"
        },
        {
          "subcategory": "Hobbys & Persönliche Entwicklung",
          "expected": "5",
          "expense": "Watch Fit 3",
          "amount": 10,
          "bank": "Otto (Watch Fit 3)"
        },
        {
          "subcategory": "",
          "expected": "",
          "expense": "Laptop",
          "amount": 22,
          "bank": "Paypal (Electronics-related purchases)"
        }
      ]
    },
    {
      "name": "Einnahmen",
      "expected": "100",
      "expenses": [
        {
          "subcategory":"",
            "expense": "Bafög",
          "expected": "",
          "amount": 855,
          "bank": ""
        },
        {
          "subcategory":"",
            "expense": "Arbeit (ungefähr)",
          "expected": "",
          "amount": 300,
          "bank": ""
        },
        {
          "subcategory":"",
            "expense": "Job",
          "expected": "",
          "amount": 2300,
          "bank": ""
        },
        {
          "subcategory":"",
            "expense": "Kindergeld",
          "expected": "",
          "amount": 0,
          "bank": ""
        }
      ]
    }
  ],
  "bank connections": [
    "Basic Fit",
    "Otto",
    "Vodafone",
    "Octopus",
    "Gewoba",
    "Flyerheaven",
    "Paypal",
    "Sparkasse",
    "Bolt",
    "Tap Tap Send",
    "ADC Auto",
    "Trading Republic",
    "Netflix / Amazon",
    "DB Ticket",
    "Steuererklärung",
    "Benzin",
    "Deutsche Bahn",
    "GoFundMe",
    "PC"
  ]
}

export default data;
