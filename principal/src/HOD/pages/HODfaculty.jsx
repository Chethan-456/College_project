import { useState } from "react";

// ── tiny SVG icon kit ──────────────────────────────────────────────
const I = {
  back:     ()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>,
  home:     ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  users:    ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  calendar: ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  bell:     ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  msg:      ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  book:     ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  chart:    ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  settings: ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  bellTop:  ()=><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  bot:      ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 15h.01M16 15h.01"/></svg>,
  logout:   ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  dob:      ()=><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  mail:     ()=><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  phone:    ()=><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.07.01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  pin:      ()=><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  grad:     ()=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  brief:    ()=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
  clock:    ()=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  userIcon: ()=><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#93afc8" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  eye:      ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  edit:     ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  check:    ()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>,
  cross:    ()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  faculty:  ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  chatbox:  ()=><svg width="17" height="15" viewBox="0 0 24 22" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
};

const NAV = [
  { key:"Home",          Icon:I.home     },
  { key:"Faculty",       Icon:I.users    },
  { key:"Timetable",     Icon:I.calendar },
  { key:"Notifications", Icon:I.bell     },
  { key:"Messages",      Icon:I.msg      },
  { key:"Classes",       Icon:I.book     },
  { key:"Reports",       Icon:I.chart    },
];

// Faculty colours for avatar placeholders
const COLORS = ["#dbeafe","#fce7f3","#dcfce7","#fef3c7"];
const TEXT_C = ["#1d4ed8","#be185d","#15803d","#92400e"];

const FACULTY = [
  {
    id:1, name:"Prof. Priya Sharma",  qual:"M.Tech CSE",           exp:"8 Years",
    subject:"Programming in C",
    classes:["BCA-1 (9:30-10:30)","BCA-2 (11:00-12:00)","BCA-3 (1:00-2:00)"],
    hours:"3h", withinLimit:true, attendance:"95%",
    leave:"1 pending",
  },
  {
    id:2, name:"Dr. Amit Verma",      qual:"Ph.D. Computer Science", exp:"12 Years",
    subject:"Data Structures",
    classes:["BCA-1 (10:30-11:30)","BCA-2 (12:00-1:00)","BCA-3 (2:00-2:30)"],
    hours:"2.5h", withinLimit:true, attendance:"98%",
    leave:"None",
  },
  {
    id:3, name:"Prof. Neha Gupta",    qual:"M.Tech IT",             exp:"6 Years",
    subject:"Database Management",
    classes:["BCA-2 (8:00-9:00)","BCA-3 (9:30-10:30)","BCA-1 (12:30-1:30)","BCA-2 (2:00-2:30)"],
    hours:"4h", withinLimit:true, attendance:"92%",
    leave:"2 pending",
  },
  {
    id:4, name:"Prof. Rohit Singh",   qual:"M.Sc Computer Science", exp:"5 Years",
    subject:"Web Development",
    classes:["BCA-1 (8:30-9:30)","BCA-2 (11:00-12:00)","BCA-2 (1:30-2:30)"],
    hours:"3h", withinLimit:true, attendance:"90%",
    leave:"None",
  },
];

// ── shared style tokens ────────────────────────────────────────────
const S = {
  wrap:   { fontFamily:"'Segoe UI',Arial,sans-serif", fontSize:"13px", background:"#f5f6fa", minHeight:"100vh", color:"#222" },
  topbar: { display:"flex", alignItems:"center", justifyContent:"space-between", background:"#fff", borderBottom:"1px solid #e2e5ea", padding:"10px 28px" },
  sidebar:{ width:"210px", minWidth:"210px", background:"#fff", borderRight:"1px solid #e2e5ea", padding:"16px", display:"flex", flexDirection:"column", gap:"13px" },
  divider:{ borderTop:"1px solid #eef0f4", margin:"0" },
  navBtn: (active)=>({ display:"flex", alignItems:"center", gap:"6px", padding:"12px 20px", background: active?"#f5f6fa":"transparent", border:"none", borderBottom: active?"2.5px solid #374151":"2.5px solid transparent", cursor:"pointer", fontSize:"12.5px", fontWeight: active?600:400, color: active?"#111":"#777" }),
  tag:    { background:"#e8f0fe", color:"#1a56db", borderRadius:"4px", padding:"2px 8px", fontSize:"11px", display:"inline-block" },
  wl:     { background:"#f0fdf4", color:"#15803d", border:"1px solid #bbf7d0", borderRadius:"4px", padding:"2px 8px", fontSize:"11px", display:"inline-block" },
  iconBtn:{ background:"none", border:"none", cursor:"pointer", padding:"2px 4px", color:"#555", display:"inline-flex", alignItems:"center" },
};

// ── Avatar circle ──────────────────────────────────────────────────
function Avatar({ idx }) {
  return (
    <div style={{ width:"38px", height:"38px", borderRadius:"50%", background:COLORS[idx%4], display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:"1px solid #e2e5ea" }}>
      <span style={{ fontWeight:700, fontSize:"13px", color:TEXT_C[idx%4] }}>
        {["PS","AV","NG","RS"][idx%4]}
      </span>
    </div>
  );
}

// ── Sidebar (shared) ───────────────────────────────────────────────
function Sidebar() {
  return (
    <aside style={S.sidebar}>
      <button style={{ display:"flex", alignItems:"center", gap:"5px", background:"none", border:"none", cursor:"pointer", color:"#555", fontSize:"12px", fontWeight:500 }}>
        {I.back()} Back
      </button>

      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
        <div style={{ position:"relative", width:"76px", height:"76px" }}>
          <div style={{ width:"76px", height:"76px", borderRadius:"50%", overflow:"hidden", border:"2px solid #dde3ec", background:"linear-gradient(135deg,#dbeafe,#bfdbfe)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {I.userIcon()}
          </div>
          <div style={{ position:"absolute", bottom:"3px", right:"3px", width:"13px", height:"13px", background:"#22c55e", borderRadius:"50%", border:"2px solid #fff" }} />
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontWeight:700, fontSize:"13px", color:"#1a1a2e" }}>Dr. Rajesh Kumar</div>
          <div style={{ color:"#777", fontSize:"11px", marginTop:"2px" }}>Head of Department - BCA</div>
          <span style={{ display:"inline-block", marginTop:"5px", background:"#f1f3f6", color:"#555", borderRadius:"20px", padding:"2px 14px", fontSize:"11px" }}>Active</span>
        </div>
      </div>

      <hr style={S.divider}/>

      <div>
        <div style={{ fontWeight:600, fontSize:"11.5px", color:"#333", marginBottom:"7px" }}>Personal Information</div>
        {[
          [I.dob,  "DOB:",    "15th March, 1975"],
          [I.mail, "Email:",  "rajesh.kumar@college.edu"],
          [I.phone,"Phone:",  "+91 98765 43210"],
          [I.pin,  "Office:", "BCA Block, Room 301"],
        ].map(([Ic,label,val])=>(
          <div key={label} style={{ display:"flex", alignItems:"flex-start", gap:"6px", marginBottom:"6px", fontSize:"11px", color:"#555" }}>
            <span style={{ marginTop:"1px", flexShrink:0 }}><Ic/></span>
            <span><b style={{ color:"#333" }}>{label}</b> {val}</span>
          </div>
        ))}
      </div>

      <hr style={S.divider}/>

      <div>
        <div style={{ display:"flex", alignItems:"center", gap:"5px", fontWeight:600, fontSize:"11.5px", color:"#333", marginBottom:"7px" }}>
          {I.grad()} Education
        </div>
        {["Ph.D. in Computer Science - IIT Delhi (2005)","M.Tech in Software Engineering - IIT Bombay (2001)","B.Tech in Computer Science - Delhi University (1998)"].map(e=>(
          <div key={e} style={{ fontSize:"10.5px", color:"#555", marginBottom:"4px" }}>• {e}</div>
        ))}
      </div>

      <hr style={S.divider}/>

      <div>
        <div style={{ display:"flex", alignItems:"center", gap:"5px", fontWeight:600, fontSize:"11.5px", color:"#333", marginBottom:"6px" }}>
          {I.brief()} Experience &amp; Specialization
        </div>
        <div style={{ fontSize:"11px", color:"#555", lineHeight:"1.7" }}>
          <div>Experience: 20+ Years</div>
          <div>Specialization: Software Engineering, AI &amp; ML</div>
        </div>
      </div>

      <hr style={S.divider}/>

      <div>
        <div style={{ display:"flex", alignItems:"center", gap:"5px", fontWeight:600, fontSize:"11.5px", color:"#333", marginBottom:"6px" }}>
          {I.clock()} Working Hours
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:"11px" }}>
          <span style={{ color:"#555" }}>Monday</span>
          <span style={{ color:"#16a34a", fontWeight:600 }}>7:30 AM - 2:30 PM</span>
        </div>
      </div>
    </aside>
  );
}

// ── Top bar (shared) ───────────────────────────────────────────────
function TopBar() {
  return (
    <div style={S.topbar}>
      <div>
        <div style={{ fontWeight:700, fontSize:"15px", color:"#1a1a2e" }}>HOD Dashboard</div>
        <div style={{ color:"#888", fontSize:"11px" }}>BCA Department Management</div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"18px" }}>
        <div style={{ border:"2px solid #f87171", borderRadius:"5px", padding:"3px 5px", display:"flex", alignItems:"center", cursor:"pointer" }}>{I.chatbox()}</div>
        <button style={{ ...S.iconBtn, gap:"4px", color:"#444", fontSize:"12px" }}>{I.settings()} Settings</button>
        <div style={{ position:"relative", cursor:"pointer" }}>
          {I.bellTop()}
          <span style={{ position:"absolute", top:"-6px", right:"-7px", background:"#ef4444", color:"#fff", borderRadius:"50%", fontSize:"9px", width:"15px", height:"15px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>3</span>
        </div>
        <button style={{ ...S.iconBtn, gap:"4px", color:"#2563eb", fontSize:"12px", fontWeight:500 }}>{I.bot()} AI Assistant</button>
        <button style={{ ...S.iconBtn, gap:"4px", color:"#ef4444", fontSize:"12px", fontWeight:500 }}>{I.logout()} Logout</button>
      </div>
    </div>
  );
}

// ── Faculty row ────────────────────────────────────────────────────
function FacultyRow({ f, idx, isLast, onView, onEdit, onApprove, onReject }) {
  return (
    <tr style={{ borderBottom: isLast?"none":"1px solid #f0f2f6", verticalAlign:"middle" }}>
      {/* Faculty */}
      <td style={{ padding:"16px 12px 16px 20px", minWidth:"160px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <Avatar idx={idx}/>
          <div>
            <div style={{ fontWeight:600, fontSize:"12.5px", color:"#1a1a2e" }}>{f.name}</div>
            <div style={{ color:"#888", fontSize:"10.5px" }}>{f.qual}</div>
            <div style={{ color:"#aaa", fontSize:"10px" }}>{f.exp}</div>
          </div>
        </div>
      </td>

      {/* Subject */}
      <td style={{ padding:"16px 12px", fontSize:"12.5px", color:"#333", minWidth:"140px" }}>{f.subject}</td>

      {/* Today's Classes */}
      <td style={{ padding:"16px 12px", minWidth:"160px" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
          {f.classes.map(c=>(
            <span key={c} style={S.tag}>{c}</span>
          ))}
        </div>
      </td>

      {/* Daily Hours */}
      <td style={{ padding:"16px 12px", minWidth:"130px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <span style={{ fontWeight:600, fontSize:"12.5px", color:"#1a1a2e" }}>{f.hours}</span>
          {f.withinLimit && <span style={S.wl}>Within Limit</span>}
        </div>
      </td>

      {/* Attendance */}
      <td style={{ padding:"16px 12px", fontSize:"12.5px", fontWeight:600, color:"#1a1a2e", minWidth:"90px" }}>
        {f.attendance}
      </td>

      {/* Leave Requests */}
      <td style={{ padding:"16px 12px", minWidth:"130px" }}>
        {f.leave === "None"
          ? <span style={{ color:"#aaa", fontSize:"12px" }}>None</span>
          : <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <span style={{ color:"#555", fontSize:"12px" }}>{f.leave}</span>
              <button title="Approve" onClick={()=>onApprove(f.id)} style={{ ...S.iconBtn, padding:0 }}>{I.check()}</button>
              <button title="Reject"  onClick={()=>onReject(f.id)}  style={{ ...S.iconBtn, padding:0 }}>{I.cross()}</button>
            </div>
        }
      </td>

      {/* Actions */}
      <td style={{ padding:"16px 20px 16px 12px", minWidth:"80px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <button title="View"  onClick={()=>onView(f)} style={{ ...S.iconBtn, color:"#555" }}>{I.eye()}</button>
          <button title="Edit"  onClick={()=>onEdit(f)} style={{ ...S.iconBtn, color:"#555" }}>{I.edit()}</button>
        </div>
      </td>
    </tr>
  );
}

// ── Modal ─────────────────────────────────────────────────────────
function Modal({ title, children, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.35)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}>
      <div style={{ background:"#fff", borderRadius:"10px", padding:"28px", minWidth:"340px", maxWidth:"480px", width:"90%", boxShadow:"0 8px 32px rgba(0,0,0,.18)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"18px" }}>
          <div style={{ fontWeight:700, fontSize:"14px", color:"#1a1a2e" }}>{title}</div>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"18px", color:"#888", lineHeight:1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav]   = useState("Faculty");
  const [faculty,   setFaculty]     = useState(FACULTY);
  const [viewModal, setViewModal]   = useState(null);
  const [editModal, setEditModal]   = useState(null);
  const [editData,  setEditData]    = useState({});
  const [toast,     setToast]       = useState(null);

  const showToast = (msg, color="#16a34a") => {
    setToast({ msg, color });
    setTimeout(()=>setToast(null), 2500);
  };

  const handleApprove = (id) => {
    setFaculty(prev=>prev.map(f=>f.id===id ? { ...f, leave:"None" } : f));
    showToast("Leave request approved ✓");
  };
  const handleReject  = (id) => {
    setFaculty(prev=>prev.map(f=>f.id===id ? { ...f, leave:"None" } : f));
    showToast("Leave request rejected","#ef4444");
  };
  const handleEdit    = (f) => { setEditModal(f); setEditData({ name:f.name, qual:f.qual, subject:f.subject, attendance:f.attendance }); };
  const handleSave    = () => {
    setFaculty(prev=>prev.map(f=>f.id===editModal.id ? { ...f, ...editData } : f));
    setEditModal(null);
    showToast("Faculty record updated ✓");
  };

  return (
    <div style={S.wrap}>
      <TopBar/>

      <div style={{ display:"flex", minHeight:"calc(100vh - 53px)" }}>
        <Sidebar/>

        <main style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* NAV TABS */}
          <div style={{ background:"#fff", borderBottom:"1px solid #e2e5ea" }}>
            <div style={{ display:"flex" }}>
              {NAV.map(({ key, Icon })=>(
                <button key={key} onClick={()=>setActiveNav(key)} style={S.navBtn(activeNav===key)}>
                  <Icon/> {key}
                </button>
              ))}
            </div>
          </div>

          {/* FACULTY PAGE CONTENT */}
          <div style={{ padding:"24px", overflowY:"auto" }}>
            <div style={{ background:"#fff", border:"1px solid #e2e5ea", borderRadius:"8px", overflow:"hidden" }}>

              {/* Table header */}
              <div style={{ padding:"16px 20px", borderBottom:"1px solid #eef0f4", display:"flex", alignItems:"center", gap:"8px" }}>
                {I.faculty()}
                <span style={{ fontWeight:700, fontSize:"13.5px", color:"#1a1a2e" }}>Faculty Management</span>
              </div>

              {/* Table */}
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ borderBottom:"1px solid #eef0f4", background:"#fafbfc" }}>
                      {["Faculty","Subject","Today's Classes","Daily Hours","Attendance","Leave Requests","Actions"].map(h=>(
                        <th key={h} style={{ padding:"10px 12px", textAlign:"left", fontSize:"12px", fontWeight:600, color:"#555", whiteSpace:"nowrap",
                          paddingLeft: h==="Faculty"?"20px": h==="Actions"?"12px":"12px",
                          paddingRight: h==="Actions"?"20px":"12px"
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {faculty.map((f, idx)=>(
                      <FacultyRow
                        key={f.id} f={f} idx={idx} isLast={idx===faculty.length-1}
                        onView={setViewModal}
                        onEdit={handleEdit}
                        onApprove={handleApprove}
                        onReject={handleReject}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* VIEW MODAL */}
      {viewModal && (
        <Modal title="Faculty Details" onClose={()=>setViewModal(null)}>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px", fontSize:"12.5px", color:"#444" }}>
            {[["Name",viewModal.name],["Qualification",viewModal.qual],["Experience",viewModal.exp],
              ["Subject",viewModal.subject],["Attendance",viewModal.attendance],["Leave",viewModal.leave]
            ].map(([k,v])=>(
              <div key={k} style={{ display:"flex", gap:"10px" }}>
                <span style={{ fontWeight:600, color:"#333", width:"110px", flexShrink:0 }}>{k}:</span>
                <span>{v}</span>
              </div>
            ))}
            <div style={{ fontWeight:600, color:"#333", marginTop:"6px" }}>Today's Classes:</div>
            {viewModal.classes.map(c=><span key={c} style={{ ...S.tag, marginRight:"4px" }}>{c}</span>)}
          </div>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {editModal && (
        <Modal title="Edit Faculty" onClose={()=>setEditModal(null)}>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {[["Name","name"],["Qualification","qual"],["Subject","subject"],["Attendance","attendance"]].map(([label,field])=>(
              <div key={field}>
                <div style={{ fontSize:"11.5px", fontWeight:600, color:"#555", marginBottom:"4px" }}>{label}</div>
                <input
                  value={editData[field]||""}
                  onChange={e=>setEditData(p=>({...p,[field]:e.target.value}))}
                  style={{ width:"100%", padding:"7px 10px", border:"1px solid #dde3ec", borderRadius:"5px", fontSize:"12.5px", outline:"none", boxSizing:"border-box" }}
                />
              </div>
            ))}
            <div style={{ display:"flex", gap:"10px", marginTop:"6px" }}>
              <button onClick={handleSave} style={{ flex:1, padding:"8px", background:"#1a1a2e", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer", fontWeight:600, fontSize:"12.5px" }}>Save Changes</button>
              <button onClick={()=>setEditModal(null)} style={{ flex:1, padding:"8px", background:"#f1f3f6", color:"#555", border:"none", borderRadius:"6px", cursor:"pointer", fontSize:"12.5px" }}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ position:"fixed", bottom:"28px", right:"28px", background:toast.color, color:"#fff", padding:"10px 20px", borderRadius:"7px", fontSize:"12.5px", fontWeight:600, boxShadow:"0 4px 16px rgba(0,0,0,.18)", zIndex:2000 }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}