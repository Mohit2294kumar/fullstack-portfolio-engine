export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <p>© {new Date().getFullYear()} Mohit Kumar</p>
        <p>Built with React, Node, Express, MongoDB, Framer Motion.</p>
      </div>
    </footer>
  );
}