
export default function RouteErrorBoundary() {
  return (
    <div style={{ padding: "2rem", color: "red" }}>
      <h2>⚠️ Route Rendering Error</h2>
      <p>Check the console for detailed info.</p>
    </div>
  );
}
