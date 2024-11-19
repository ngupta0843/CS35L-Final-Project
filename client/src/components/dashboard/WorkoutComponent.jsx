import React, { useState } from "react";

const WorkoutComponent = ({ workout, onUpdate, onDelete, tags }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...workout });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveChanges = () => {
    setIsEditing(false);
    onUpdate(workout.id, formData);
  };

  // get tag color, or use default gray
  const tagColor = tags[formData.tag] || "#6C757D";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: `${tagColor}20`,
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "15px",
        overflow: "hidden",
        flex: "1 1 calc(33% - 15px)",
      }}
    >
      {/* left lining line color, uses tag color */}
      <div
        style={{
          width: "6px",
          backgroundColor: tagColor,
          height: "100%",
        }}
      ></div>

      {/* all editable parts of the component */}
      <div
        style={{
          flex: 1,
          padding: "15px",
          color: tagColor,
        }}
      >
        {isEditing ? (
          <form>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Exercise:
              <input
                type="text"
                name="exercise"
                value={formData.exercise}
                placeholder="e.g., Bench Press"
                onChange={handleChange}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Tag:
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Select a tag</option>
                {Object.keys(tags).map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Weight:
              <input
                type="number"
                name="weight"
                value={formData.weight}
                placeholder="e.g., 135"
                onChange={handleChange}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Reps:
              <input
                type="number"
                name="reps"
                value={formData.reps}
                placeholder="e.g., 10"
                onChange={handleChange}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Sets:
              <input
                type="number"
                name="sets"
                value={formData.sets}
                placeholder="e.g., 3"
                onChange={handleChange}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <button
              type="button"
              onClick={saveChanges}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <h3 style={{ fontSize: "20px", marginBottom: "5px" }}>
              {formData.exercise || "Exercise Name"}
            </h3>
            <span style={{ fontSize: "12px", display: "block" }}>
              {formData.tag || "Tag"}
            </span>
            <p>Date: {formData.date}</p>
            <p>Weight: {formData.weight}</p>
            <p>Reps: {formData.reps}</p>
            <p>Sets: {formData.sets}</p>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(workout.id)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutComponent;