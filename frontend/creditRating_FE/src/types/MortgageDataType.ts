export interface Mortgage {
  id?: number;
  creditScore: number;
  loanAmount: number;
  propertyValue: number;
  annualIncome: number;
  debtAmount: number;
  loanType: "fixed" | "adjustable";
  propertyType: "single_family" | "condo";
  creditRating?: "AAA" | "BBB" | "C";
}
