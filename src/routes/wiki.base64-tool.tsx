import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/wiki/base64-tool")({ component: Tool });

function Tool() {
  const [input, setInput] = useState("");
  const [action, setAction] = useState("decode");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  return (
    <main>
      <h1>Base64 Tool</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          try {
            setOutput(
              action === "decode" ? atob(input.trim()) : btoa(input.trim()),
            );
          } catch (e) {
            setError(String(e));
            setOutput("");
          }
        }}
      >
        <label>
          Input
          <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
        <label>
          Action
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="decode">Decode</option>
            <option value="encode">Encode</option>
          </select>
        </label>
        <button type="submit">Submit</button>
        <p role="alert">{error}</p>
        <label>
          Output
          <textarea readOnly value={output} />
        </label>
      </form>
    </main>
  );
}
