import { useState } from "react";

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  // ✅ Hooks ALWAYS come first — before any conditional returns
  // React requires hooks to be called in the same order every render
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // ✅ Guard comes AFTER hooks — never before
  if (!task) return null;

  const isCompleted = task.status === "completed";

  const handleToggle = async () => {
    setToggling(true);
    await onToggle(task._id);
    setToggling(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    setDeleting(true);
    await onDelete(task._id);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      style={{ ...styles.card, ...(isCompleted ? styles.cardCompleted : {}) }}
      className="animate-fadeIn"
    >
      <div
        style={{
          ...styles.strip,
          background: isCompleted ? "var(--green)" : "var(--yellow)",
        }}
      />

      <div style={styles.body}>
        <div style={styles.header}>
          <h3
            style={{
              ...styles.title,
              ...(isCompleted ? styles.titleCompleted : {}),
            }}
          >
            {task.title}
          </h3>
          <span
            style={{
              ...styles.badge,
              ...(isCompleted ? styles.badgeCompleted : styles.badgePending),
            }}
          >
            {isCompleted ? "✓ Done" : "○ Pending"}
          </span>
        </div>

        {task.description && (
          <p
            style={{
              ...styles.desc,
              ...(isCompleted ? styles.descCompleted : {}),
            }}
          >
            {task.description}
          </p>
        )}

        <div style={styles.footer}>
          <span style={styles.date}>📅 {formatDate(task.createdAt)}</span>

          <div style={styles.actions}>
            <button
              onClick={handleToggle}
              disabled={toggling}
              title={isCompleted ? "Mark as pending" : "Mark as completed"}
              style={{
                ...styles.actionBtn,
                ...(isCompleted ? styles.btnUncomplete : styles.btnComplete),
              }}
            >
              {toggling ? "..." : isCompleted ? "↩" : "✓"}
            </button>

            <button
              onClick={() => onEdit(task)}
              title="Edit task"
              style={{ ...styles.actionBtn, ...styles.btnEdit }}
            >
              ✏️
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              title={confirmDelete ? "Click again to confirm" : "Delete task"}
              style={{
                ...styles.actionBtn,
                ...styles.btnDelete,
                ...(confirmDelete ? styles.btnDeleteConfirm : {}),
              }}
            >
              {deleting ? "..." : confirmDelete ? "Sure?" : "🗑"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    display: "flex",
    overflow: "hidden",
    transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
    position: "relative",
  },
  cardCompleted: { opacity: 0.75 },
  strip: {
    width: "4px",
    flexShrink: 0,
    transition: "background 0.3s",
  },
  body: { flex: 1, padding: "16px 18px" },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "8px",
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "16px",
    fontWeight: 600,
    color: "var(--text-primary)",
    lineHeight: 1.3,
    letterSpacing: "-0.2px",
    flex: 1,
  },
  titleCompleted: {
    textDecoration: "line-through",
    color: "var(--text-muted)",
  },
  badge: {
    flexShrink: 0,
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.3px",
    textTransform: "uppercase",
  },
  badgePending: {
    background: "rgba(251, 191, 36, 0.12)",
    color: "var(--yellow)",
    border: "1px solid rgba(251, 191, 36, 0.3)",
  },
  badgeCompleted: {
    background: "var(--green-dim)",
    color: "var(--green)",
    border: "1px solid rgba(52, 211, 153, 0.3)",
  },
  desc: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    lineHeight: 1.5,
    marginBottom: "14px",
  },
  descCompleted: { color: "var(--text-muted)" },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "12px",
  },
  date: { fontSize: "11px", color: "var(--text-muted)" },
  actions: { display: "flex", gap: "6px" },
  actionBtn: {
    padding: "5px 10px",
    borderRadius: "6px",
    border: "1px solid var(--border)",
    background: "var(--bg-secondary)",
    fontSize: "13px",
    color: "var(--text-secondary)",
    transition: "all 0.2s",
    cursor: "pointer",
    minWidth: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnComplete: {
    color: "var(--green)",
    borderColor: "rgba(52, 211, 153, 0.3)",
    background: "var(--green-dim)",
  },
  btnUncomplete: {
    color: "var(--yellow)",
    borderColor: "rgba(251, 191, 36, 0.25)",
    background: "rgba(251, 191, 36, 0.08)",
  },
  btnEdit: {
    color: "var(--accent)",
    borderColor: "rgba(167, 139, 250, 0.3)",
    background: "var(--accent-glow)",
  },
  btnDelete: { color: "var(--text-muted)" },
  btnDeleteConfirm: {
    color: "var(--red)",
    borderColor: "rgba(248, 113, 113, 0.4)",
    background: "var(--red-dim)",
    padding: "5px 12px",
    fontWeight: 600,
    fontSize: "11px",
  },
};
