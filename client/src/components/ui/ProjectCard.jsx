import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      className="card project-card"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <div className="project-thumb" />
      <h3>{project.title}</h3>
      <p style={{ marginTop: 10 }}>{project.description}</p>

      <div className="tag-row">
        {project.tech?.map((item) => (
          <span className="tag" key={item}>
            {item}
          </span>
        ))}
      </div>

      <div className="project-actions">
        <Link className="btn btn-primary" to={`/project/${project._id}`}>
          View Details <FiArrowUpRight />
        </Link>
        {project.github ? (
          <a className="btn btn-ghost" href={project.github} target="_blank" rel="noreferrer">
            Code <FiGithub />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}