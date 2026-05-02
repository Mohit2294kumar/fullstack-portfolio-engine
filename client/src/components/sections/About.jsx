import SectionTitle from "../ui/SectionTitle";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle
          kicker="About"
          title="Built to feel premium, fast, and polished"
          subtitle="This portfolio is designed as a real MERN project with smooth transitions, responsive layout, dynamic content, and backend support."
        />
        <div className="card" style={{ padding: 24 }}>
          <p>
            The system includes a hero section, project filters, lazy-loaded pages, admin CRUD, MongoDB data flow,
            JWT login, and deploy-ready Vercel structure.
          </p>
        </div>
      </div>
    </section>
  );
}