export default function StatsBar({ stats }) {
  const pct =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div style={styles.container}>
      <div style={styles.cards}>
        <StatCard label="Total" value={stats.total} color="var(--accent)" />
        <StatCard label="Pending" value={stats.pending} color="var(--yellow)" />
        <StatCard
          label="Completed"
          value={stats.completed}
          color="var(--green)"
        />
      </div>

      {/* Progress bar */}
      {stats.total > 0 && (
        <div style={styles.progressWrap}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${pct}%`,
              }}
            />
          </div>
          <span style={styles.progressLabel}>{pct}% complete</span>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={styles.card}>
      <span style={{ ...styles.cardValue, color }}>{value}</span>
      <span style={styles.cardLabel}>{label}</span>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "28px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginBottom: "16px",
  },
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    padding: "16px",
    textAlign: "center",
  },
  cardValue: {
    display: "block",
    fontFamily: "var(--font-display)",
    fontSize: "28px",
    fontWeight: 800,
    letterSpacing: "-1px",
    lineHeight: 1,
    marginBottom: "4px",
  },
  cardLabel: {
    display: "block",
    fontSize: "11px",
    fontWeight: 500,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  progressWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  progressBar: {
    flex: 1,
    height: "5px",
    background: "var(--bg-card)",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid var(--border)",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, var(--accent-dim), var(--green))",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },
  progressLabel: {
    fontSize: "12px",
    color: "var(--text-muted)",
    minWidth: "75px",
    textAlign: "right",
  },
};
