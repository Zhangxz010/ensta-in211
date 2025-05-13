import './About.css';
import { useState } from "react";


function About() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/movies/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, year }),
    });

    console.log('response', response)

    if (response.ok) {
      setMessage("Film ajouté !");
      setTitle("");
      setYear("");
    } else {
      setMessage("Erreur lors de l'ajout.");
    }
  };

  return (
    <div className="about">
      <h1>Ajouter un film</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Année"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default About;
