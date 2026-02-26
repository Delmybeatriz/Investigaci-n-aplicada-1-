import ChatContainer from "./component/Container";

export default function Home() {
  return (
    <main>
      <header className="header">
        <h1>🎓 Colegio Cerén</h1>
        <p>Asistente Virtual Académico</p>
      </header>

      <ChatContainer />
    </main>
  );
}