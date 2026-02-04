import { useState } from "react";

function App() {
  const [founderName, setFounderName] = useState("");
  const [pitch, setPitch] = useState("");
  const [result, setResult] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitPitch = async () => {
    setError(null);
    setMentors([]);
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/pitches/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          founder_name: founderName,
          startup_pitch: pitch,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit pitch");

      const data = await res.json();
      setResult(data);

      const mentorRes = await fetch(
        `http://127.0.0.1:8000/api/pitches/${data.id}/recommendations/`,
      );

      const mentorData = await mentorRes.json();
      setMentors(mentorData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Mentor Matcher</h1>
        <p style={styles.subtitle}>
          Paste your startup idea and get matched with mentors
        </p>

        <input
          type="text"
          placeholder="Founder name"
          value={founderName}
          onChange={(e) => setFounderName(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Startup pitch"
          rows="4"
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
          style={styles.textarea}
        />

        <button
          onClick={submitPitch}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.background = "#16a34a")}
          onMouseOut={(e) => (e.target.style.background = "#22c55e")}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Submit"}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Prediction</h3>

            <div style={styles.kvRow}>
              <span style={styles.kvLabel}>Category</span>
              <span style={styles.kvValue}>{result.predicted_category}</span>
            </div>

            <div style={styles.kvRow}>
              <span style={styles.kvLabel}>Confidence</span>
              <span style={styles.kvValue}>
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {mentors.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Recommended Mentors</h3>
            <ul style={styles.list}>
              {mentors.map((m, idx) => (
                <li key={idx} style={styles.listItem}>
                  <div style={styles.mentorName}>{m.name}</div>
                  <div style={styles.mentorBio}>{m.bio}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#ffffff",
    fontFamily: "Inter, Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 480,
    background: "#ffffff",
    padding: "28px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    margin: 0,
    textAlign: "center",
    fontWeight: 600,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    resize: "none",
  },
  button: {
    padding: "8px 20px",
    borderRadius: 6,
    border: "none",
    background: "#22c55e",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    display: "block",
    margin: "12px auto 0",
  },
  error: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
  section: {
    marginTop: 28,
    paddingTop: 20,
    borderTop: "1px solid #eee",
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 600,
  },
  kvRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  kvLabel: {
    color: "#777",
    fontSize: 13,
  },
  kvValue: {
    fontSize: 14,
    fontWeight: 500,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },
  mentorName: {
    fontWeight: 600,
    fontSize: 14,
  },
  mentorBio: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
};

export default App;
