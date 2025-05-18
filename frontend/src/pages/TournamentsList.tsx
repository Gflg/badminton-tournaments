import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TournamentsList.css";

type Tournament = {
  id: number;
  name: string;
  local: string;
  start_date: string;
  picture?: string;
};

export default function TournamentsList() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/tournaments/?skip=0&limit=100")
      .then((res) => setTournaments(res.data))
      .catch(() => alert("Erro ao buscar torneios"));
  }, []);

  return (
    <div className="tournament-list">
      <h2>Campeonatos Cadastrados</h2>
      {tournaments.length === 0 ? (
        <p>Nenhum campeonato encontrado.</p>
      ) : (
        <div className="tournament-grid">
          {tournaments.map((t) => (
            <div className="card" key={t.id}>
              {t.picture && <img src={`http://localhost:8000/${t.picture}`} alt={t.name} />}
              <h3>
                <Link to={`/campeonatos/${t.id}`}>{t.name}</Link>
              </h3>
              <p><strong>Local:</strong> {t.local}</p>
              <p><strong>Início:</strong> {new Date(t.start_date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
