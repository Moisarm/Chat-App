import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Chat />
    </div>
  );
}
