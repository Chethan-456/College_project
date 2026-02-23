import React, { useState } from "react";

export default function Report() {
  const [period, setPeriod] = useState("Monthly");

  const cards = [
    {
      color: "#3b82f6",
      title: "Student Performance Analytics",
      desc: "Comprehensive analysis of student grades, attendance, and academic progress",
    },
    {
      color: "#22c55e",
      title: "Faculty Performance",
      desc: "Faculty workload, student feedback ratings, and teaching effectiveness",
    },
    {
      color: "#a855f7",
      title: "Department Performance",
      desc: "Department-wise student enrollment, faculty ratio, and resource utilization",
    },
    {
      color: "#f97316",
      title: "Financial Analytics",
      desc: "Budget allocation, expenditure tracking, and revenue analysis",
    },
    {
      color: "#14b8a6",
      title: "Academic Progress",
      desc: "Semester progress, exam schedules, and academic milestone tracking",
    },
    {
      color: "#6366f1",
      title: "Infrastructure Utilization",
      desc: "Classroom usage, lab equipment status, and facility management",
    },
  ];

  return (
    <div style={styles.app}>
      {/* FILTERS */}
      <div style={styles.filterBar}>
        <select style={styles.select}>
          <option>All Reports</option>
        </select>

        <select
          style={styles.select}
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* CARDS */}
      <div style={styles.grid}>
        {cards.map((card, index) => (
          <div key={index} style={styles.card}>
            <div
              style={{
                ...styles.topBorder,
                background: card.color,
              }}
            />

            <div style={styles.cardContent}>
              <div style={styles.cardHeader}>
                <h4 style={styles.cardTitle}>{card.title}</h4>
                <span style={styles.updated}>+2.8%</span>
              </div>

              <p style={styles.cardDesc}>{card.desc}</p>

              {/* 2x2 Stats Layout */}
              <div style={styles.statsGrid}>
                <div style={styles.statBox}>85</div>
                <div style={styles.statBox}>4.6</div>
                <div style={styles.statBox}>3.2</div>
                <div style={styles.statBox}>45</div>
              </div>

              <div style={styles.actions}>
                <button style={styles.actionBtn}>View</button>
                <button style={styles.actionBtn}>Export</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT REPORTS */}
      <div style={styles.recentWrapper}>
        <h4 style={{ marginBottom: 15 }}>Recent Reports</h4>

        {[
          {
            title: "Monthly Academic Performance Report",
            subtitle: "All Departments • Generated: 1/15/2024",
            downloads: "45 downloads",
          },
          {
            title: "Faculty Workload Analysis Q4",
            subtitle: "HR Department • Generated: 1/2/2024",
            downloads: "23 downloads",
          },
          {
            title: "Student Attendance Trends",
            subtitle: "Academic Office • Generated: 1/10/2024",
            downloads: "67 downloads",
          },
          {
            title: "Infrastructure Maintenance Report",
            subtitle: "Facilities • Generated: 1/8/2024",
            downloads: "12 downloads",
          },
        ].map((report, i) => (
          <div key={i} style={styles.reportRow}>
            <div>
              <div style={styles.reportTitle}>{report.title}</div>
              <div style={styles.reportSub}>{report.subtitle}</div>
            </div>
            <div style={styles.downloadText}>{report.downloads}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  app: {
    padding: "30px 50px",
    background: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
  },

  filterBar: {
    display: "flex",
    gap: 12,
    marginBottom: 25,
  },

  select: {
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #ddd",
    background: "#fff",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginBottom: 30,
  },

  card: {
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #eee",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },

  topBorder: {
    height: 4,
    width: "100%",
  },

  cardContent: {
    padding: 18,
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: 600,
  },

  updated: {
    fontSize: 12,
    color: "#16a34a",
  },

  cardDesc: {
    fontSize: 12,
    color: "#6b7280",
    margin: "8px 0 15px",
    lineHeight: 1.4,
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 15,
  },

  statBox: {
    background: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
    fontWeight: 600,
    fontSize: 14,
  },

  actions: {
    display: "flex",
    gap: 10,
  },

  actionBtn: {
    flex: 1,
    padding: "8px 0",
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
  },

  recentWrapper: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    border: "1px solid #eee",
  },

  reportRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderTop: "1px solid #f0f0f0",
  },

  reportTitle: {
    fontSize: 14,
    fontWeight: 500,
  },

  reportSub: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 3,
  },

  downloadText: {
    fontSize: 12,
    color: "#6b7280",
  },
};