import axios from "axios";
import { useEffect, useState } from "react";
import MortgageCard from "./MortgageCard";
import Header from "../header/Header";
import { MortgageCredit } from "../../types/MortgageAndCredit";

const Mortgages: React.FC = () => {
  const [mortgages, setMortgages] = useState<MortgageCredit[]>([]);
  useEffect(() => {
    axios.get("/api/mortgages").then((res) => setMortgages(res.data));
  });
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 px-4 pt-4 pb-2 bg-fixed bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 text-white">
        <div className="relative p-6 rounded-lg">
          {mortgages.map((record, index) => (
            <div className="inline-block mx-2 my-2" key={index}>
              <MortgageCard recordData={record} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Mortgages;
