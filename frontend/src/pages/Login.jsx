import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gem } from "lucide-react";
import { login } from "../services/auth";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-shell">
        <div className="login-brand">
          <div className="login-mark">
            <Gem size={25} strokeWidth={1.2} />
          </div>

          <div>
            <strong>CEYLON</strong>
            <strong>GEM ATELIER</strong>
          </div>
        </div>

        <div className="login-card">
          <div className="login-heading">
            <span>PRIVATE ATELIER SYSTEM</span>
            <h1>Welcome back</h1>
            <p>Sign in to access the atelier management system.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </label>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            <span>CEYLON GEM ATELIER</span>
            <span>Crafted by ARK II</span>
          </div>
        </div>
      </div>
    </main>
  );
}
