export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center h-50">
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
