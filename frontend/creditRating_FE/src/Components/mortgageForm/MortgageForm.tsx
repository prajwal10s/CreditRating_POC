import { useEffect, useState } from "react";
import { Mortgage } from "../../types/MortgageDataType";
import axios from "axios";
import Header from "../header/Header";

const MortgageForm: React.FC = () => {
  const [mortgages, setMortgages] = useState<Mortgage[]>([]);
  const [formData, setFormData] = useState<Mortgage>({
    creditScore: 0,
    loanAmount: 0,
    propertyValue: 0,
    annualIncome: 0,
    debtAmount: 0,
    loanType: "fixed",
    propertyType: "single_family",
  });
  interface formErrors {
    creditScore?: string;
    loanAmount?: string;
    propertyValue?: string;
    annualIncome?: string;
    debtAmount?: string;
  }
  const [errors, setErrors] = useState<formErrors>({});

  //Validation function
  const validate = () => {
    let newErrors: formErrors = {};

    if (formData.creditScore < 300 || formData.creditScore > 850) {
      newErrors.creditScore = "Credit score must be between 300 and 850";
    }
    if (formData.loanAmount <= 0) {
      newErrors.loanAmount = "Loan amount must be a positive number";
    }
    if (formData.propertyValue <= 0) {
      newErrors.propertyValue = "Property value must be a positive number";
    }
    if (formData.annualIncome <= 0) {
      newErrors.annualIncome = "Annual income must be a positive number";
    }
    if (formData.debtAmount < 0) {
      newErrors.debtAmount = "Debt amount cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let errorMessage = "";
    if (
      name === "creditScore" &&
      (Number(value) < 300 || Number(value) > 850)
    ) {
      errorMessage = "Credit score must be between 300 and 850";
    }
    if (name === "loanAmount" && Number(value) <= 0) {
      errorMessage = "Loan amount must be a positive number";
    }
    if (name === "propertyValue" && Number(value) <= 0) {
      errorMessage = "Property value must be a positive number";
    }
    if (name === "annualIncome" && Number(value) <= 0) {
      errorMessage = "Annual income must be a positive number";
    }
    if (name === "debtAmount" && Number(value) < 0) {
      errorMessage = "Debt amount cannot be negative";
    }

    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return; // Stop submission if validation fails
    try {
      const res = await axios.post("/api/mortgages", formData);
      setMortgages([...mortgages, res.data]);
    } catch (error) {
      console.error("Error submitting mortgage", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 text-white ">
      <Header />
      <div className="flex flex-col items-center justify-center mx-12 my-12">
        <div className=" w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Calculate Credit Rating
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Credit Score</label>
                <input
                  type="number"
                  name="creditScore"
                  placeholder="Enter Credit Score"
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
                {errors["creditScore"] && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors["creditScore"]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">Loan Amount</label>
                <input
                  type="number"
                  name="loanAmount"
                  placeholder="Enter Loan Amount"
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
                {errors["loanAmount"] && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors["loanAmount"]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">Property Value</label>
                <input
                  type="number"
                  name="propertyValue"
                  placeholder="Enter Property Value"
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
                {errors["propertyValue"] && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors["propertyValue"]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">Annual Income</label>
                <input
                  type="number"
                  name="annualIncome"
                  placeholder="Enter Annual Income"
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
                {errors["annualIncome"] && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors["annualIncome"]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">Debt Amount</label>
                <input
                  type="number"
                  name="debtAmount"
                  placeholder="Enter Debt Amount"
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
                {errors["debtAmount"] && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors["debtAmount"]}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Loan Type</label>
                <select
                  name="loanType"
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="fixed">Fixed</option>
                  <option value="adjustable">Adjustable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Property Type</label>
                <select
                  name="propertyType"
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="single_family">Single Family</option>
                  <option value="condo">Condo</option>
                </select>
              </div>
            </div>

            {/* submit-data */}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Calculate Rating
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MortgageForm;
