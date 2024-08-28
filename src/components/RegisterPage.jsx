import React, { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
	const history = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/v1/auth/register", formData);
      console.log(response.data); // Handle the response, such as saving tokens or redirecting
      
       history('/');
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registrer</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Nom :</label>
          <input style={styles.inputfield}
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Prenom :</label>
          <input style={styles.inputfield}
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Email :</label>
          <input style={styles.inputfield}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Mot de Passe :</label>
          <input style={styles.inputfield}
            type="password"
            name="mdp"
            value={formData.mdp}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  inputGroup: {
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  inputfield: {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginLeft:"10px",
  }
};

export default RegisterPage;
