import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { heroData, stats } from "../../data/portfolioData";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <motion.div
          className="card hero-panel"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker">Premium MERN Portfolio</span>
          <h1>{heroData.name}</h1>
          <p>{heroData.summary}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              Explore Projects <FiArrowRight />
            </a>
            <a className="btn btn-ghost" href="#contact">
              Contact Me
            </a>
          </div>

          <div className="hero-stats">
            {stats.map((item) => (
              <div className="card stat" key={item.label}>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="card avatar-box"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div>
            <span className="kicker">{heroData.role}</span>
            <p style={{ marginTop: 10 }}>
              Clean interfaces, smooth motion, strong backend flow, and deployment-ready architecture.
            </p>
          </div>

          <div className="avatar-orb" />

          <div className="code-lines" aria-hidden="true">
            <div className="code-line" />
            <div className="code-line" />
            <div className="code-line" />
            <div className="code-line" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}