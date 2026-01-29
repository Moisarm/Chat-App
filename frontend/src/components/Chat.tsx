export default function Chat() {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
        <strong>Juan</strong>
      </header>

      <section style={{ flex: 1, padding: "1rem" }}>
        <p>Hola 👋</p>
      </section>

      <footer style={{ padding: "1rem", borderTop: "1px solid #ddd" }}>
        <input placeholder="Escribe un mensaje..." style={{ width: "100%" }} />
      </footer>
    </main>
  );
}
