import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { MortgageCredit } from "../../types/MortgageAndCredit";
import axios from "axios";

const MortgageCard: React.FC<{ recordData: MortgageCredit }> = ({
  recordData,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleReload = () => {
    navigate("/");
    window.location.reload(); // Force full reload
  };
  const handleEdit = () => {
    navigate("/add", {
      state: {
        record: { recordId: recordData.id, ...recordData },
        isEditData: true,
      },
    });
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/mortgages/${recordData.id}`);
      if (res.status == 200) handleReload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative bg-orange-100 shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* Options Button for edit and delete*/}
      <div className="absolute top-3 right-3" ref={optionsRef}>
        <button onClick={() => setShowOptions(!showOptions)} className="p-2">
          <MoreVertical
            size={25}
            className="text-black font-extrabold hover:text-gray-600"
          />
        </button>

        {/* Options Dropdown */}
        {showOptions && (
          <div className="absolute top-full right-0 mt-1 w-40 bg-white/90 shadow-md rounded-md text-sm border border-gray-300 z-20">
            <button
              className="block px-4 py-2 w-full text-left text-blue-700 hover:bg-blue-100"
              onClick={() => handleEdit()}
            >
              ✏️ Edit
            </button>
            <button
              className="block px-4 py-2 w-full text-left text-red-600 hover:bg-red-100"
              onClick={() => handleDelete()}
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Form to retrieve data */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Credit Rating: {recordData.creditRating.toUpperCase()}
        </h3>

        {/* Tags */}
        {/* Tags */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
            Credit Score: {recordData.creditScore}
          </span>
          <span className="bg-slate-300 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
            Loan Amount: {recordData.loanAmount}
          </span>
          <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
            Property Type: {recordData.propertyValue}
          </span>
          <span className="bg-slate-300 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
            Annual Income: {recordData.annualIncome}
          </span>
          <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
            Debt Amount: {recordData.debtAmount}
          </span>
          <span className="bg-slate-300 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
            Loan Type: {recordData.loanType}
          </span>
          <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
            Property Type: {recordData.propertyType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MortgageCard;
