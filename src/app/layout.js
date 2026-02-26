import "./globals.css";

export const metadata = {
  title: "Chatbot Colegio Cerén",
  description: "Asistente virtual institucional"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}