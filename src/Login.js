import { useState } from "react";

function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const login = () => {
    if (user === "admin" && pass === "admin") {
      onLogin();
    } else {
      alert("Login fehlgeschlagen");
    }
  };

  return (
    <div style={bg}>
      <div style={box}>
        <img src="/logo.png" width="100" />
        <h2>RBL Backoffice</h2>

        <input placeholder="User" onChange={e=>setUser(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Passwort" onChange={e=>setPass(e.target.value)} /><br/><br/>

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

const bg = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#1e1e2f",
  color: "white"
};

const box = {
  background: "#2c2c3e",
  padding: 40,
  textAlign: "center",
  borderRadius: 10
};

export default Login;