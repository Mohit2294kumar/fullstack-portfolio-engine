import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/ui/Loader";
import PageWrapper from "../components/layout/PageWrapper";
import api from "../services/api";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/projects/${id}`)
      .then((res) => setProject(res.data.project))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader fullScreen />;

  return (
    <PageWrapper>
      <section className="section">
        <div className="container">
          {!project ? (
            <div className="card" style={{ padding: 24 }}>
              <h2>Project not found</h2>
              <p style={{ marginTop: 10 }}>This project does not exist or failed to load.</p>
              <Link className="btn btn-primary" style={{ marginTop: 18, display: "inline-flex" }} to="/">
                Back Home
              </Link>
            </div>
          ) : (
            <div className="card" style={{ padding: 28 }}>
              <span className="kicker">Project Details</span>
              <h2 style={{ marginTop: 10 }}>{project.title}</h2>
              <p style={{ marginTop: 14 }}>{project.description}</p>

              <div className="tag-row">
                {project.tech?.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>

              {project.features?.length ? (
                <>
                  <h3 style={{ marginTop: 24 }}>Features</h3>
                  <ul style={{ color: "var(--muted)", lineHeight: 1.9 }}>
                    {project.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </>
              ) : null}

              <div className="project-actions" style={{ marginTop: 24 }}>
                <Link className="btn btn-ghost" to="/">Back</Link>
                {project.live ? (
                  <a className="btn btn-primary" href={project.live} target="_blank" rel="noreferrer">Live Demo</a>
                ) : null}
                {project.github ? (
                  <a className="btn btn-ghost" href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}