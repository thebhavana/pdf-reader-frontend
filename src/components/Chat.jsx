import React, { useState } from "react";

export default function Chat({ messages, setMessages, onAsk, citationsHandler }) {
  const [question, setQuestion] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setMessages((m) => [...m, { from: "user", text: question }]);

    try {
      const res = await onAsk(question);
      setMessages((m) => [...m, { from: "bot", text: res.answer, pages: res.pages || [] }]);
    } catch (err) {
      setMessages((m) => [...m, { from: "bot", text: "Sorry, I couldn't get an answer right now." }]);
    } finally {
      setQuestion("");
    }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <div
        style={{
          maxHeight: 400,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
          marginBottom: 10,
          borderRadius: 4,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 12,
              textAlign: m.from === "user" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 16,
                backgroundColor: m.from === "user" ? "#007bff" : "#eee",
                color: m.from === "user" ? "white" : "black",
                maxWidth: "80%",
                wordBreak: "break-word",
              }}
            >
              {m.text}
            </div>
            {m.from === "bot" && m.pages && m.pages.length > 0 && (
              <div style={{ marginTop: 6 }}>
                {m.pages.map((p) => (
                  <button
                    key={p}
                    onClick={() => citationsHandler(p)}
                    style={{
                      marginRight: 6,
                      padding: "4px 8px",
                      cursor: "pointer",
                      borderRadius: 4,
                      border: "1px solid #007bff",
                      backgroundColor: "white",
                      color: "#007bff",
                    }}
                  >
                    Page {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Ask about the PDF..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: 4,
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Ask
        </button>
      </form>
    </div>
  );
}
