import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const STUDENTS = [
  {
    name:"Rahul Sharma", roll:"BCA001", year:"3rd Year", status:"active",
    cgpa:8.5, attendance:87, semester:"6th Sem", admission:"2022",
    father:"Suresh Sharma", blood:"B+",
    phone:"+91 98765 10001", email:"rahul.sharma@student.college.edu", addr:"123 Tech Park, Bangalore",
    totalFee:80000, paid:50000, pending:30000,
    avatar:"https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name:"Priya Patel", roll:"BCA002", year:"2nd Year", status:"active",
    cgpa:9.1, attendance:92, semester:"4th Sem", admission:"2023",
    father:"Amit Patel", blood:"A+",
    phone:"+91 98765 10002", email:"priya.patel@student.college.edu", addr:"456 Software City, Pune",
    totalFee:80000, paid:80000, pending:0,
    avatar:"https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name:"Kiran Kumar", roll:"BCA003", year:"1st Year", status:"active",
    cgpa:7.8, attendance:78, semester:"2nd Sem", admission:"2024",
    father:"Ravi Kumar", blood:"O+",
    phone:"+91 98765 10003", email:"kiran.kumar@student.college.edu", addr:"789 MG Road, Chennai",
    totalFee:80000, paid:40000, pending:40000,
    avatar:"https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    name:"Sneha Reddy", roll:"BCA004", year:"3rd Year", status:"active",
    cgpa:9.4, attendance:96, semester:"6th Sem", admission:"2022",
    father:"Vijay Reddy", blood:"AB+",
    phone:"+91 98765 10004", email:"sneha.reddy@student.college.edu", addr:"321 Jubilee Hills, Hyderabad",
    totalFee:80000, paid:80000, pending:0,
    avatar:"https://randomuser.me/api/portraits/women/14.jpg",
  },
];

const fmt = n => "₹" + n.toLocaleString("en-IN");

// ── ICONS ─────────────────────────────────────────────────────────
const BackIcon     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
const SearchIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const StarIcon     = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const AttIcon      = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const AcadIcon     = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const PersonIcon   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const FeeIcon      = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
const PhoneIcon    = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.1 1.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0120 15z"/></svg>;
const MailIcon     = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const LocIcon      = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const ChevDownIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>;
const LaptopIcon   = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;

// ── YEAR DROPDOWN ─────────────────────────────────────────────────
function YearDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const opts = ["All Years","1st Year","2nd Year","3rd Year"];
  return (
    <div style={{ position:"relative" }}>
      <button onClick={() => setOpen(!open)}
        style={{ display:"flex", alignItems:"center", gap:"6px", border:"1px solid #e5e7eb", borderRadius:"7px", padding:"6px 12px", fontSize:"12px", color:"#374151", background:"white", cursor:"pointer", fontFamily:"inherit", minWidth:"110px", justifyContent:"space-between" }}>
        {value}<ChevDownIcon/>
      </button>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 4px)", right:0, background:"white", border:"1px solid #e5e7eb", borderRadius:"10px", minWidth:"130px", zIndex:100, boxShadow:"0 4px 14px rgba(0,0,0,0.1)", overflow:"hidden" }}>
          {opts.map(o => (
            <div key={o} onClick={() => { onChange(o); setOpen(false); }}
              style={{ padding:"9px 14px", fontSize:"12px", cursor:"pointer", color: value===o ? "#2563eb" : "#374151", fontWeight: value===o ? 600 : 400, background: value===o ? "#eff6ff" : "white" }}>
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── STUDENT CARD ──────────────────────────────────────────────────
function StudentCard({ s }) {
  const pendColor = s.pending > 0 ? "#ef4444" : "#9ca3af";
  return (
    <div style={{ background:"white", borderRadius:"14px", border:"1px solid #e5e7eb", overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ padding:"16px 18px 0" }}>

        {/* Header row */}
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"10px" }}>
          <div style={{ width:"52px", height:"52px", borderRadius:"50%", overflow:"hidden", border:"2px solid #e5e7eb", flexShrink:0 }}>
            <img src={s.avatar} alt={s.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"2px" }}>
              <span style={{ fontWeight:700, fontSize:"14px", color:"#1f2937" }}>{s.name}</span>
              <span style={{ fontSize:"10px", fontWeight:600, background:"#dcfce7", color:"#16a34a", padding:"2px 8px", borderRadius:"20px" }}>{s.status}</span>
            </div>
            <p style={{ fontSize:"11.5px", color:"#6b7280", margin:"0 0 5px" }}>{s.roll} • {s.year}</p>
            <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"11.5px", color:"#374151", fontWeight:600 }}>
                <StarIcon/> {s.cgpa} CGPA
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"11.5px", color:"#374151", fontWeight:600 }}>
                <AttIcon/> {s.attendance}%
              </span>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div style={{ background:"#eff6ff", borderRadius:"8px", padding:"10px 14px", marginBottom:"8px" }}>
          <p style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"11.5px", fontWeight:600, color:"#2563eb", margin:"0 0 6px" }}>
            <AcadIcon/> Academic Details
          </p>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:"12px", color:"#374151" }}>
            <span>Semester: <b>{s.semester}</b></span>
            <span>Admission: <b>{s.admission}</b></span>
          </div>
        </div>

        {/* Personal Information */}
        <div style={{ background:"#f0fdf4", borderRadius:"8px", padding:"10px 14px", marginBottom:"8px" }}>
          <p style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"11.5px", fontWeight:600, color:"#16a34a", margin:"0 0 6px" }}>
            <PersonIcon/> Personal Information
          </p>
          <p style={{ fontSize:"12px", color:"#374151", margin:"0 0 3px" }}>Father: <b>{s.father}</b></p>
          <p style={{ fontSize:"12px", color:"#374151", margin:0 }}>Blood Group: <b>{s.blood}</b></p>
        </div>

        {/* Fee Status */}
        <div style={{ background:"#fffbeb", borderRadius:"8px", padding:"10px 14px", marginBottom:"12px" }}>
          <p style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"11.5px", fontWeight:600, color:"#d97706", margin:"0 0 8px" }}>
            <FeeIcon/> Fee Status
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", textAlign:"center" }}>
            <div>
              <p style={{ fontSize:"13px", fontWeight:700, color:"#374151", margin:"0 0 1px" }}>{fmt(s.totalFee)}</p>
              <p style={{ fontSize:"10px", color:"#9ca3af", margin:0 }}>Total</p>
            </div>
            <div>
              <p style={{ fontSize:"13px", fontWeight:700, color:"#16a34a", margin:"0 0 1px" }}>{fmt(s.paid)}</p>
              <p style={{ fontSize:"10px", color:"#9ca3af", margin:0 }}>Paid</p>
            </div>
            <div>
              <p style={{ fontSize:"13px", fontWeight:700, color:pendColor, margin:"0 0 1px" }}>{fmt(s.pending)}</p>
              <p style={{ fontSize:"10px", color:"#9ca3af", margin:0 }}>Pending</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div style={{ paddingBottom:"14px", display:"flex", flexDirection:"column", gap:"5px" }}>
          {[
            [PhoneIcon, s.phone],
            [MailIcon,  s.email],
            [LocIcon,   s.addr],
          ].map(([Icon, val], i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"11.5px", color:"#6b7280" }}>
              <Icon/>{val}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────
export default function BCAStudents({ onBack }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [year,   setYear]   = useState("All Years");

  const handleBack = () => typeof onBack === "function" ? onBack() : navigate(-1);

  const filtered = useMemo(() => STUDENTS.filter(s => {
    const my = year === "All Years" || s.year === year;
    const q  = search.toLowerCase();
    const mq = !q || s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    return my && mq;
  }), [search, year]);

  const avgCgpa = (filtered.reduce((a,s) => a + s.cgpa, 0) / (filtered.length || 1)).toFixed(1);
  const goodAtt = filtered.filter(s => s.att >= 85).length;
  const cleared = filtered.filter(s => s.pending === 0).length;
  const highPerf= filtered.filter(s => s.cgpa >= 9).length;

  return (
    <div style={{ minHeight:"100vh", background:"#f7f8fc", fontFamily:"'Segoe UI',sans-serif" }}>

      {/* ── TOP NAV ── */}
      <div style={{ background:"white", borderBottom:"1px solid #e5e7eb", padding:"10px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
          <button onClick={handleBack}
            style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"28px", height:"28px", borderRadius:"6px", border:"none", background:"none", cursor:"pointer", color:"#374151" }}>
            <BackIcon/>
          </button>
          <div>
            <p style={{ fontWeight:700, fontSize:"14.5px", color:"#1f2937", margin:0 }}>BCA Students</p>
            <p style={{ fontSize:"11px", color:"#9ca3af", margin:0 }}>Bachelor in Computer Applications</p>
          </div>
        </div>
        <span style={{ fontSize:"11px", fontWeight:600, padding:"4px 12px", borderRadius:"20px", background:"#eff6ff", color:"#2563eb" }}>
          {filtered.length} Students
        </span>
      </div>

      {/* ── BANNER ── */}
      <div style={{ background:"linear-gradient(135deg,#38bdf8,#0ea5e9,#0284c7)", padding:"24px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
          <div style={{ width:"48px", height:"48px", borderRadius:"12px", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <LaptopIcon/>
          </div>
          <div>
            <p style={{ fontWeight:700, fontSize:"16px", color:"white", margin:"0 0 3px" }}>Bachelor in Computer Applications</p>
            <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.8)", margin:0 }}>Computer Science and Application Development</p>
          </div>
        </div>
        <div style={{ display:"flex", gap:"60px" }}>
          {[
            [STUDENTS.length, "Total Students"],
            [filtered.length, "Current View"],
            [avgCgpa,         "Avg CGPA"],
          ].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign:"center" }}>
              <p style={{ fontSize:"24px", fontWeight:800, color:"white", margin:"0 0 2px" }}>{val}</p>
              <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.75)", margin:0 }}>{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"16px 28px", display:"flex", flexDirection:"column", gap:"16px" }}>

        {/* ── SEARCH + FILTER ── */}
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ flex:1, position:"relative" }}>
            <span style={{ position:"absolute", left:"10px", top:"50%", transform:"translateY(-50%)" }}><SearchIcon/></span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search students by name, roll number, or email..."
              style={{ width:"100%", padding:"9px 12px 9px 32px", border:"1px solid #e5e7eb", borderRadius:"8px", fontSize:"12.5px", outline:"none", fontFamily:"inherit", color:"#374151", boxSizing:"border-box" }}/>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"12.5px", color:"#374151" }}>
            <span style={{ fontWeight:500 }}>Year:</span>
            <YearDropdown value={year} onChange={setYear}/>
          </div>
        </div>

        {/* ── STUDENT CARDS GRID ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
          {filtered.length
            ? filtered.map((s, i) => <StudentCard key={i} s={s}/>)
            : <div style={{ gridColumn:"span 2", textAlign:"center", padding:"40px", color:"#9ca3af" }}>No students found.</div>
          }
        </div>

        {/* ── FOOTER STATS ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px" }}>
          {[
            [filtered.length, "Total Students",  "#2563eb"],
            [goodAtt,         "Good Attendance",  "#16a34a"],
            [cleared,         "Fees Cleared",     "#7c3aed"],
            [highPerf,        "High Performers",  "#f97316"],
          ].map(([val, lbl, color]) => (
            <div key={lbl} style={{ background:"white", borderRadius:"12px", padding:"18px", textAlign:"center", border:"1px solid #f0f0f0", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize:"26px", fontWeight:800, color, margin:"0 0 4px" }}>{val}</p>
              <p style={{ fontSize:"12px", color:"#9ca3af", margin:0 }}>{lbl}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}