import TournamentForm from "../components/TournamentForm";

const TournamentCreate = () => {
  return (
    <>
      <img
        src="/images/badminton-banner.jpeg"
        alt="Badminton Banner"
        className="banner"
      />
      <div className="container">
        <h1>Cadastro de Campeonatos de Badminton</h1>
        <TournamentForm />
      </div>
    </>
  );
};

export default TournamentCreate;
