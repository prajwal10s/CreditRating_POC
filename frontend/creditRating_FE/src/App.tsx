import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mortgages from "./Components/MortgageRecords/Mortgages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Mortgages />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
