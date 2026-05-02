import { useEffect, useMemo, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import Loader from "../ui/Loader";
import ProjectCard from "../ui/ProjectCard";
import api from "../../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await api.get("/api/projects");
        setProjects(res.data.projects || []);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filters = useMemo(() => {
    const techs = new Set();
    projects.forEach((p) => (p.tech || []).forEach((t) => techs.add(t)));
    return ["All", ...Array.from(techs)];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const text = `${project.title} ${project.description} ${(project.tech || []).join(" ")}`.toLowerCase();
      const q = search.toLowerCase();
      const matchesSearch = text.includes(q);
      const matchesFilter = filter === "All" || (project.tech || []).includes(filter);
      return matchesSearch && matchesFilter;
    });
  }, [projects, search, filter]);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle
          kicker="Projects"
          title="Selected work"
          subtitle="Projects are loaded from the backend, searchable, and filterable."
        />

        <div className="grid" style={{ gridTemplateColumns: "1.1fr 0.9fr", marginBottom: 18 }}>
          <input
            className="input"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            {filters.map((f) => (
              <option value={f} key={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid projects-grid">
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}