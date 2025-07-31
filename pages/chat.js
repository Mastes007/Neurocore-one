import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    setMessages([...messages, { sender: "user", text: input }]);
    
    // Fake bot cevabı
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: "Neurocore: Komutunuz kaydedildi." }]);
    }, 1000);

    setInput("");
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#111", height: "100vh", color: "#0f0" }}>
      <h1>🧠 Neurocore AI Terminal</h1>
      <div style={{ height: "70vh", overflowY: "scroll", marginTop: 20 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 10 }}>
            <strong>{msg.sender === "user" ? "Sen" : "Neurocore"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Komut yaz..." 
          style={{ padding: 10, width: "80%", backgroundColor: "#222", color: "#0f0", border: "1px solid #333" }}
        />
        <button onClick={sendMessage} style={{ padding: 10, marginLeft: 10, backgroundColor: "#0f0", color: "#000" }}>
          Gönder
        </button>
      </div>
    </div>
  );
          }
