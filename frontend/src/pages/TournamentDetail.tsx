import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TournamentDetail.css";

type Tournament = {
  id: number;
  name: string;
  description: string;
  local: string;
  start_date: string;
  end_date?: string;
  host: string;
  host_contact: string;
  picture?: string;
};

export default function TournamentDetail() {
  const { id } = useParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/tournaments/${id}`)
      .then((res) => setTournament(res.data))
      .catch(() => alert("Campeonato não encontrado"));
  }, [id]);

  if (!tournament) return <p>Carregando...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTournament((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/tournaments/${id}`, tournament);
      alert("Campeonato atualizado com sucesso!");
    } catch (error: any) {
      alert(error.response?.data?.detail || "Erro ao atualizar campeonato.");
    }
  };

  return (
    <form className="detail-container" onSubmit={handleSubmit}>
      <div className="detail-header">
        {tournament.picture && (
          <img
            src={`http://localhost:8000/${tournament.picture}`}
            alt={tournament.name}
          />
        )}
        <h2>{tournament.name}</h2>
      </div>

      <div className="detail-section">
        <div className="detail-field">
          <label>Nome</label>
          <input name="name" value={tournament.name} onChange={handleChange} />
        </div>

        <div className="detail-field">
          <label>Descrição</label>
          <textarea name="description" value={tournament.description} onChange={handleChange} />
        </div>

        <div className="detail-field">
          <label>Local</label>
          <input name="local" value={tournament.local} onChange={handleChange} />
        </div>

        <div className="detail-field">
          <label>Data de Início</label>
          <input
            type="datetime-local"
            name="start_date"
            value={tournament.start_date.slice(0, 16)}
            onChange={handleChange}
          />
        </div>

        <div className="detail-field">
          <label>Data de Encerramento</label>
          <input
            type="datetime-local"
            name="end_date"
            value={tournament.end_date ? tournament.end_date.slice(0, 16) : ""}
            onChange={handleChange}
          />
        </div>

        <div className="detail-field">
          <label>Organizador</label>
          <input name="host" value={tournament.host} onChange={handleChange} />
        </div>

        <div className="detail-field">
          <label>Contato</label>
          <input name="host_contact" value={tournament.host_contact} onChange={handleChange} />
        </div>
      </div>

      <button type="submit" className="save-button">Salvar Alterações</button>
    </form>
  );
}
