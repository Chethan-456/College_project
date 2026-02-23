import React from "react";
import "./Syllabus.css";

const years = ["1st Year", "2nd Year", "3rd Year"];
const semesters = ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester"];

const Syllabus = () => {
  return (
    <div className="syllabus-container">
      {/* Top Header */}
      
      <div className="top-bar">
        <div>
            
          <h2> BCA Syllabus</h2>
          <span>1st Year - 1st Semester</span>
        </div>
        <div className="top-actions">
          <button className="subjects-btn">5 Subjects</button>
          <button className="export-btn">Export</button>
        </div>
      </div>

      {/* Gradient Summary Banner */}
      <div className="summary-banner">
        
        <div className="program-info">
          <div className="icon-box">💻</div>
          <div>
            <h3>Bachelor in Computer Applications</h3>
            <p>Academic Year 2024-25 Curriculum</p>
          </div>
        </div>

        <div className="summary-stats">
          <div>
            <h2>15</h2>
            <span>Total Credits</span>
          </div>
          <div>
            <h2>225</h2>
            <span>Total Hours</span>
          </div>
          <div>
            <h2>5</h2>
            <span>Subjects</span>
          </div>
        </div>
      </div>

      

      <div className="filters">
  <div>
    <label>Year:</label>
    <select>
      {years.map((year, index) => (
        <option key={index} value={year}>{year}</option>
      ))}
    </select>
  </div>
  <div>
    <label>Semester:</label>
    <select>
      {semesters.map((sem, index) => (
        <option key={index} value={sem}>{sem}</option>
      ))}
    </select>
  </div>
</div>

      {/* Subject Card */}
      <div className="subject-card">
        <div className="subject-header">
          <div>
            <h3>
              Programming Fundamentals <span className="badge core">Core</span>
              <span className="badge code">BCA101</span>
            </h3>
            <p>Introduction to programming concepts using C language</p>
          </div>
        </div>

        {/* Subject Stats */}
        <div className="subject-stats">
          <div className="stat-box blue">
            <span>Credits</span>
            <h3>4</h3>
          </div>
          <div className="stat-box green">
            <span>Total Hours</span>
            <h3>60</h3>
          </div>
          <div className="stat-box purple">
            <span>Theory</span>
            <h3>45</h3>
          </div>
          <div className="stat-box orange">
            <span>Practical</span>
            <h3>15</h3>
          </div>
        </div>

        {/* Theory Practical Bar */}
        <div className="distribution">
          <div className="distribution-label">
            Theory vs Practical Distribution
            <span>75% Theory</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="learning-section">
          <h4>Learning Objectives</h4>
          <div className="learning-grid">
            <ul>
              <li>Understand basic programming concepts</li>
              <li>Develop problem-solving skills</li>
            </ul>
            <ul>
              <li>Learn C language syntax</li>
            </ul>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="prerequisites">
          <h4>Prerequisites</h4>
          <span className="prereq-badge">Basic Mathematics</span>
        </div>
      </div>

      {/* Bottom Totals */}
      <div className="bottom-stats">
        <div className="bottom-card">
          <h3 className="fifteen">15</h3>
          <span>Total Credits</span>
        </div>
        <div className="bottom-card">
          <h3 className="ttf">225</h3>
          <span>Total Hours</span>
        </div>
        <div className="bottom-card">
          <h3 className="on">190</h3>
          <span>Theory Hours</span>
        </div>
        <div className="bottom-card">
          <h3 className="orange-text tf"  >35</h3>
          <span>Practical Hours</span>
        </div>
      </div>

      {/* Academic Info */}
      <div className="academic-info">
        <h4>Academic Information</h4>
        <div className="info-grid">
          <div>
            <p>Semester Duration: <span><strong>6 months</strong></span></p>
            <p>Teaching Weeks: <span><strong>18 weeks</strong></span></p>
            <p>Examination Period: <span><strong>2 weeks</strong></span></p>
          </div>
          <div>
            <p>Assessment Pattern: <span><strong>Continuous + Final</strong></span></p>
            <p>Passing Criteria: <span><strong>40% minimum</strong></span></p>
            <p>Credit System:<span> <strong>Choice Based</strong></span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;