import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import api from "../../services/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState({ loading: false, success: "", error: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ loading: true, success: "", error: "" });

    try {
      const res = await api.post("/api/messages", form);
      setState({ loading: false, success: res.data.message || "Message sent successfully.", error: "" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setState({
        loading: false,
        success: "",
        error: err.response?.data?.message || "Failed to send message."
      });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionTitle
          kicker="Contact"
          title="Let’s build something premium"
          subtitle="This form sends data to the backend and stores it in MongoDB."
        />

        <div className="card" style={{ padding: 24 }}>
          <form className="form" onSubmit={handleSubmit}>
            <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
            <input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Your email" />
            <textarea className="textarea" name="message" value={form.message} onChange={handleChange} placeholder="Your message" />
            <button className="btn btn-primary" type="submit" disabled={state.loading}>
              {state.loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {state.success ? <div className="notice success">{state.success}</div> : null}
          {state.error ? <div className="notice error">{state.error}</div> : null}
        </div>
      </div>
    </section>
  );
}