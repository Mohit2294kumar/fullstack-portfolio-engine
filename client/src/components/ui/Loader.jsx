export default function Loader({ fullScreen = false }) {
  return (
    <div className={fullScreen ? "loader-wrap" : ""}>
      <div className="loader" />
    </div>
  );
}