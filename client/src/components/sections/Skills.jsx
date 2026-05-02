import SectionTitle from "../ui/SectionTitle";
import { skills } from "../../data/portfolioData";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle
          kicker="Skills"
          title="Stack built for full-stack delivery"
          subtitle="Frontend, backend, database, authentication, and animation."
        />

        <div className="grid skills-grid">
          {skills.map((skill) => (
            <div className="card skill-card" key={skill}>
              <h3>{skill}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}