import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { MortgageCredit } from "../../types/MortgageAndCredit";

const MortgageCard: React.FC<{ recordData: MortgageCredit }> = ({
  recordData,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  return (
    <div className="relative bg-orange-100 shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* Options Button */}
      <div className="absolute top-3 right-3" ref={optionsRef}>
        <button onClick={() => setShowOptions(!showOptions)} className="p-2">
          <MoreVertical
            size={25}
            className="text-white font-extrabold hover:text-gray-400"
          />
        </button>

        {/* Options Dropdown */}
        {showOptions && (
          <div className="absolute top-full right-0 mt-1 w-40 bg-white/90 shadow-md rounded-md text-sm border border-gray-300 z-20">
            <button className="block px-4 py-2 w-full text-left text-red-600 hover:bg-red-100">
              🗑️ Delete
            </button>
            <button className="block px-4 py-2 w-full text-left text-blue-700 hover:bg-blue-100">
              ✏️ Edit
            </button>
          </div>
        )}
      </div>

      {/* Form content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {recordData.creditRating.toUpperCase()} RECIPE
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap mt-3">
          <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
            creditScore
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 text-yellow-800">
            {recordData.creditScore}
          </span>
          <span className="bg-slate-300 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
            {recordData.loanAmount} roast
          </span>
          <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
            {recordData.loanAmount}
          </span>
        </div>
      </div>

      {/* Pop-Up Overlay for Recipe Steps */}
    </div>
  );
};

export default MortgageCard;
