import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/auth/login", form);
      setToken(res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <section className="section">
        <div className="container" style={{ maxWidth: 520 }}>
          <div className="card" style={{ padding: 24 }}>
            <span className="kicker">Admin Login</span>
            <h2 style={{ marginTop: 8 }}>Secure Dashboard</h2>

            <form className="form" onSubmit={submit} style={{ marginTop: 20 }}>
              <input
                className="input"
                placeholder="Admin email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="input"
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            {error ? <div className="notice error">{error}</div> : null}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}