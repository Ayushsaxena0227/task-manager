export default function FilterBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
}) {
  const filters = [
    { key: "all", label: "All" },
    { key: "pending", label: "🕐 Pending" },
    { key: "completed", label: "✅ Done" },
  ];

  return (
    <div style={styles.container}>
      {/* Search */}
      <div style={styles.searchWrap}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          style={styles.search}
        />
        {search && (
          <button onClick={() => onSearchChange("")} style={styles.clearBtn}>
            ✕
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div style={styles.tabs}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            style={{
              ...styles.tab,
              ...(filter === f.key ? styles.tabActive : {}),
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  searchWrap: {
    position: "relative",
    flex: 1,
    minWidth: "180px",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    fontSize: "13px",
    pointerEvents: "none",
  },
  search: {
    width: "100%",
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text-primary)",
    padding: "9px 36px 9px 34px",
    fontSize: "13px",
    outline: "none",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.2s",
  },
  clearBtn: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    color: "var(--text-muted)",
    fontSize: "12px",
    cursor: "pointer",
    padding: "2px 4px",
  },
  tabs: {
    display: "flex",
    gap: "6px",
  },
  tab: {
    padding: "8px 16px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "var(--bg-card)",
    color: "var(--text-secondary)",
    fontSize: "13px",
    fontWeight: 500,
    transition: "all 0.2s",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  tabActive: {
    background: "var(--accent-glow)",
    border: "1px solid rgba(167, 139, 250, 0.4)",
    color: "var(--accent)",
  },
};
