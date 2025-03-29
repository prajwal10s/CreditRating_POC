import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mortgages from "./Components/mortgageRecords/Mortgages";
import MortgageForm from "./Components/mortgageForm/MortgageForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Mortgages />}></Route>
          <Route path="/add" element={<MortgageForm />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
