import { useState } from "react";

function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const login = () => {
    if (user === "admin" && pass === "admin") {
      onLogin();
    } else {
      alert("Falsch");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#1e1e2f"
    }}>
      <div style={{ background: "#2c2c3e", padding: 30 }}>
        <h2 style={{color:"white"}}>Login</h2>

        <input placeholder="User" onChange={e=>setUser(e.target.value)} /><br/>
        <input type="password" placeholder="Pass" onChange={e=>setPass(e.target.value)} /><br/>

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;