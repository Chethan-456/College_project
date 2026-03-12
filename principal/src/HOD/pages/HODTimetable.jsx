import { useState } from "react";

// ── SVG Icons ──────────────────────────────────────────────────────
const I = {
  back:      ()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>,
  home:      ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  users:     ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  calendar:  ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  bell:      ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  message:   ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  book:      ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  chart:     ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  settings:  ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  bellTop:   ()=><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  bot:       ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 15h.01M16 15h.01"/></svg>,
  logout:    ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  dob:       ()=><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  mail:      ()=><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  phone:     ()=><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.07.01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  pin:       ()=><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  grad:      ()=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  brief:     ()=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
  clock:     ()=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  userIcon:  ()=><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#93afc8" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  chatbox:   ()=><svg width="17" height="15" viewBox="0 0 24 22" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  edit2:     ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  plus:      ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  modify:    ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  view:      ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
};

// ── Nav items ──────────────────────────────────────────────────────
const NAV = [
  { key:"Home",          Icon:I.home     },
  { key:"Faculty",       Icon:I.users    },
  { key:"Timetable",     Icon:I.calendar },
  { key:"Notifications", Icon:I.bell     },
  { key:"Messages",      Icon:I.message  },
  { key:"Classes",       Icon:I.book     },
  { key:"Reports",       Icon:I.chart    },
];

// ── Timetable data ─────────────────────────────────────────────────
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const SLOTS = ["7:30-8:30","8:30-9:30","9:30-10:30","10:30-11:30","11:00-12:00"];

// color map per faculty
const FCOL = {
  "Prof. Rohit": { bg:"#e0f2fe", border:"#bae6fd" },
  "Prof. Priya": { bg:"#fef9c3", border:"#fde68a" },
  "Dr. Amit":    { bg:"#fef9c3", border:"#fde68a" },
  "Prof. Neha":  { bg:"#dcfce7", border:"#bbf7d0" },
};

const TIMETABLE = {
  "7:30-8:30":  { Monday:null, Tuesday:null, Wednesday:null, Thursday:null, Friday:null, Saturday:null },
  "8:30-9:30":  {
    Monday:   { prof:"Prof. Rohit", subj:"Web Dev",        batch:"BCA-1" },
    Tuesday:  { prof:"Prof. Neha",  subj:"DBMS",           batch:"BCA-2" },
    Wednesday:null, Thursday:null, Friday:null, Saturday:null
  },
  "9:30-10:30": {
    Monday:   { prof:"Prof. Priya", subj:"Programming",    batch:"BCA-1" },
    Tuesday:  null,
    Wednesday:{ prof:"Prof. Neha",  subj:"DBMS",           batch:"BCA-3" },
    Thursday:null, Friday:null, Saturday:null
  },
  "10:30-11:30":{
    Monday:   { prof:"Dr. Amit",    subj:"Data Structures", batch:"BCA-1" },
    Tuesday:null, Wednesday:null, Thursday:null, Friday:null, Saturday:null
  },
  "11:00-12:00":{
    Monday:   { prof:"Prof. Rohit", subj:"Web Dev",        batch:"BCA-3" },
    Tuesday:  { prof:"Prof. Priya", subj:"Programming",    batch:"BCA-2" },
    Wednesday:null, Thursday:null, Friday:null, Saturday:null
  },
};

const FACULTY_LOAD = [
  { name:"Prof. Priya Sharma", used:3, max:4 },
  { name:"Dr. Amit Verma",     used:2.5, max:4 },
  { name:"Prof. Neha Gupta",   used:4, max:4 },
  { name:"Prof. Rohit Singh",  used:3, max:4 },
];

const WORKING_DAYS = ["Monday","Tuesday","Wednesday","Thursday"];

// ── Shared layout pieces ───────────────────────────────────────────
function TopBar() {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fff",borderBottom:"1px solid #e2e5ea",padding:"10px 28px"}}>
      <div>
        <div style={{fontWeight:700,fontSize:"15px",color:"#1a1a2e"}}>HOD Dashboard</div>
        <div style={{color:"#888",fontSize:"11px"}}>BCA Department Management</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"18px"}}>
        <div style={{border:"2px solid #f87171",borderRadius:"5px",padding:"3px 5px",display:"flex",alignItems:"center",cursor:"pointer"}}>{I.chatbox()}</div>
        <button style={{display:"flex",alignItems:"center",gap:"4px",background:"none",border:"none",cursor:"pointer",color:"#444",fontSize:"12px"}}>{I.settings()} Settings</button>
        <div style={{position:"relative",cursor:"pointer"}}>
          {I.bellTop()}
          <span style={{position:"absolute",top:"-6px",right:"-7px",background:"#ef4444",color:"#fff",borderRadius:"50%",fontSize:"9px",width:"15px",height:"15px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>3</span>
        </div>
        <button style={{display:"flex",alignItems:"center",gap:"4px",background:"none",border:"none",cursor:"pointer",color:"#2563eb",fontSize:"12px",fontWeight:500}}>{I.bot()} AI Assistant</button>
        <button style={{display:"flex",alignItems:"center",gap:"4px",background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:"12px",fontWeight:500}}>{I.logout()} Logout</button>
      </div>
    </div>
  );
}

function Sidebar({ onBack }) {
  return (
    <aside style={{width:"210px",minWidth:"210px",background:"#fff",borderRight:"1px solid #e2e5ea",padding:"16px",display:"flex",flexDirection:"column",gap:"13px",flexShrink:0}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:"5px",background:"none",border:"none",cursor:"pointer",color:"#555",fontSize:"12px",fontWeight:500}}>{I.back()} Back</button>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"8px"}}>
        <div style={{position:"relative",width:"76px",height:"76px"}}>
          <div style={{width:"76px",height:"76px",borderRadius:"50%",border:"2px solid #dde3ec",background:"linear-gradient(135deg,#dbeafe,#bfdbfe)",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.userIcon()}</div>
          <div style={{position:"absolute",bottom:"3px",right:"3px",width:"13px",height:"13px",background:"#22c55e",borderRadius:"50%",border:"2px solid #fff"}}/>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontWeight:700,fontSize:"13px",color:"#1a1a2e"}}>Dr. Rajesh Kumar</div>
          <div style={{color:"#777",fontSize:"11px",marginTop:"2px"}}>Head of Department - BCA</div>
          <span style={{display:"inline-block",marginTop:"5px",background:"#f1f3f6",color:"#555",borderRadius:"20px",padding:"2px 14px",fontSize:"11px"}}>Active</span>
        </div>
      </div>
      <div style={{borderTop:"1px solid #eef0f4"}}/>
      <div>
        <div style={{fontWeight:600,fontSize:"11.5px",color:"#333",marginBottom:"7px"}}>Personal Information</div>
        {[[I.dob,"DOB:","15th March, 1975"],[I.mail,"Email:","rajesh.kumar@college.edu"],[I.phone,"Phone:","+91 98765 43210"],[I.pin,"Office:","BCA Block, Room 301"]].map(([Ic,l,v])=>(
          <div key={l} style={{display:"flex",alignItems:"flex-start",gap:"6px",marginBottom:"6px",fontSize:"11px",color:"#555"}}>
            <span style={{marginTop:"1px",flexShrink:0}}><Ic/></span><span><b style={{color:"#333"}}>{l}</b> {v}</span>
          </div>
        ))}
      </div>
      <div style={{borderTop:"1px solid #eef0f4"}}/>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:"5px",fontWeight:600,fontSize:"11.5px",color:"#333",marginBottom:"7px"}}>{I.grad()} Education</div>
        {["Ph.D. in Computer Science - IIT Delhi (2005)","M.Tech in Software Engineering - IIT Bombay (2001)","B.Tech in Computer Science - Delhi University (1998)"].map(e=>(
          <div key={e} style={{fontSize:"10.5px",color:"#555",marginBottom:"4px"}}>• {e}</div>
        ))}
      </div>
      <div style={{borderTop:"1px solid #eef0f4"}}/>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:"5px",fontWeight:600,fontSize:"11.5px",color:"#333",marginBottom:"6px"}}>{I.brief()} Experience &amp; Specialization</div>
        <div style={{fontSize:"11px",color:"#555",lineHeight:"1.7"}}><div>Experience: 20+ Years</div><div>Specialization: Software Engineering, AI &amp; ML</div></div>
      </div>
      <div style={{borderTop:"1px solid #eef0f4"}}/>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:"5px",fontWeight:600,fontSize:"11.5px",color:"#333",marginBottom:"6px"}}>{I.clock()} Working Hours</div>
        {WORKING_DAYS.map(d=>(
          <div key={d} style={{display:"flex",justifyContent:"space-between",fontSize:"11px",marginBottom:"3px"}}>
            <span style={{color:"#555"}}>{d}</span>
            <span style={{color:"#16a34a",fontWeight:600}}>7:30 AM - 2:30 PM</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function NavTabs({ active, onChange }) {
  return (
    <div style={{background:"#fff",borderBottom:"1px solid #e2e5ea"}}>
      <div style={{display:"flex"}}>
        {NAV.map(({key,Icon})=>(
          <button key={key} onClick={()=>onChange(key)} style={{display:"flex",alignItems:"center",gap:"6px",padding:"13px 22px",background:active===key?"#f5f6fa":"transparent",border:"none",borderBottom:active===key?"2.5px solid #374151":"2.5px solid transparent",cursor:"pointer",fontSize:"12.5px",fontWeight:active===key?600:400,color:active===key?"#111":"#777",transition:"all 0.15s"}}>
            <Icon/> {key}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Timetable cell ─────────────────────────────────────────────────
function TCell({ entry }) {
  if (!entry) return <td style={{padding:"10px 12px",borderRight:"1px solid #f0f2f6",textAlign:"center",color:"#bbb",fontSize:"12px"}}>-</td>;
  const col = FCOL[entry.prof] || { bg:"#f3f4f6", border:"#e5e7eb" };
  return (
    <td style={{padding:"8px 10px",borderRight:"1px solid #f0f2f6"}}>
      <div style={{background:col.bg,border:`1px solid ${col.border}`,borderRadius:"5px",padding:"6px 8px",fontSize:"11.5px",lineHeight:"1.55"}}>
        <div style={{fontWeight:600,color:"#1a1a2e"}}>{entry.prof}</div>
        <div style={{color:"#555"}}>{entry.subj}</div>
        <div style={{color:"#888",fontSize:"10.5px"}}>{entry.batch}</div>
      </div>
    </td>
  );
}

// ── Modal ──────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.35)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
      <div style={{background:"#fff",borderRadius:"10px",padding:"28px",minWidth:"340px",maxWidth:"460px",width:"90%",boxShadow:"0 8px 32px rgba(0,0,0,.18)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px"}}>
          <div style={{fontWeight:700,fontSize:"14px",color:"#1a1a2e"}}>{title}</div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:"20px",color:"#888",lineHeight:1}}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────────────
function Toast({ msg }) {
  return <div style={{position:"fixed",bottom:"28px",right:"28px",background:"#1a1a2e",color:"#fff",padding:"10px 20px",borderRadius:"7px",fontSize:"12.5px",fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,.18)",zIndex:2000}}>{msg}</div>;
}

// ══════════════════════════════════════════════════════════════════
// Timetable Page
// ══════════════════════════════════════════════════════════════════
function TimetablePage() {
  const [timetable, setTimetable] = useState(TIMETABLE);
  const [modal, setModal]         = useState(null); // "add" | "modify" | "view" | null
  const [toast, setToast]         = useState(null);
  const [form, setForm]           = useState({ slot:"8:30-9:30", day:"Monday", prof:"Prof. Priya", subj:"", batch:"BCA-1" });

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),2500); };

  const handleSaveSlot = () => {
    if (!form.subj.trim()) { showToast("Please enter a subject"); return; }
    setTimetable(prev => ({
      ...prev,
      [form.slot]: { ...prev[form.slot], [form.day]: { prof:form.prof, subj:form.subj, batch:form.batch } }
    }));
    setModal(null);
    showToast("Timetable slot saved ✓");
  };

  const handleClearSlot = () => {
    setTimetable(prev => ({
      ...prev,
      [form.slot]: { ...prev[form.slot], [form.day]: null }
    }));
    setModal(null);
    showToast("Slot cleared ✓");
  };

  const inp = { width:"100%", padding:"7px 10px", border:"1px solid #dde3ec", borderRadius:"5px", fontSize:"12.5px", outline:"none", boxSizing:"border-box" };
  const lbl = { fontSize:"11.5px", fontWeight:600, color:"#555", marginBottom:"4px" };

  return (
    <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:"20px"}}>

      {/* ── Main timetable card ── */}
      <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",overflow:"hidden"}}>
        {/* Card header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",borderBottom:"1px solid #eef0f4"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            {I.calendar()}
            <span style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e"}}>Department Timetable Management</span>
          </div>
          <button onClick={()=>setModal("add")} style={{display:"flex",alignItems:"center",gap:"6px",background:"#1a1a2e",color:"#fff",border:"none",borderRadius:"7px",padding:"8px 16px",fontSize:"12.5px",fontWeight:600,cursor:"pointer"}}>
            {I.edit2()} Edit Timetable
          </button>
        </div>

        {/* Sub-header */}
        <div style={{padding:"10px 20px",borderBottom:"1px solid #f0f2f6",fontSize:"11.5px",color:"#666"}}>
          Working Hours: 7:30 AM - 2:30 PM | Maximum 4 hours per faculty per day
        </div>

        {/* Table */}
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:"#fafbfc",borderBottom:"1px solid #eef0f4"}}>
                <th style={{padding:"11px 16px",textAlign:"left",fontSize:"12px",fontWeight:700,color:"#333",width:"110px",borderRight:"1px solid #f0f2f6"}}>Time</th>
                {DAYS.map(d=>(
                  <th key={d} style={{padding:"11px 12px",textAlign:"left",fontSize:"12px",fontWeight:700,color:"#333",borderRight:"1px solid #f0f2f6",minWidth:"130px"}}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map((slot,si)=>(
                <tr key={slot} style={{borderBottom:"1px solid #f0f2f6",verticalAlign:"top"}}>
                  <td style={{padding:"12px 16px",fontSize:"12px",fontWeight:600,color:"#374151",borderRight:"1px solid #f0f2f6",whiteSpace:"nowrap",verticalAlign:"middle"}}>{slot}</td>
                  {DAYS.map(day=>(
                    <TCell key={day} entry={timetable[slot]?.[day]}/>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bottom row: Faculty Load + Quick Actions ── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>

        {/* Faculty Load Summary */}
        <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",padding:"20px 24px"}}>
          <div style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e",marginBottom:"16px"}}>Faculty Load Summary</div>
          {FACULTY_LOAD.map(({ name, used, max })=>(
            <div key={name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #f1f3f6"}}>
              <span style={{fontSize:"12.5px",color:"#333"}}>{name}</span>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                {/* Mini progress bar */}
                <div style={{width:"80px",height:"5px",background:"#e5e7eb",borderRadius:"3px",overflow:"hidden"}}>
                  <div style={{width:`${(used/max)*100}%`,height:"100%",background: used>=max?"#ef4444":used>=3?"#f59e0b":"#22c55e",borderRadius:"3px"}}/>
                </div>
                <span style={{fontSize:"12px",fontWeight:600,color: used>=max?"#ef4444":used>=3?"#d97706":"#15803d",background: used>=max?"#fef2f2":used>=3?"#fffbeb":"#f0fdf4",border:`1px solid ${used>=max?"#fecaca":used>=3?"#fde68a":"#bbf7d0"}`,borderRadius:"5px",padding:"2px 9px",minWidth:"38px",textAlign:"center"}}>
                  {used}/{max}h
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",padding:"20px 24px"}}>
          <div style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e",marginBottom:"16px"}}>Quick Actions</div>
          <div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
            {[
              { icon:I.plus,   label:"Add New Slot",       action:()=>setModal("add")    },
              { icon:I.modify, label:"Modify Existing",    action:()=>setModal("modify") },
              { icon:I.view,   label:"View Full Schedule", action:()=>setModal("view")   },
            ].map(({ icon:Ic, label, action })=>(
              <button key={label} onClick={action} style={{display:"flex",alignItems:"center",gap:"10px",padding:"13px 14px",background:"none",border:"none",borderBottom:"1px solid #f1f3f6",cursor:"pointer",fontSize:"12.5px",color:"#333",textAlign:"left",width:"100%",borderRadius:"4px",transition:"background 0.12s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#f5f6fa"}
                onMouseLeave={e=>e.currentTarget.style.background="none"}>
                <span style={{color:"#555"}}><Ic/></span> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Add / Modify Modal ── */}
      {(modal==="add"||modal==="modify") && (
        <Modal title={modal==="add"?"Add New Timetable Slot":"Modify Existing Slot"} onClose={()=>setModal(null)}>
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
              <div>
                <div style={lbl}>Time Slot</div>
                <select value={form.slot} onChange={e=>setForm(p=>({...p,slot:e.target.value}))} style={inp}>
                  {SLOTS.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <div style={lbl}>Day</div>
                <select value={form.day} onChange={e=>setForm(p=>({...p,day:e.target.value}))} style={inp}>
                  {DAYS.map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div>
              <div style={lbl}>Faculty</div>
              <select value={form.prof} onChange={e=>setForm(p=>({...p,prof:e.target.value}))} style={inp}>
                {["Prof. Priya","Dr. Amit","Prof. Neha","Prof. Rohit"].map(f=><option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <div style={lbl}>Subject</div>
              <input value={form.subj} onChange={e=>setForm(p=>({...p,subj:e.target.value}))} placeholder="e.g. Data Structures" style={inp}/>
            </div>
            <div>
              <div style={lbl}>Batch</div>
              <select value={form.batch} onChange={e=>setForm(p=>({...p,batch:e.target.value}))} style={inp}>
                {["BCA-1","BCA-2","BCA-3"].map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <div style={{display:"flex",gap:"10px",marginTop:"4px"}}>
              <button onClick={handleSaveSlot} style={{flex:1,padding:"8px",background:"#1a1a2e",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontWeight:600,fontSize:"12.5px"}}>Save Slot</button>
              {modal==="modify"&&<button onClick={handleClearSlot} style={{flex:1,padding:"8px",background:"#fef2f2",color:"#ef4444",border:"1px solid #fecaca",borderRadius:"6px",cursor:"pointer",fontSize:"12.5px"}}>Clear Slot</button>}
              <button onClick={()=>setModal(null)} style={{flex:1,padding:"8px",background:"#f1f3f6",color:"#555",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"12.5px"}}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── View Full Schedule Modal ── */}
      {modal==="view" && (
        <Modal title="Full Weekly Schedule" onClose={()=>setModal(null)}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:"11px"}}>
              <thead>
                <tr style={{background:"#f5f6fa"}}>
                  <th style={{padding:"6px 8px",textAlign:"left",fontWeight:600,color:"#555",borderBottom:"1px solid #eef0f4"}}>Slot</th>
                  {DAYS.map(d=><th key={d} style={{padding:"6px 8px",textAlign:"left",fontWeight:600,color:"#555",borderBottom:"1px solid #eef0f4"}}>{d.slice(0,3)}</th>)}
                </tr>
              </thead>
              <tbody>
                {SLOTS.map(slot=>(
                  <tr key={slot} style={{borderBottom:"1px solid #f0f2f6"}}>
                    <td style={{padding:"6px 8px",fontWeight:600,color:"#374151",whiteSpace:"nowrap"}}>{slot}</td>
                    {DAYS.map(day=>{
                      const e = timetable[slot]?.[day];
                      return <td key={day} style={{padding:"5px 8px",color: e?"#1a1a2e":"#ccc",fontSize:"10.5px"}}>{e?`${e.prof} / ${e.batch}`:"-"}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}

      {toast && <Toast msg={toast}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("Timetable");
  return (
    <div style={{fontFamily:"'Segoe UI',Arial,sans-serif",fontSize:"13px",background:"#f5f6fa",minHeight:"100vh",color:"#222"}}>
      <TopBar/>
      <div style={{display:"flex",minHeight:"calc(100vh - 53px)"}}>
        <Sidebar onBack={()=>setPage("Home")}/>
        <main style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <NavTabs active={page} onChange={setPage}/>
          <div style={{flex:1,overflowY:"auto"}}>
            <TimetablePage/>
          </div>
        </main>
      </div>
    </div>
  );
}