import { useEffect, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import api from "../../services/api";

export default function Experience() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/api/experience")
      .then((res) => setItems(res.data.experience || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          kicker="Experience"
          title="Timeline"
          subtitle="A clear section for internships, achievements, and milestones."
        />

        <div className="timeline">
          {items.map((item) => (
            <div className="card timeline-item" key={item._id}>
              <h3>{item.title}</h3>
              <p>{item.period}</p>
              <p style={{ marginTop: 8 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}