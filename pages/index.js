import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMessage = { role: "assistant", content: data.result };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🧠 Neurocore AI Terminal</h1>

      <div style={{ marginTop: "1rem" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "0.5rem" }}>
            <strong>{msg.role === "user" ? "Sen:" : "Neurocore:"}</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Komut yazın..."
        style={{
          marginTop: "1rem",
          padding: "0.5rem",
          width: "100%",
          maxWidth: "500px",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          marginTop: "1rem",
          marginLeft: "0.5rem",
          padding: "0.5rem 1rem",
        }}
      >
        Gönder
      </button>
    </div>
  );
                      }
