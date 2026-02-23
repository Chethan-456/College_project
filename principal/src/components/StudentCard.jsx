// src/components/StudentCard.js
import React from "react";

const StudentCard = ({ student }) => {
  const borderColor = student.department === "CSE" ? "#4CAF50" :
                      student.department === "ECE" ? "#2196F3" :
                      "#FFC107"; // example for different departments

  return (
    <div style={{
      width: "280px",
      height: "150px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
      fontFamily: "'Roboto', sans-serif",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fff",
      margin: "10px",
    }}>
      {/* Top colored border */}
      <div style={{
        height: "6px",
        backgroundColor: borderColor,
      }} />

      {/* Main content */}
      <div style={{ padding: "12px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ margin: "0", fontSize: "16px", fontWeight: "500" }}>{student.name}</h3>
          <p style={{ margin: "2px 0", fontSize: "14px", color: "#555" }}>{student.roll}</p>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
          <span style={{
            fontSize: "12px",
            padding: "2px 6px",
            backgroundColor: "#f0f0f0",
            borderRadius: "12px"
          }}>{student.department}</span>
          <span style={{
            fontSize: "12px",
            padding: "2px 6px",
            backgroundColor: "#f0f0f0",
            borderRadius: "12px"
          }}>{student.year}</span>
        </div>

        {/* Contact & status */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginTop: "8px" }}>
          <span>{student.phone}</span>
          <span>{student.bloodGroup}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;