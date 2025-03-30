import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gray-900 text-white shadow-md rounded-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center ">
        <Link to="/" className="text-2xl font-bold tracking-wide ">
          Credit Rating Calculator
        </Link>
        <nav className="flex items-center space-x-6">
          <button
            onClick={() => navigate("/add")}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
          >
            <Plus size={20} />
            <span>Calculate</span>
          </button>
          <Link
            to="/"
            className={`hover:text-gray-300 ${
              isActive("/") ? "text-teal-400 border-b-2 border-teal-400" : ""
            }`}
          >
            Records
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
