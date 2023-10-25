import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

const EditableDaysCell = ({ initialValue, onSave }) => {
  const [editDays, setEditDays] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(editDays);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <TextField  size="small" style={{ width: "100px" }} value={editDays} onChange={(e) => setEditDays(e.target.value)} />
          <IconButton onClick={handleSave}>
            <SaveIcon /> {/* Use the SaveIcon as a button */}
          </IconButton>
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
          {initialValue}
        </div>
      )}
    </div>
  );
};

export default EditableDaysCell;
