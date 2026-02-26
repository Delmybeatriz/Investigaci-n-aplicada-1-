"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatContainer() {

  const mensajeInicial = {
    role: "assistant",
    text: "Hola 👋 Soy el asistente virtual del Colegio Cerén. Estoy aquí para brindarte información académica, servicios y vida estudiantil."
  };

  const [messages, setMessages] = useState([mensajeInicial]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const chatEndRef = useRef(null);

  // ===== CARGA INICIAL =====
  useEffect(() => {
    const historial = localStorage.getItem("chat_historial");
    const modo = localStorage.getItem("modo_oscuro");

    if (historial) setMessages(JSON.parse(historial));
    if (modo) setDarkMode(JSON.parse(modo));
  }, []);

  // ===== GUARDAR =====
  useEffect(() => {
    localStorage.setItem("chat_historial", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("modo_oscuro", JSON.stringify(darkMode));
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Scroll automático
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // =========================================================
  // ===== RESPUESTAS SEGÚN LA GUÍA UNIVERSITARIA ============
  // =========================================================

  function generarRespuesta(texto) {

    texto = texto.toLowerCase();

    // ---------- INFORMACIÓN ACADÉMICA ----------
    if (texto.includes("calendario académico")) {
      return "El calendario académico del semestre está disponible en el portal institucional o en la coordinación académica.";
    }

    if (texto.includes("horario de clases")) {
      return "Puedes consultar tu horario de clases en la plataforma académica o en el sistema estudiantil.";
    }

    if (texto.includes("inscripción") || texto.includes("inscripcion")) {
      return "Los períodos de inscripción se publican previamente en el portal académico y en los avisos institucionales.";
    }

    // ---------- RECURSOS DEL CAMPUS ----------
    if (texto.includes("biblioteca")) {
      return "La biblioteca se encuentra en el edificio principal y atiende de 8:00 a.m. a 5:00 p.m.";
    }

    if (texto.includes("servicios estudiantiles")) {
      return "Puedes contactar al departamento de servicios estudiantiles mediante correo institucional o visitando sus oficinas administrativas.";
    }

    if (texto.includes("evento") || texto.includes("eventos")) {
      return "Los eventos del campus se anuncian en el portal institucional y redes oficiales de la institución.";
    }

    // ---------- APOYO Y BIENESTAR ----------
    if (texto.includes("estrés") || texto.includes("estres") || texto.includes("problemas emocionales")) {
      return "Puedes acudir al departamento de bienestar estudiantil o al servicio de orientación psicológica disponible para los estudiantes.";
    }

    if (texto.includes("discapacidad") || texto.includes("discapacidades")) {
      return "La institución cuenta con programas de apoyo e inclusión para estudiantes con discapacidades. Consulta con bienestar estudiantil.";
    }

    if (texto.includes("tutoría") || texto.includes("asesoramiento académico")) {
      return "Se ofrecen tutorías académicas y asesoramiento por parte de docentes y coordinadores de carrera.";
    }

    // ---------- DESARROLLO PROFESIONAL ----------
    if (texto.includes("pasantías") || texto.includes("prácticas profesionales") || texto.includes("practicas")) {
      return "Puedes informarte sobre pasantías y prácticas profesionales en la oficina de vinculación laboral o coordinación de carrera.";
    }

    if (texto.includes("currículum") || texto.includes("curriculum") || texto.includes("cv")) {
      return "La institución ofrece asesoría para la elaboración de currículum vitae a través de orientación profesional.";
    }

    if (texto.includes("entrevista")) {
      return "Se realizan talleres y capacitaciones para preparación de entrevistas laborales durante el año académico.";
    }

    // ---------- VIDA ESTUDIANTIL ----------
    if (texto.includes("clubes") || texto.includes("extracurriculares")) {
      return "Existen diversos clubes y actividades extracurriculares como deportes, arte y tecnología.";
    }

    if (texto.includes("fin de semana") || texto.includes("actividad")) {
      return "Las actividades del fin de semana se publican en los canales oficiales del campus.";
    }

    if (texto.includes("alimentación") || texto.includes("comida") || texto.includes("cafetería")) {
      return "El campus cuenta con cafetería y áreas de alimentación disponibles para los estudiantes.";
    }

    // ---------- SALUDOS Y DESPEDIDAS ----------
    if (texto.includes("hola") || texto.includes("buenas")) {
      return "¡Hola! 😊 ¿En qué puedo ayudarte?";
    }

    if (texto.includes("gracias")) {
      return "¡Con gusto! Estoy para servirte.";
    }

    if (texto.includes("adiós") || texto.includes("adios") || texto.includes("bye")) {
      return "¡Hasta luego! Que tengas un excelente día.";
    }

    // ---------- RESPUESTA GENERAL ----------
    return "Lo siento, no tengo información específica sobre esa consulta. Te recomiendo comunicarte con la administración académica.";
  }

  // ===== ENVIAR MENSAJE =====
  function enviarMensaje() {
    if (!input.trim()) return;

    const textoUsuario = input;

    setMessages(prev => [...prev, { role: "user", text: textoUsuario }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const respuesta = generarRespuesta(textoUsuario);

      setMessages(prev => [
        ...prev,
        { role: "assistant", text: respuesta }
      ]);

      setTyping(false);
    }, 1200);
  }

  function nuevaConversacion() {
    setMessages([mensajeInicial]);
    localStorage.removeItem("chat_historial");
  }

  return (
    <div className="app-container">

      <aside className="sidebar">
        <button className="new-chat" onClick={nuevaConversacion}>
          + Nueva conversación
        </button>

        <button
          className="dark-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
      </aside>

      <main className="chat-area">

        <div className="messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="bubble">{m.text}</div>
            </div>
          ))}

          {typing && (
            <div className="msg assistant">
              <div className="bubble typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="input-area">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && enviarMensaje()}
            placeholder="Escribe un mensaje..."
          />
          <button onClick={enviarMensaje}>Enviar</button>
        </div>

      </main>
    </div>
  );
}