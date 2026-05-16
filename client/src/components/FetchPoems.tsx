import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

interface IPoem {
  id: number;
  poem: string;
  vip: boolean;
}

const FetchPoems = () => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [poems, setPoems] = useState<IPoem[]>([]);

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    if (tkn && tkn !== jwt) {
      setJwt(tkn);
    }
  }, [jwt]);

  const fetchPoems = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/poems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error while fetching poems");
      }

      const data = await response.json();
      setPoems(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error when trying to fetch poems: ${error.message} `);
      }
    }
  };

  return (
    <div>
      <h2 data-cy="welcome-title">Welcome to Poems</h2>

      {!jwt ? (
        <p data-cy="please-login">Please login to fetch the poems!</p>
      ) : (
        <>
        <h2 data-cy="fetch-thepoem">Fetch the poems</h2>
          <Button
            data-cy="fetch-poems-btn"
            sx={{ display: "flex", justifyContent: "center", margin: "auto" }}
            variant="contained"
            color="primary"
            onClick={fetchPoems}
          >
            Fetch Poems
          </Button>
          {poems.map((item, index) => (
            <div key={index}>
              <h3>Poem {item.id}</h3>
              <p className={item.vip ? "vip" : ""}>{item.poem}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FetchPoems;
