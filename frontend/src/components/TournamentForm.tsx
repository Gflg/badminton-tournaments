import { useForm } from "react-hook-form";
import axios from "axios";
import "./TournamentForm.css"; // CSS separado para estilos

type FormData = {
  name: string;
  description: string;
  local: string;
  start_date: string;
  end_date?: string;
  picture?: string;
  host: string;
  host_contact: string;

  sub13_simple?: boolean;
  sub15_simple?: boolean;
  sub17_simple?: boolean;
  principal_simple?: boolean;
  cat35_simple?: boolean;
  cat45_simple?: boolean;
  cat55_simple?: boolean;
  cat60_simple?: boolean;

  sub13_doubles?: boolean;
  sub15_doubles?: boolean;
  sub17_doubles?: boolean;
  principal_doubles?: boolean;
  cat35_doubles?: boolean;
  cat45_doubles?: boolean;
  cat55_doubles?: boolean;
  cat60_doubles?: boolean;
};

const TournamentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("local", data.local);
      formData.append("start_date", data.start_date);
      if (data.end_date) formData.append("end_date", data.end_date);
      formData.append("host", data.host);
      formData.append("host_contact", data.host_contact);

      // Anexa imagem, se houver
      if (data.picture && data.picture.length > 0) {
        formData.append("picture", data.picture[0]);
      }

      const categorias = [
        "sub13_simple", "sub15_simple", "sub17_simple", "principal_simple",
        "cat35_simple", "cat45_simple", "cat55_simple", "cat60_simple",
        "sub13_doubles", "sub15_doubles", "sub17_doubles", "principal_doubles",
        "cat35_doubles", "cat45_doubles", "cat55_doubles", "cat60_doubles",
      ] as const;

      categorias.forEach((cat) => {
        formData.append(cat, data[cat] ? "true" : "false");
      });
    
      await axios.post("http://localhost:8000/tournaments/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Campeonato criado com sucesso!");
      reset();
    } catch (error: any) {
      alert(error.response?.data?.detail || "Erro ao criar campeonato.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formulario">
      <h2>Criar Campeonato</h2>

      <label>Nome <span className="required">*</span></label>
      <input {...register("name", { required: true })} />
      {errors.name && <span>Nome é obrigatório</span>}

      <label>Descrição <span className="required">*</span></label>
      <input {...register("description", { required: true })} />

      <label>Local <span className="required">*</span></label>
      <input {...register("local", { required: true })} />

      <label>Data e Horário de Início <span className="required">*</span></label>
      <input type="datetime-local" {...register("start_date", { required: true })} />

      <label>Data e Horário de Encerramento</label>
      <input type="datetime-local" {...register("end_date")} />

      <label>Foto do Campeonato</label>
      <input type="file" accept="image/*" {...register("picture")} />

      <label>Organizador <span className="required">*</span></label>
      <input {...register("host", { required: true })} />

      <label>Contato do Organizador <span className="required">*</span></label>
      <input {...register("host_contact", { required: true })} />

      <div className="categorias-container">
        <fieldset className="categoria-bloco">
          <legend>Categorias – simples <span className="required">*</span></legend>
          <label><input type="checkbox" {...register("sub13_simple")} /> Sub-13</label>
          <label><input type="checkbox" {...register("sub15_simple")} /> Sub-15</label>
          <label><input type="checkbox" {...register("sub17_simple")} /> Sub-17</label>
          <label><input type="checkbox" {...register("principal_simple")} /> Principal</label>
          <label><input type="checkbox" {...register("cat35_simple")} /> 35+</label>
          <label><input type="checkbox" {...register("cat45_simple")} /> 45+</label>
          <label><input type="checkbox" {...register("cat55_simple")} /> 55+</label>
          <label><input type="checkbox" {...register("cat60_simple")} /> 60+</label>
        </fieldset>

        <fieldset className="categoria-bloco">
          <legend>Categorias – duplas <span className="required">*</span></legend>
          <label><input type="checkbox" {...register("sub13_doubles")} /> Sub-13</label>
          <label><input type="checkbox" {...register("sub15_doubles")} /> Sub-15</label>
          <label><input type="checkbox" {...register("sub17_doubles")} /> Sub-17</label>
          <label><input type="checkbox" {...register("principal_doubles")} /> Principal</label>
          <label><input type="checkbox" {...register("cat35_doubles")} /> 35+</label>
          <label><input type="checkbox" {...register("cat45_doubles")} /> 45+</label>
          <label><input type="checkbox" {...register("cat55_doubles")} /> 55+</label>
          <label><input type="checkbox" {...register("cat60_doubles")} /> 60+</label>
        </fieldset>
      </div>

      <button type="submit">Criar Campeonato</button>
    </form>
  );
};

export default TournamentForm;
