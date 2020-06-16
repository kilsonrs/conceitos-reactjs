import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("/repositories").then((response) => {
      return setRepositories([...repositories, response.data]);
    });
    // eslint-disable-next-line
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      id: "124",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
