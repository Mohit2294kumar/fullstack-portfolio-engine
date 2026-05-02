import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const emptyProject = {
  title: "",
  description: "",
  tech: "",
  features: "",
  live: "",
  github: ""
};

const emptyExperience = {
  title: "",
  period: "",
  description: ""
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [tab, setTab] = useState("projects");
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [messages, setMessages] = useState([]);

  const [projectForm, setProjectForm] = useState(emptyProject);
  const [experienceForm, setExperienceForm] = useState(emptyExperience);
  const [editingProjectId, setEditingProjectId] = useState("");
  const [editingExperienceId, setEditingExperienceId] = useState("");
  const [notice, setNotice] = useState({ type: "", text: "" });

  const isEditingProject = Boolean(editingProjectId);
  const isEditingExperience = Boolean(editingExperienceId);

  const loadAll = async () => {
    try {
      const [dash, projs, exps] = await Promise.all([
        api.get("/api/admin/dashboard"),
        api.get("/api/projects"),
        api.get("/api/experience")
      ]);

      setStats(dash.data.stats);
      setMessages(dash.data.messages || []);
      setProjects(projs.data.projects || []);
      setExperiences(exps.data.experience || []);
    } catch {
      localStorage.removeItem("portfolio_token");
      logout();
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const projectPayload = useMemo(() => ({
    ...projectForm,
    tech: projectForm.tech.split(",").map((s) => s.trim()).filter(Boolean),
    features: projectForm.features.split(",").map((s) => s.trim()).filter(Boolean)
  }), [projectForm]);

  const saveProject = async (e) => {
    e.preventDefault();
    try {
      if (isEditingProject) {
        await api.put(`/api/projects/${editingProjectId}`, projectPayload);
        setNotice({ type: "success", text: "Project updated." });
      } else {
        await api.post("/api/projects", projectPayload);
        setNotice({ type: "success", text: "Project created." });
      }
      setProjectForm(emptyProject);
      setEditingProjectId("");
      loadAll();
    } catch (err) {
      setNotice({ type: "error", text: err.response?.data?.message || "Failed to save project." });
    }
  };

  const editProject = (project) => {
    setEditingProjectId(project._id);
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      tech: (project.tech || []).join(", "),
      features: (project.features || []).join(", "),
      live: project.live || "",
      github: project.github || ""
    });
    setTab("projects");
  };

  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await api.delete(`/api/projects/${id}`);
      setNotice({ type: "success", text: "Project deleted." });
      loadAll();
    } catch {
      setNotice({ type: "error", text: "Failed to delete project." });
    }
  };

  const saveExperience = async (e) => {
    e.preventDefault();
    try {
      if (isEditingExperience) {
        await api.put(`/api/experience/${editingExperienceId}`, experienceForm);
        setNotice({ type: "success", text: "Experience updated." });
      } else {
        await api.post("/api/experience", experienceForm);
        setNotice({ type: "success", text: "Experience created." });
      }
      setExperienceForm(emptyExperience);
      setEditingExperienceId("");
      loadAll();
    } catch (err) {
      setNotice({ type: "error", text: err.response?.data?.message || "Failed to save experience." });
    }
  };

  const editExperience = (item) => {
    setEditingExperienceId(item._id);
    setExperienceForm({
      title: item.title || "",
      period: item.period || "",
      description: item.description || ""
    });
    setTab("experience");
  };

  const deleteExperience = async (id) => {
    if (!confirm("Delete this experience item?")) return;
    try {
      await api.delete(`/api/experience/${id}`);
      setNotice({ type: "success", text: "Experience deleted." });
      loadAll();
    } catch {
      setNotice({ type: "error", text: "Failed to delete experience." });
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await api.delete(`/api/messages/${id}`);
      setNotice({ type: "success", text: "Message deleted." });
      loadAll();
    } catch {
      setNotice({ type: "error", text: "Failed to delete message." });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <PageWrapper>
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "start" }}>
              <div>
                <span className="kicker">Admin Dashboard</span>
                <h2 style={{ marginTop: 8 }}>Project Control Panel</h2>
                <p style={{ marginTop: 8 }}>Create, edit, and delete content from one place.</p>
              </div>
              <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
            </div>

            {stats ? (
              <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 24 }}>
                <div className="card" style={{ padding: 18 }}><h3>{stats.projects}</h3><p>Projects</p></div>
                <div className="card" style={{ padding: 18 }}><h3>{stats.messages}</h3><p>Messages</p></div>
                <div className="card" style={{ padding: 18 }}><h3>{stats.experience}</h3><p>Experience items</p></div>
              </div>
            ) : null}

            <div className="admin-tabs">
              <button className={`tab-btn ${tab === "projects" ? "active" : ""}`} onClick={() => setTab("projects")}>Projects</button>
              <button className={`tab-btn ${tab === "experience" ? "active" : ""}`} onClick={() => setTab("experience")}>Experience</button>
              <button className={`tab-btn ${tab === "messages" ? "active" : ""}`} onClick={() => setTab("messages")}>Messages</button>
            </div>

            {notice.text ? (
              <div className={`notice ${notice.type === "success" ? "success" : "error"}`}>{notice.text}</div>
            ) : null}

            <div className="admin-grid" style={{ marginTop: 22 }}>
              <div className="card" style={{ padding: 20 }}>
                {tab === "projects" ? (
                  <>
                    <h3>{isEditingProject ? "Edit Project" : "Add Project"}</h3>
                    <form className="form" onSubmit={saveProject} style={{ marginTop: 18 }}>
                      <input className="input" placeholder="Title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
                      <textarea className="textarea" placeholder="Description" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
                      <input className="input" placeholder="Tech (comma separated)" value={projectForm.tech} onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })} />
                      <input className="input" placeholder="Features (comma separated)" value={projectForm.features} onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })} />
                      <input className="input" placeholder="Live URL" value={projectForm.live} onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })} />
                      <input className="input" placeholder="GitHub URL" value={projectForm.github} onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })} />
                      <button className="btn btn-primary" type="submit">
                        {isEditingProject ? "Update Project" : "Create Project"}
                      </button>
                      {isEditingProject ? (
                        <button
                          className="btn btn-ghost"
                          type="button"
                          onClick={() => {
                            setEditingProjectId("");
                            setProjectForm(emptyProject);
                          }}
                        >
                          Cancel Edit
                        </button>
                      ) : null}
                    </form>
                  </>
                ) : null}

                {tab === "experience" ? (
                  <>
                    <h3>{isEditingExperience ? "Edit Experience" : "Add Experience"}</h3>
                    <form className="form" onSubmit={saveExperience} style={{ marginTop: 18 }}>
                      <input className="input" placeholder="Title" value={experienceForm.title} onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })} />
                      <input className="input" placeholder="Period" value={experienceForm.period} onChange={(e) => setExperienceForm({ ...experienceForm, period: e.target.value })} />
                      <textarea className="textarea" placeholder="Description" value={experienceForm.description} onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })} />
                      <button className="btn btn-primary" type="submit">
                        {isEditingExperience ? "Update Experience" : "Create Experience"}
                      </button>
                      {isEditingExperience ? (
                        <button
                          className="btn btn-ghost"
                          type="button"
                          onClick={() => {
                            setEditingExperienceId("");
                            setExperienceForm(emptyExperience);
                          }}
                        >
                          Cancel Edit
                        </button>
                      ) : null}
                    </form>
                  </>
                ) : null}

                {tab === "messages" ? (
                  <>
                    <h3>Recent Messages</h3>
                    <div className="list" style={{ marginTop: 18 }}>
                      {messages.map((m) => (
                        <div className="list-item" key={m._id}>
                          <div className="list-item-head">
                            <div>
                              <strong>{m.name}</strong>
                              <p>{m.email}</p>
                            </div>
                            <button className="btn btn-ghost" type="button" onClick={() => deleteMessage(m._id)}>
                              Delete
                            </button>
                          </div>
                          <p style={{ marginTop: 10 }}>{m.message}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>

              <div className="card" style={{ padding: 20 }}>
                {tab === "projects" ? (
                  <>
                    <h3>All Projects</h3>
                    <div className="list" style={{ marginTop: 18 }}>
                      {projects.map((p) => (
                        <div className="list-item" key={p._id}>
                          <div className="list-item-head">
                            <div>
                              <strong>{p.title}</strong>
                              <p>{p.description}</p>
                            </div>
                          </div>
                          <div className="small-actions">
                            <button className="btn btn-ghost" onClick={() => editProject(p)} type="button">Edit</button>
                            <button className="btn btn-ghost" onClick={() => deleteProject(p._id)} type="button">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {tab === "experience" ? (
                  <>
                    <h3>Experience Items</h3>
                    <div className="list" style={{ marginTop: 18 }}>
                      {experiences.map((item) => (
                        <div className="list-item" key={item._id}>
                          <div className="list-item-head">
                            <div>
                              <strong>{item.title}</strong>
                              <p>{item.period}</p>
                              <p style={{ marginTop: 6 }}>{item.description}</p>
                            </div>
                          </div>
                          <div className="small-actions">
                            <button className="btn btn-ghost" onClick={() => editExperience(item)} type="button">Edit</button>
                            <button className="btn btn-ghost" onClick={() => deleteExperience(item._id)} type="button">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {tab === "messages" ? (
                  <>
                    <h3>Message Summary</h3>
                    <p style={{ marginTop: 12 }}>
                      Messages arrive from the contact form and can be managed here.
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}