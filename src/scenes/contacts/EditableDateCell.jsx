import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

const EditableDateCell = ({ initialValue, onSave }) => {
  const [editDate, setEditDate] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(editDate);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <TextField  size="small" style={{ width: "100px" }} value={editDate} onChange={(e) => setEditDate(e.target.value)} />
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

export default EditableDateCell;
