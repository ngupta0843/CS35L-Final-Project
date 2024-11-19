import React, { useState } from "react";
import WorkoutComponent from "./WorkoutComponent";
import { SketchPicker } from "react-color";

const DynamicComponentCreator = () => {
  const [workouts, setWorkouts] = useState([]); // list of workout components
  const [tags, setTags] = useState({}); // ex: { "Push Day": "#FF6347" }
  const [newTag, setNewTag] = useState("");
  const [selectedColor, setSelectedColor] = useState("#007BFF");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // add new workout component
  //this is temporary for now because backend is not fully developed
  const addWorkout = () => {
    setWorkouts([
      ...workouts,
      {
        id: Date.now(),
        exercise: "",
        tag: "",
        date: new Date().toISOString().split("T")[0],
        weight: 0,
        reps: 0,
        sets: 0,
      },
    ]);
  };

  // update an existing workout component
  const updateWorkout = (id, updatedWorkout) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id ? { ...workout, ...updatedWorkout } : workout
      )
    );
  };

  // delete workout component
  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  // Add new tag
  const addTag = () => {
    if (newTag && !tags[newTag]) {
      setTags({ ...tags, [newTag]: selectedColor });
      setNewTag("");
      setSelectedColor("#007BFF");
      setShowColorPicker(false);
    }
  };

  // delete tag
  const deleteTag = (tag) => {
    const newTags = { ...tags };
    delete newTags[tag];
    setTags(newTags);

    // Remove tag from any workouts that are using it
    setWorkouts(
      workouts.map((workout) =>
        workout.tag === tag ? { ...workout, tag: "" } : workout
      )
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ textAlign: "left", color: "#fff" }}>Exercise Log</h2>

      {/* description */}
      <p style={{ color: "#aaa", marginBottom: "20px" }}>
        Use the tag creation tool below to create workout tags with custom
        colors (Ex: Push Day, Legs). Tags can then be assigned to individual
        exercises to help organize your workout plans. You can also delete tags
        if they are no longer needed.
      </p>

      {/* new tag */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTag}
          placeholder="Enter tag name"
          onChange={(e) => setNewTag(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          style={{
            padding: "10px 20px",
            backgroundColor: selectedColor,
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          {showColorPicker ? "Close Color Picker" : "Pick Color"}
        </button>
        {showColorPicker && (
          <div style={{ marginTop: "10px" }}>
            <SketchPicker
              color={selectedColor}
              onChangeComplete={(color) => setSelectedColor(color.hex)}
            />
          </div>
        )}
        <button
          onClick={addTag}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Tag
        </button>
      </div>

      {/*existing tags*/}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {Object.entries(tags).map(([tag, color]) => (
          <div
            key={tag}
            style={{
              display: "flex",
              alignItems: "center",
              border: `1px solid ${color}`,
              borderRadius: "20px",
              padding: "5px 10px",
              backgroundColor: `${color}20`,
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: color,
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></div>
            <span style={{ color, fontWeight: "bold", marginRight: "10px" }}>
              {tag}
            </span>
            <button
              onClick={() => deleteTag(tag)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: color,
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* add exercise */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={addWorkout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Exercise
        </button>
      </div>

      {/* exercise components */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {workouts.map((workout) => (
          <WorkoutComponent
            key={workout.id}
            workout={workout}
            onUpdate={updateWorkout}
            onDelete={deleteWorkout}
            tags={tags}
          />
        ))}
      </div>
    </div>
  );
};

export default DynamicComponentCreator;