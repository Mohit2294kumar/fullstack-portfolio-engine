import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 28 }}>
            <h2>404</h2>
            <p style={{ marginTop: 10 }}>Page not found.</p>
            <Link className="btn btn-primary" style={{ marginTop: 18, display: "inline-flex" }} to="/">
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}