import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TournamentForm from "./pages/TournamentCreate";
import TournamentsList from "./pages/TournamentsList";
import TournamentDetail from "./pages/TournamentDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TournamentsList />} />
        <Route path="/criar" element={<TournamentForm />} />
        <Route path="/campeonatos/:id" element={<TournamentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
