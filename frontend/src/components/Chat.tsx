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
        <div
          className="
  mx-auto mt-10 w-fit
  rounded-2xl
  bg-gradient-to-r from-green-400 to-emerald-600
  px-8 py-4
  text-xl font-extrabold text-white
  shadow-lg shadow-emerald-500/40
  animate-pulse
"
        >
          ✅ Tailwind funcionando
        </div>
      </section>

      <footer style={{ padding: "1rem", borderTop: "1px solid #ddd" }}>
        <input placeholder="Escribe un mensaje..." style={{ width: "100%" }} />
      </footer>
    </main>
  );
}
