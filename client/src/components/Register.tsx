import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";

const Register = () => {
  //const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      window.location.href = "/login";
      //navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <Typography variant="h5" mb={2}>
        Register
      </Typography>

      <TextField
        required
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        inputProps={{ "data-cy": "username-input" }}
      />

      <TextField
        required
        label="Password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        inputProps={{ "data-cy": "password-input" }}
      />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Button
        data-cy="register-button"
        type="submit"
        variant="contained"
        sx={{ width: "25ch", m: 1 }}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </Button>
    </Box>
  );
};

export default Register;
