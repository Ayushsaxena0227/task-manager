import { useState, useMemo } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import StatsBar from "./components/StatsBar";
import FilterBar from "./components/FilterBar";
import Modal from "./components/Modal";

export default function App() {
  const {
    tasks,
    loading,
    error,
    stats,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
  } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Derived: filtered + searched tasks
  const visibleTasks = useMemo(() => {
    return tasks
      .filter((t) => filter === "all" || t.status === filter)
      .filter(
        (t) =>
          !search.trim() ||
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()),
      );
  }, [tasks, filter, search]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ─── Header ──────────────────────── */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>TaskFlow</h1>
            <p style={styles.subtitle}>Your tasks, beautifully organized</p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            style={{
              ...styles.newBtn,
              ...(showForm ? styles.newBtnActive : {}),
            }}
          >
            {showForm ? "✕ Close" : "+ New Task"}
          </button>
        </header>

        {/* ─── Create Task Form ─────────────── */}
        {showForm && (
          <div style={styles.formSection}>
            <TaskForm
              onSubmit={async (data) => {
                const result = await createTask(data);
                if (result?.success) setShowForm(false);
                return result;
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* ─── Stats ───────────────────────── */}
        <StatsBar stats={stats} />

        {/* ─── Filter & Search ─────────────── */}
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
        />

        {/* ─── Task List ───────────────────── */}
        <div style={styles.taskList}>
          {loading && (
            <div style={styles.centerMsg}>
              <div style={styles.loader} />
              <span>Loading tasks...</span>
            </div>
          )}

          {error && !loading && (
            <div style={styles.errorBox}>
              <p>⚠️ {error}</p>
              <p
                style={{
                  fontSize: "13px",
                  marginTop: "4px",
                  color: "var(--text-muted)",
                }}
              >
                Make sure the backend server is running on port 5000
              </p>
            </div>
          )}

          {!loading && !error && visibleTasks.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                {tasks.length === 0 ? "📋" : "🔍"}
              </div>
              <p style={styles.emptyTitle}>
                {tasks.length === 0 ? "No tasks yet" : "No matching tasks"}
              </p>
              <p style={styles.emptyDesc}>
                {tasks.length === 0
                  ? "Create your first task using the button above!"
                  : "Try adjusting your search or filter."}
              </p>
            </div>
          )}

          {!loading &&
            visibleTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={toggleTask}
                onEdit={setEditingTask}
                onDelete={deleteTask}
              />
            ))}
        </div>

        {/* ─── Footer ──────────────────────── */}
        <footer style={styles.footer}>
          <p>Built with React + Node.js + Express + MongoDB</p>
        </footer>
      </div>

      {/* ─── Edit Modal ──────────────────────── */}
      {editingTask && (
        <Modal
          task={editingTask}
          onSubmit={updateTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px 16px 60px",
  },
  container: {
    maxWidth: "740px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(28px, 5vw, 40px)",
    fontWeight: 800,
    color: "var(--text-primary)",
    letterSpacing: "-1.5px",
    background: "linear-gradient(135deg, #e8e4f0 30%, var(--accent))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1.1,
  },
  subtitle: {
    color: "var(--text-muted)",
    fontSize: "14px",
    marginTop: "4px",
  },
  newBtn: {
    padding: "11px 22px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid rgba(167, 139, 250, 0.4)",
    background:
      "linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(120, 90, 210, 0.25))",
    color: "var(--accent)",
    fontFamily: "var(--font-display)",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.2px",
  },
  newBtnActive: {
    background: "rgba(248, 113, 113, 0.1)",
    border: "1px solid rgba(248, 113, 113, 0.3)",
    color: "var(--red)",
  },
  formSection: {
    marginBottom: "28px",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minHeight: "100px",
  },
  centerMsg: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    padding: "60px 0",
    color: "var(--text-muted)",
    fontSize: "14px",
  },
  loader: {
    width: "32px",
    height: "32px",
    border: "2px solid var(--border)",
    borderTopColor: "var(--accent)",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  errorBox: {
    background: "var(--red-dim)",
    border: "1px solid rgba(248, 113, 113, 0.3)",
    borderRadius: "var(--radius-md)",
    padding: "20px",
    color: "var(--red)",
    fontSize: "14px",
    textAlign: "center",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "14px",
    display: "block",
  },
  emptyTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "20px",
    fontWeight: 700,
    color: "var(--text-secondary)",
    marginBottom: "8px",
  },
  emptyDesc: {
    color: "var(--text-muted)",
    fontSize: "14px",
  },
  footer: {
    textAlign: "center",
    marginTop: "56px",
    color: "var(--text-muted)",
    fontSize: "12px",
  },
};
