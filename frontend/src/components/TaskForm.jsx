import { useState, useEffect } from "react";

const initialForm = { title: "", description: "", status: "pending" };

export default function TaskForm({ onSubmit, initialData = null, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "pending",
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) {
      errs.title = "Title is required";
    } else if (form.title.trim().length < 3) {
      errs.title = "Title must be at least 3 characters";
    } else if (form.title.trim().length > 100) {
      errs.title = "Title cannot exceed 100 characters";
    }
    if (form.description.length > 500) {
      errs.description = "Description cannot exceed 500 characters";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    const result = await onSubmit(form);
    setSubmitting(false);
    if (result?.success) {
      if (!isEditing) setForm(initialForm);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={styles.form}
      className="animate-slideDown"
    >
      <h2 style={styles.formTitle}>
        {isEditing ? "✏️ Edit Task" : "+ New Task"}
      </h2>

      {/* Title */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Title *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          style={{
            ...styles.input,
            ...(errors.title ? styles.inputError : {}),
          }}
          maxLength={100}
          autoFocus={!isEditing}
        />
        <div style={styles.fieldMeta}>
          {errors.title && <span style={styles.errorText}>{errors.title}</span>}
          <span style={{ ...styles.charCount, marginLeft: "auto" }}>
            {form.title.length}/100
          </span>
        </div>
      </div>

      {/* Description */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add some details... (optional)"
          rows={3}
          style={{
            ...styles.input,
            ...styles.textarea,
            ...(errors.description ? styles.inputError : {}),
          }}
          maxLength={500}
        />
        <div style={styles.fieldMeta}>
          {errors.description && (
            <span style={styles.errorText}>{errors.description}</span>
          )}
          <span style={{ ...styles.charCount, marginLeft: "auto" }}>
            {form.description.length}/500
          </span>
        </div>
      </div>

      {/* Status (only shown when editing) */}
      {isEditing && (
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Status</label>
          <div style={styles.statusToggle}>
            {["pending", "completed"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, status: s }))}
                style={{
                  ...styles.statusBtn,
                  ...(form.status === s ? styles.statusBtnActive[s] : {}),
                }}
              >
                {s === "pending" ? "🕐 Pending" : "✅ Completed"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={styles.actions}>
        {onCancel && (
          <button type="button" onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
        )}
        <button type="submit" disabled={submitting} style={styles.submitBtn}>
          {submitting ? (
            <span style={styles.spinner} />
          ) : isEditing ? (
            "Save Changes"
          ) : (
            "Add Task"
          )}
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "28px",
    boxShadow: "var(--shadow-card)",
  },
  formTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "20px",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: "24px",
    letterSpacing: "-0.3px",
  },
  fieldGroup: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: 500,
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text-primary)",
    padding: "12px 14px",
    fontSize: "14px",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
  },
  inputError: {
    borderColor: "var(--red)",
    boxShadow: "0 0 0 2px rgba(248, 113, 113, 0.15)",
  },
  textarea: {
    resize: "vertical",
    minHeight: "80px",
    lineHeight: 1.5,
  },
  fieldMeta: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
    minHeight: "18px",
  },
  errorText: {
    color: "var(--red)",
    fontSize: "12px",
  },
  charCount: {
    color: "var(--text-muted)",
    fontSize: "11px",
  },
  statusToggle: {
    display: "flex",
    gap: "8px",
  },
  statusBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "var(--bg-secondary)",
    color: "var(--text-secondary)",
    fontSize: "13px",
    fontWeight: 500,
    transition: "all 0.2s",
  },
  statusBtnActive: {
    pending: {
      background: "rgba(251, 191, 36, 0.12)",
      border: "1px solid rgba(251, 191, 36, 0.4)",
      color: "var(--yellow)",
    },
    completed: {
      background: "var(--green-dim)",
      border: "1px solid rgba(52, 211, 153, 0.4)",
      color: "var(--green)",
    },
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "24px",
  },
  cancelBtn: {
    padding: "10px 20px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "transparent",
    color: "var(--text-secondary)",
    fontSize: "14px",
    fontWeight: 500,
    transition: "all 0.2s",
  },
  submitBtn: {
    padding: "10px 24px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid rgba(167, 139, 250, 0.4)",
    background:
      "linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(120, 90, 210, 0.25))",
    color: "var(--accent)",
    fontSize: "14px",
    fontWeight: 600,
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "110px",
    minHeight: "40px",
  },
  spinner: {
    display: "inline-block",
    width: "16px",
    height: "16px",
    border: "2px solid rgba(167, 139, 250, 0.3)",
    borderTopColor: "var(--accent)",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
};
