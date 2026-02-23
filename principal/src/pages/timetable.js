import React from "react";

export default function Timetable() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const times = [
    "8:00-9:00",
    "9:00-10:00",
    "10:00-10:30",
    "10:30-11:30",
    "11:30-12:30",
    "12:30-13:30",
    "13:30-14:30",
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Top Header */}
        <div style={styles.topHeader}>
          <div>
            <div style={styles.title}>Principal Dashboard - Timetable</div>
            <div style={styles.subTitle}>Academic Year 2024-25</div>
          </div>
          <div>
            <button style={styles.topBtn}>Export</button>
            <button style={styles.topBtn}>Print</button>
          </div>
        </div>

        {/* Purple Banner */}
        <div style={styles.banner}>
          <div>
            <div style={styles.bannerTitle}>College Timetable</div>
            <div style={styles.bannerSub}>
              Working Hours: 8:00 AM - 2:30 PM
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filterRow}>
          <select style={styles.select}><option>BCA</option></select>
          <select style={styles.select}><option>1st Year</option></select>
          <select style={styles.select}><option>1st Semester</option></select>
        </div>

        {/* Timetable Card */}
        <div style={styles.tableCard}>
          <div style={styles.grid}>
            <div></div>
            {days.map((day) => (
              <div key={day} style={styles.dayHeader}>{day}</div>
            ))}

            {times.map((time, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div style={styles.timeCell}>{time}</div>

                {days.map((_, colIndex) => (
                  <div key={colIndex} style={styles.cell}>
                    {time === "10:00-10:30" ? (
                      <div style={styles.breakBox}>BREAK</div>
                    ) : (
                      <div style={styles.subjectBox}>
                        <div style={styles.subjectTitle}>
                          Computer Fundamentals
                        </div>
                        <div style={styles.subjectMeta}>Room 101</div>
                        <div style={styles.subjectMeta}>A. Singh</div>
                      </div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div style={styles.bottomRow}>
          <InfoCard
            title="Daily Schedule"
            content={[
              "First Session: 8:00 AM - 10:00 AM",
              "Break Time: 10:00 AM - 10:30 AM",
              "Second Session: 10:30 AM - 12:30 PM",
              "Third Session: 12:30 PM - 2:30 PM",
              "Total Duration: 6.5 hours",
            ]}
          />
          <InfoCard
            title="Class Information"
            content={[
              "Classes per Day: 6 periods",
              "Period Duration: 1 hour",
              "Break Duration: 30 minutes",
              "Saturday Classes: Half Day",
              "Working Days: 6 days/week",
            ]}
          />
          <InfoCard
            title="Current Status"
            content={[
              "Department: BCA",
              "Academic Year: 2024-25",
              "Current Week: Week 4",
              "Today: Thursday",
              "User Role: Principal",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ title, content }) => (
  <div style={styles.infoCard}>
    <div style={styles.cardTitle}>{title}</div>
    {content.map((item, i) => (
      <div key={i} style={styles.cardText}>{item}</div>
    ))}
  </div>
);

const styles = {
  page: {
    background: "#f4f6fb",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  topHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#2d2d2d",
  },
  subTitle: {
    fontSize: "13px",
    color: "#777",
  },
  topBtn: {
    marginLeft: "10px",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },
  banner: {
    background: "linear-gradient(90deg,#5b2be0,#a020f0)",
    padding: "25px",
    borderRadius: "14px",
    color: "#fff",
    marginBottom: "20px",
  },
  bannerTitle: {
    fontSize: "18px",
    fontWeight: 600,
  },
  bannerSub: {
    fontSize: "13px",
    opacity: 0.9,
  },
  filterRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  select: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
  },
  tableCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "15px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "130px repeat(6, 1fr)",
  },
  dayHeader: {
    padding: "12px",
    fontWeight: 600,
    fontSize: "14px",
    borderBottom: "1px solid #eee",
  },
  timeCell: {
    padding: "12px",
    background: "#eef2ff",
    fontWeight: 600,
    fontSize: "13px",
    borderRight: "1px solid #eee",
    borderBottom: "1px solid #eee",
  },
  cell: {
    padding: "10px",
    borderBottom: "1px solid #f0f0f0",
    borderRight: "1px solid #f0f0f0",
  },
  subjectBox: {
    background: "#f9fafc",
    border: "1px solid #e8ebf2",
    borderRadius: "8px",
    padding: "8px",
  },
  subjectTitle: {
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "4px",
  },
  subjectMeta: {
    fontSize: "11px",
    color: "#777",
  },
  breakBox: {
    background: "#f9e6c3",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
    fontWeight: 600,
    color: "#c47a00",
  },
  bottomRow: {
    display: "flex",
    gap: "20px",
    marginTop: "25px",
  },
  infoCard: {
    flex: 1,
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: 600,
    marginBottom: "12px",
  },
  cardText: {
    fontSize: "13px",
    marginBottom: "6px",
    color: "#555",
  },
};