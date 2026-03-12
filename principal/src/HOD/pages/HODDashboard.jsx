import { useState } from "react";

const I = {
  back:      ()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>,
  home:      ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  users:     ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  calendar:  ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  bell:      ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  message:   ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  messageMd: ()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
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
  send:      ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  chevDown:  ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  bellMd:    ()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  chevron:   ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  trash:     ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  check:     ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>,
  checkC:    ()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>,
  crossC:    ()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  plus:      ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  quote:     ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>,
  edit:      ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  eye:       ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
};

const WORKING_DAYS=["Monday","Tuesday","Wednesday","Thursday"];
const DAYS=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const SLOTS=["7:30-8:30","8:30-9:30","9:30-10:30","10:30-11:30","11:00-12:00"];
const FCOL={"Prof. Rohit":{bg:"#e0f2fe",border:"#bae6fd"},"Prof. Priya":{bg:"#fef9c3",border:"#fde68a"},"Dr. Amit":{bg:"#fef9c3",border:"#fde68a"},"Prof. Neha":{bg:"#dcfce7",border:"#bbf7d0"}};
const AB=["#dbeafe","#fce7f3","#dcfce7","#fef3c7"],AT=["#1d4ed8","#be185d","#15803d","#92400e"],AIN=["PS","AV","NG","RS"];

const INIT_TT={"7:30-8:30":{Monday:null,Tuesday:null,Wednesday:null,Thursday:null,Friday:null,Saturday:null},"8:30-9:30":{Monday:{prof:"Prof. Rohit",subj:"Web Dev",batch:"BCA-1"},Tuesday:{prof:"Prof. Neha",subj:"DBMS",batch:"BCA-2"},Wednesday:null,Thursday:null,Friday:null,Saturday:null},"9:30-10:30":{Monday:{prof:"Prof. Priya",subj:"Programming",batch:"BCA-1"},Tuesday:null,Wednesday:{prof:"Prof. Neha",subj:"DBMS",batch:"BCA-3"},Thursday:null,Friday:null,Saturday:null},"10:30-11:30":{Monday:{prof:"Dr. Amit",subj:"Data Structures",batch:"BCA-1"},Tuesday:null,Wednesday:null,Thursday:null,Friday:null,Saturday:null},"11:00-12:00":{Monday:{prof:"Prof. Rohit",subj:"Web Dev",batch:"BCA-3"},Tuesday:{prof:"Prof. Priya",subj:"Programming",batch:"BCA-2"},Wednesday:null,Thursday:null,Friday:null,Saturday:null}};
const INIT_FAC=[{id:1,name:"Prof. Priya Sharma",qual:"M.Tech CSE",exp:"8 Years",subject:"Programming in C",classes:["BCA-1 (9:30-10:30)","BCA-2 (11:00-12:00)","BCA-3 (1:00-2:00)"],hours:"3h",attendance:"95%",leave:"1 pending"},{id:2,name:"Dr. Amit Verma",qual:"Ph.D. Computer Science",exp:"12 Years",subject:"Data Structures",classes:["BCA-1 (10:30-11:30)","BCA-2 (12:00-1:00)","BCA-3 (2:00-2:30)"],hours:"2.5h",attendance:"98%",leave:"None"},{id:3,name:"Prof. Neha Gupta",qual:"M.Tech IT",exp:"6 Years",subject:"Database Management",classes:["BCA-2 (8:00-9:00)","BCA-3 (9:30-10:30)","BCA-1 (12:30-1:30)","BCA-2 (2:00-2:30)"],hours:"4h",attendance:"92%",leave:"2 pending"},{id:4,name:"Prof. Rohit Singh",qual:"M.Sc Computer Science",exp:"5 Years",subject:"Web Development",classes:["BCA-1 (8:30-9:30)","BCA-2 (11:00-12:00)","BCA-2 (1:30-2:30)"],hours:"3h",attendance:"90%",leave:"None"}];
const FL=[{name:"Prof. Priya Sharma",used:3,max:4},{name:"Dr. Amit Verma",used:2.5,max:4},{name:"Prof. Neha Gupta",used:4,max:4},{name:"Prof. Rohit Singh",used:3,max:4}];
const SCH=[{time:"9:00 AM",title:"Data Structures Lecture",sub:"BCA-101",badge:"45 students"},{time:"11:00 AM",title:"Faculty Meeting",sub:"Conference Hall"},{time:"2:00 PM",title:"Student Counseling",sub:"Office"},{time:"4:00 PM",title:"Research Review",sub:"Lab-2"}];
const STATS=[{label:"Total Students:",value:"180",red:false},{label:"Faculty Members:",value:"4",red:false},{label:"Active Courses:",value:"8",red:false},{label:"Pending Leave Requests:",value:"3",red:true}];
const INIT_NOTIFS=[{id:1,title:"Faculty Meeting",time:"10:00 AM",dot:"#2563eb",read:false,detail:"All faculty members are required to attend the department meeting in Conference Hall B-204."},{id:2,title:"Student Admission Review",time:"2:00 PM",dot:"#ef4444",read:false,detail:"Review of student admission applications for the upcoming semester."},{id:3,title:"Course Curriculum Update",time:"4:00 PM",dot:"#2563eb",read:false,detail:"BCA curriculum committee will discuss proposed changes to courses."},{id:4,title:"Parent-Teacher Meeting",time:"Tomorrow",dot:"#2563eb",read:false,detail:"Annual parent-teacher meeting scheduled for all BCA batches."}];

// Messages data
const INIT_MSGS=[
  {id:1,from:"Prof. Priya Sharma",initials:"PPS",color:"#dbeafe",tc:"#1d4ed8",preview:"Need approval for new lab equipment",time:"2 min ago",online:true,thread:[]},
  {id:2,from:"Dr. Amit Verma",    initials:"DAV",color:"#fce7f3",tc:"#be185d",preview:"Student evaluation reports ready",   time:"15 min ago",online:true,thread:[]},
  {id:3,from:"Admin Office",       initials:"AO", color:"#e0f2fe",tc:"#0369a1",preview:"Budget meeting scheduled for tomorrow",time:"1 hour ago",online:false,thread:[]},
];
const RECIPIENTS=["Prof. Priya Sharma","Dr. Amit Verma","Prof. Neha Gupta","Prof. Rohit Singh","Admin Office"];

// ── SHARED ─────────────────────────────────────────────────────────
function TopBar({unreadCount,onBellClick}) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fff",borderBottom:"1px solid #e2e5ea",padding:"10px 28px"}}>
      <div><div style={{fontWeight:700,fontSize:"15px",color:"#1a1a2e"}}>HOD Dashboard</div><div style={{color:"#888",fontSize:"11px"}}>BCA Department Management</div></div>
      <div style={{display:"flex",alignItems:"center",gap:"18px"}}>
        <div style={{border:"2px solid #f87171",borderRadius:"5px",padding:"3px 5px",display:"flex",alignItems:"center",cursor:"pointer"}}>{I.chatbox()}</div>
        <button style={{display:"flex",alignItems:"center",gap:"4px",background:"none",border:"none",cursor:"pointer",color:"#444",fontSize:"12px"}}>{I.settings()} Settings</button>
        <div onClick={onBellClick} style={{position:"relative",cursor:"pointer"}}>{I.bellTop()}{unreadCount>0&&<span style={{position:"absolute",top:"-6px",right:"-7px",background:"#ef4444",color:"#fff",borderRadius:"50%",fontSize:"9px",width:"15px",height:"15px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{unreadCount}</span>}</div>
        <button style={{display:"flex",alignItems:"center",gap:"4px",background:"none",border:"none",cursor:"pointer",color:"#2563eb",fontSize:"12px",fontWeight:500}}>{I.bot()} AI Assistant</button>
        <button style={{display:"flex",alignItems:"center",gap:"4px",background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:"12px",fontWeight:500}}>{I.logout()} Logout</button>
      </div>
    </div>
  );
}

function Sidebar({onBack}) {
  return (
    <aside style={{width:"210px",minWidth:"210px",background:"#fff",borderRight:"1px solid #e2e5ea",padding:"16px",display:"flex",flexDirection:"column",gap:"13px",flexShrink:0,overflowY:"auto"}}>
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
          <div key={l} style={{display:"flex",alignItems:"flex-start",gap:"6px",marginBottom:"6px",fontSize:"11px",color:"#555"}}><span style={{marginTop:"1px",flexShrink:0}}><Ic/></span><span><b style={{color:"#333"}}>{l}</b> {v}</span></div>
        ))}
      </div>
      <div style={{borderTop:"1px solid #eef0f4"}}/>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:"5px",fontWeight:600,fontSize:"11.5px",color:"#333",marginBottom:"7px"}}>{I.grad()} Education</div>
        {["Ph.D. in Computer Science - IIT Delhi (2005)","M.Tech in Software Engineering - IIT Bombay (2001)","B.Tech in Computer Science - Delhi University (1998)"].map(e=><div key={e} style={{fontSize:"10.5px",color:"#555",marginBottom:"4px"}}>• {e}</div>)}
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
            <span style={{color:"#555"}}>{d}</span><span style={{color:"#16a34a",fontWeight:600}}>7:30 AM - 2:30 PM</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function NavTabs({active,onChange,unreadCount}) {
  const NAV=[{key:"Home",Icon:I.home},{key:"Faculty",Icon:I.users},{key:"Timetable",Icon:I.calendar},{key:"Notifications",Icon:I.bell},{key:"Messages",Icon:I.message},{key:"Classes",Icon:I.book},{key:"Reports",Icon:I.chart}];
  return (
    <div style={{background:"#fff",borderBottom:"1px solid #e2e5ea"}}>
      <div style={{display:"flex"}}>
        {NAV.map(({key,Icon})=>(
          <button key={key} onClick={()=>onChange(key)} style={{display:"flex",alignItems:"center",gap:"6px",padding:"13px 22px",background:active===key?"#f5f6fa":"transparent",border:"none",borderBottom:active===key?"2.5px solid #374151":"2.5px solid transparent",cursor:"pointer",fontSize:"12.5px",fontWeight:active===key?600:400,color:active===key?"#111":"#777",transition:"all 0.15s"}}>
            <Icon/>{key}
            {key==="Notifications"&&unreadCount>0&&<span style={{background:"#ef4444",color:"#fff",borderRadius:"20px",fontSize:"9px",fontWeight:700,padding:"1px 5px",marginLeft:"2px"}}>{unreadCount}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function Modal({title,onClose,children}) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.35)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
      <div style={{background:"#fff",borderRadius:"10px",padding:"28px",minWidth:"340px",maxWidth:"480px",width:"90%",boxShadow:"0 8px 32px rgba(0,0,0,.18)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px"}}>
          <div style={{fontWeight:700,fontSize:"14px",color:"#1a1a2e"}}>{title}</div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:"20px",color:"#888",lineHeight:1}}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Toast({msg,color="#16a34a"}) {
  return <div style={{position:"fixed",bottom:"28px",right:"28px",background:color,color:"#fff",padding:"10px 20px",borderRadius:"7px",fontSize:"12.5px",fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,.18)",zIndex:2000}}>{msg}</div>;
}

// ══════════════════════════════════════════════════════════════════
// HOME
// ══════════════════════════════════════════════════════════════════
function HomePage() {
  return (
    <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:"20px"}}>
      <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",padding:"22px 28px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontWeight:700,fontSize:"15px",color:"#1a1a2e",marginBottom:"4px"}}>Welcome back, Dr. Kumar!</div>
          <div style={{color:"#666",fontSize:"12px",marginBottom:"16px"}}>Leading the BCA department with excellence and innovation.</div>
          <div style={{display:"flex",alignItems:"flex-start",gap:"8px",background:"#f0faf8",borderLeft:"4px solid #34d399",borderRadius:"4px",padding:"10px 14px",maxWidth:"420px"}}>
            <span style={{color:"#10b981",marginTop:"1px",flexShrink:0}}>{I.quote()}</span>
            <div><div style={{fontWeight:600,fontSize:"11.5px",color:"#065f46",marginBottom:"3px"}}>Quote of the Day</div><div style={{fontSize:"11.5px",color:"#047857",fontStyle:"italic"}}>Innovation in education starts with a department that embraces change.</div></div>
          </div>
        </div>
        <div style={{textAlign:"right",paddingTop:"4px"}}>
          <div style={{fontSize:"52px",fontWeight:800,color:"#16a34a",lineHeight:1}}>26</div>
          <div style={{color:"#888",fontSize:"12px",marginTop:"3px"}}>Friday</div>
          <div style={{color:"#888",fontSize:"12px"}}>September 2025</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.35fr",gap:"20px"}}>
        <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e",marginBottom:"16px"}}>Department Stats</div>
          {STATS.map(({label,value,red},i)=>(
            <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderTop:i===0?"none":"1px solid #f1f3f6"}}>
              <span style={{color:"#555",fontSize:"12.5px"}}>{label}</span><span style={{fontWeight:600,fontSize:"13px",color:red?"#ef4444":"#1a1a2e"}}>{value}</span>
            </div>
          ))}
        </div>
        <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e",marginBottom:"16px"}}>Today's Schedule</div>
          {SCH.map(({time,title,sub,badge},i)=>(
            <div key={time} style={{display:"flex",alignItems:"center",gap:"18px",padding:"13px 0",borderBottom:i<SCH.length-1?"1px solid #f1f3f6":"none"}}>
              <span style={{color:"#2563eb",fontWeight:600,fontSize:"12px",width:"62px",flexShrink:0}}>{time}</span>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:"12.5px",color:"#1a1a2e"}}>{title}</div><div style={{color:"#888",fontSize:"11px",marginTop:"2px"}}>{sub}</div></div>
              {badge&&<span style={{fontSize:"11px",color:"#666",border:"1px solid #dde3ec",borderRadius:"4px",padding:"3px 9px",flexShrink:0,background:"#fafbfc"}}>{badge}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// FACULTY
// ══════════════════════════════════════════════════════════════════
function FacultyPage() {
  const [fac,setFac]=useState(INIT_FAC);
  const [vi,setVi]=useState(null);
  const [ei,setEi]=useState(null);
  const [ed,setEd]=useState({});
  const [toast,setToast]=useState(null);
  const st=(msg,color)=>{setToast({msg,color});setTimeout(()=>setToast(null),2500);};
  const TAG={background:"#e8f0fe",color:"#1a56db",borderRadius:"4px",padding:"2px 8px",fontSize:"11px",display:"inline-block",marginBottom:"3px"};
  const WL={background:"#f0fdf4",color:"#15803d",border:"1px solid #bbf7d0",borderRadius:"4px",padding:"2px 8px",fontSize:"11px"};
  const IB={background:"none",border:"none",cursor:"pointer",padding:"2px 4px",display:"inline-flex",alignItems:"center",color:"#555"};
  const inp={width:"100%",padding:"7px 10px",border:"1px solid #dde3ec",borderRadius:"5px",fontSize:"12.5px",outline:"none",boxSizing:"border-box"};
  return (
    <div style={{padding:"24px"}}>
      <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",overflow:"hidden"}}>
        <div style={{padding:"16px 20px",borderBottom:"1px solid #eef0f4",display:"flex",alignItems:"center",gap:"8px"}}>{I.users()}<span style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e"}}>Faculty Management</span></div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafbfc",borderBottom:"1px solid #eef0f4"}}>{["Faculty","Subject","Today's Classes","Daily Hours","Attendance","Leave Requests","Actions"].map((h,i)=><th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:"12px",fontWeight:600,color:"#555",paddingLeft:i===0?"20px":"12px",paddingRight:i===6?"20px":"12px"}}>{h}</th>)}</tr></thead>
            <tbody>
              {fac.map((f,idx)=>(
                <tr key={f.id} style={{borderBottom:idx<fac.length-1?"1px solid #f0f2f6":"none",verticalAlign:"middle"}}>
                  <td style={{padding:"16px 12px 16px 20px",minWidth:"170px"}}><div style={{display:"flex",alignItems:"center",gap:"10px"}}><div style={{width:"38px",height:"38px",borderRadius:"50%",background:AB[idx%4],display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid #e2e5ea"}}><span style={{fontWeight:700,fontSize:"12px",color:AT[idx%4]}}>{AIN[idx]}</span></div><div><div style={{fontWeight:600,fontSize:"12.5px",color:"#1a1a2e"}}>{f.name}</div><div style={{color:"#888",fontSize:"10.5px"}}>{f.qual}</div><div style={{color:"#aaa",fontSize:"10px"}}>{f.exp}</div></div></div></td>
                  <td style={{padding:"16px 12px",fontSize:"12.5px",color:"#333",minWidth:"150px"}}>{f.subject}</td>
                  <td style={{padding:"16px 12px",minWidth:"165px"}}><div style={{display:"flex",flexDirection:"column",gap:"3px"}}>{f.classes.map(c=><span key={c} style={TAG}>{c}</span>)}</div></td>
                  <td style={{padding:"16px 12px",minWidth:"130px"}}><div style={{display:"flex",alignItems:"center",gap:"8px"}}><span style={{fontWeight:600,fontSize:"12.5px"}}>{f.hours}</span><span style={WL}>Within Limit</span></div></td>
                  <td style={{padding:"16px 12px",fontWeight:600,fontSize:"12.5px",minWidth:"90px"}}>{f.attendance}</td>
                  <td style={{padding:"16px 12px",minWidth:"130px"}}>{f.leave==="None"?<span style={{color:"#aaa",fontSize:"12px"}}>None</span>:<div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{color:"#555",fontSize:"12px"}}>{f.leave}</span><button onClick={()=>{setFac(p=>p.map(x=>x.id===f.id?{...x,leave:"None"}:x));st("Approved ✓","#16a34a");}} style={IB}>{I.checkC()}</button><button onClick={()=>{setFac(p=>p.map(x=>x.id===f.id?{...x,leave:"None"}:x));st("Rejected","#ef4444");}} style={IB}>{I.crossC()}</button></div>}</td>
                  <td style={{padding:"16px 20px 16px 12px",minWidth:"80px"}}><div style={{display:"flex",gap:"10px"}}><button onClick={()=>setVi(f)} style={IB}>{I.eye()}</button><button onClick={()=>{setEi(f);setEd({name:f.name,qual:f.qual,subject:f.subject,attendance:f.attendance});}} style={IB}>{I.edit()}</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {vi&&<Modal title="Faculty Details" onClose={()=>setVi(null)}><div style={{display:"flex",flexDirection:"column",gap:"10px",fontSize:"12.5px",color:"#444"}}>{[["Name",vi.name],["Qualification",vi.qual],["Experience",vi.exp],["Subject",vi.subject],["Attendance",vi.attendance],["Leave",vi.leave]].map(([k,v])=><div key={k} style={{display:"flex",gap:"10px"}}><span style={{fontWeight:600,color:"#333",width:"110px",flexShrink:0}}>{k}:</span><span>{v}</span></div>)}<div style={{fontWeight:600,color:"#333",marginTop:"4px"}}>Today's Classes:</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{vi.classes.map(c=><span key={c} style={{background:"#e8f0fe",color:"#1a56db",borderRadius:"4px",padding:"2px 8px",fontSize:"11px"}}>{c}</span>)}</div></div></Modal>}
      {ei&&<Modal title="Edit Faculty" onClose={()=>setEi(null)}><div style={{display:"flex",flexDirection:"column",gap:"12px"}}>{[["Name","name"],["Qualification","qual"],["Subject","subject"],["Attendance","attendance"]].map(([label,field])=><div key={field}><div style={{fontSize:"11.5px",fontWeight:600,color:"#555",marginBottom:"4px"}}>{label}</div><input value={ed[field]||""} onChange={e=>setEd(p=>({...p,[field]:e.target.value}))} style={inp}/></div>)}<div style={{display:"flex",gap:"10px",marginTop:"4px"}}><button onClick={()=>{setFac(p=>p.map(f=>f.id===ei.id?{...f,...ed}:f));setEi(null);st("Updated ✓","#16a34a");}} style={{flex:1,padding:"8px",background:"#1a1a2e",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontWeight:600,fontSize:"12.5px"}}>Save</button><button onClick={()=>setEi(null)} style={{flex:1,padding:"8px",background:"#f1f3f6",color:"#555",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"12.5px"}}>Cancel</button></div></div></Modal>}
      {toast&&<Toast {...toast}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// TIMETABLE
// ══════════════════════════════════════════════════════════════════
function TimetablePage() {
  const [tt,setTt]=useState(INIT_TT);
  const [modal,setModal]=useState(null);
  const [toast,setToast]=useState(null);
  const [form,setForm]=useState({slot:"8:30-9:30",day:"Monday",prof:"Prof. Priya",subj:"",batch:"BCA-1"});
  const st=(msg,color)=>{setToast({msg,color});setTimeout(()=>setToast(null),2500);};
  const inp={width:"100%",padding:"7px 10px",border:"1px solid #dde3ec",borderRadius:"5px",fontSize:"12.5px",outline:"none",boxSizing:"border-box"};
  const lbl={fontSize:"11.5px",fontWeight:600,color:"#555",marginBottom:"4px"};
  return (
    <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:"20px"}}>
      <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",overflow:"hidden"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",borderBottom:"1px solid #eef0f4"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>{I.calendar()}<span style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e"}}>Department Timetable Management</span></div>
          <button onClick={()=>setModal("add")} style={{display:"flex",alignItems:"center",gap:"6px",background:"#1a1a2e",color:"#fff",border:"none",borderRadius:"7px",padding:"8px 16px",fontSize:"12.5px",fontWeight:600,cursor:"pointer"}}>{I.edit()} Edit Timetable</button>
        </div>
        <div style={{padding:"10px 20px",borderBottom:"1px solid #f0f2f6",fontSize:"11.5px",color:"#666"}}>Working Hours: 7:30 AM - 2:30 PM | Maximum 4 hours per faculty per day</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#fafbfc",borderBottom:"1px solid #eef0f4"}}><th style={{padding:"11px 16px",textAlign:"left",fontSize:"12px",fontWeight:700,color:"#333",width:"110px",borderRight:"1px solid #f0f2f6"}}>Time</th>{DAYS.map(d=><th key={d} style={{padding:"11px 12px",textAlign:"left",fontSize:"12px",fontWeight:700,color:"#333",borderRight:"1px solid #f0f2f6",minWidth:"130px"}}>{d}</th>)}</tr></thead>
            <tbody>{SLOTS.map(slot=><tr key={slot} style={{borderBottom:"1px solid #f0f2f6",verticalAlign:"top"}}><td style={{padding:"12px 16px",fontSize:"12px",fontWeight:600,color:"#374151",borderRight:"1px solid #f0f2f6",whiteSpace:"nowrap",verticalAlign:"middle"}}>{slot}</td>{DAYS.map(day=>{const e=tt[slot]?.[day];if(!e)return<td key={day} style={{padding:"10px 12px",borderRight:"1px solid #f0f2f6",textAlign:"center",color:"#bbb",fontSize:"12px"}}>-</td>;const col=FCOL[e.prof]||{bg:"#f3f4f6",border:"#e5e7eb"};return<td key={day} style={{padding:"8px 10px",borderRight:"1px solid #f0f2f6"}}><div style={{background:col.bg,border:`1px solid ${col.border}`,borderRadius:"5px",padding:"6px 8px",fontSize:"11.5px",lineHeight:"1.55"}}><div style={{fontWeight:600,color:"#1a1a2e"}}>{e.prof}</div><div style={{color:"#555"}}>{e.subj}</div><div style={{color:"#888",fontSize:"10.5px"}}>{e.batch}</div></div></td>;})}</tr>)}</tbody>
          </table>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
        <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",padding:"20px 24px"}}>
          <div style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e",marginBottom:"16px"}}>Faculty Load Summary</div>
          {FL.map(({name,used,max})=><div key={name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #f1f3f6"}}><span style={{fontSize:"12.5px",color:"#333"}}>{name}</span><div style={{display:"flex",alignItems:"center",gap:"10px"}}><div style={{width:"80px",height:"5px",background:"#e5e7eb",borderRadius:"3px",overflow:"hidden"}}><div style={{width:`${(used/max)*100}%`,height:"100%",background:used>=max?"#ef4444":used>=3?"#f59e0b":"#22c55e",borderRadius:"3px"}}/></div><span style={{fontSize:"12px",fontWeight:600,color:used>=max?"#ef4444":used>=3?"#d97706":"#15803d",background:used>=max?"#fef2f2":used>=3?"#fffbeb":"#f0fdf4",border:`1px solid ${used>=max?"#fecaca":used>=3?"#fde68a":"#bbf7d0"}`,borderRadius:"5px",padding:"2px 9px",minWidth:"38px",textAlign:"center"}}>{used}/{max}h</span></div></div>)}
        </div>
        <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",padding:"20px 24px"}}>
          <div style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e",marginBottom:"16px"}}>Quick Actions</div>
          {[{icon:I.plus,label:"Add New Slot",action:()=>setModal("add")},{icon:I.edit,label:"Modify Existing",action:()=>setModal("modify")},{icon:I.calendar,label:"View Full Schedule",action:()=>setModal("view")}].map(({icon:Ic,label,action})=><button key={label} onClick={action} style={{display:"flex",alignItems:"center",gap:"10px",padding:"13px 14px",background:"none",border:"none",borderBottom:"1px solid #f1f3f6",cursor:"pointer",fontSize:"12.5px",color:"#333",textAlign:"left",width:"100%",borderRadius:"4px"}} onMouseEnter={e=>e.currentTarget.style.background="#f5f6fa"} onMouseLeave={e=>e.currentTarget.style.background="none"}><span style={{color:"#555"}}><Ic/></span>{label}</button>)}
        </div>
      </div>
      {(modal==="add"||modal==="modify")&&<Modal title={modal==="add"?"Add New Slot":"Modify Slot"} onClose={()=>setModal(null)}><div style={{display:"flex",flexDirection:"column",gap:"12px"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}><div><div style={lbl}>Slot</div><select value={form.slot} onChange={e=>setForm(p=>({...p,slot:e.target.value}))} style={inp}>{SLOTS.map(s=><option key={s}>{s}</option>)}</select></div><div><div style={lbl}>Day</div><select value={form.day} onChange={e=>setForm(p=>({...p,day:e.target.value}))} style={inp}>{DAYS.map(d=><option key={d}>{d}</option>)}</select></div></div><div><div style={lbl}>Faculty</div><select value={form.prof} onChange={e=>setForm(p=>({...p,prof:e.target.value}))} style={inp}>{["Prof. Priya","Dr. Amit","Prof. Neha","Prof. Rohit"].map(f=><option key={f}>{f}</option>)}</select></div><div><div style={lbl}>Subject</div><input value={form.subj} onChange={e=>setForm(p=>({...p,subj:e.target.value}))} placeholder="e.g. Data Structures" style={inp}/></div><div><div style={lbl}>Batch</div><select value={form.batch} onChange={e=>setForm(p=>({...p,batch:e.target.value}))} style={inp}>{["BCA-1","BCA-2","BCA-3"].map(b=><option key={b}>{b}</option>)}</select></div><div style={{display:"flex",gap:"10px",marginTop:"4px"}}><button onClick={()=>{if(!form.subj.trim()){st("Enter subject","#ef4444");return;}setTt(p=>({...p,[form.slot]:{...p[form.slot],[form.day]:{prof:form.prof,subj:form.subj,batch:form.batch}}}));setModal(null);st("Saved ✓","#16a34a");}} style={{flex:1,padding:"8px",background:"#1a1a2e",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontWeight:600,fontSize:"12.5px"}}>Save</button>{modal==="modify"&&<button onClick={()=>{setTt(p=>({...p,[form.slot]:{...p[form.slot],[form.day]:null}}));setModal(null);st("Cleared","#f59e0b");}} style={{flex:1,padding:"8px",background:"#fef2f2",color:"#ef4444",border:"1px solid #fecaca",borderRadius:"6px",cursor:"pointer",fontSize:"12.5px"}}>Clear</button>}<button onClick={()=>setModal(null)} style={{flex:1,padding:"8px",background:"#f1f3f6",color:"#555",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"12.5px"}}>Cancel</button></div></div></Modal>}
      {modal==="view"&&<Modal title="Full Weekly Schedule" onClose={()=>setModal(null)}><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:"11px"}}><thead><tr style={{background:"#f5f6fa"}}><th style={{padding:"6px 8px",textAlign:"left",fontWeight:600,color:"#555",borderBottom:"1px solid #eef0f4"}}>Slot</th>{DAYS.map(d=><th key={d} style={{padding:"6px 8px",textAlign:"left",fontWeight:600,color:"#555",borderBottom:"1px solid #eef0f4"}}>{d.slice(0,3)}</th>)}</tr></thead><tbody>{SLOTS.map(slot=><tr key={slot} style={{borderBottom:"1px solid #f0f2f6"}}><td style={{padding:"6px 8px",fontWeight:600,color:"#374151",whiteSpace:"nowrap"}}>{slot}</td>{DAYS.map(day=>{const e=tt[slot]?.[day];return<td key={day} style={{padding:"5px 8px",color:e?"#1a1a2e":"#ccc",fontSize:"10.5px"}}>{e?`${e.prof}/${e.batch}`:"-"}</td>;})}</tr>)}</tbody></table></div></Modal>}
      {toast&&<Toast {...toast}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// NOTIFICATIONS
// ══════════════════════════════════════════════════════════════════
function NotificationsPage({notifications,setNotifications}) {
  const [selected,setSelected]=useState(null);
  const markRead=id=>setNotifications(p=>p.map(n=>n.id===id?{...n,read:true}:n));
  const deleteN=id=>setNotifications(p=>p.filter(n=>n.id!==id));
  return (
    <div style={{padding:"24px"}}>
      <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",overflow:"hidden"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"20px 24px 16px",borderBottom:"1px solid #f0f2f6"}}>{I.bellMd()}<span style={{fontWeight:700,fontSize:"14px",color:"#1a1a2e"}}>Notifications</span></div>
        {notifications.map((n,idx)=>(
          <div key={n.id} onClick={()=>{setSelected(n);markRead(n.id);}} style={{display:"flex",alignItems:"center",gap:"14px",padding:"20px 24px",borderBottom:idx<notifications.length-1?"1px solid #f0f2f6":"none",cursor:"pointer",background:"#fff",transition:"background 0.12s"}} onMouseEnter={e=>e.currentTarget.style.background="#f8f9fb"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
            <div style={{width:"9px",height:"9px",borderRadius:"50%",background:n.read?"#d1d5db":n.dot,flexShrink:0}}/>
            <div style={{flex:1}}><div style={{fontWeight:n.read?500:700,fontSize:"13.5px",color:n.read?"#666":"#1a1a2e",marginBottom:"3px"}}>{n.title}</div><div style={{fontSize:"12px",color:"#999"}}>{n.time}</div></div>
            <span style={{flexShrink:0}}>{I.chevron()}</span>
          </div>
        ))}
      </div>
      {selected&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.30)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}><div style={{background:"#fff",borderRadius:"10px",padding:"28px",minWidth:"360px",maxWidth:"460px",width:"90%",boxShadow:"0 8px 32px rgba(0,0,0,.18)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"14px"}}><div style={{display:"flex",alignItems:"center",gap:"10px"}}><div style={{width:"10px",height:"10px",borderRadius:"50%",background:selected.dot,flexShrink:0,marginTop:"2px"}}/><div><div style={{fontWeight:700,fontSize:"14px",color:"#1a1a2e"}}>{selected.title}</div><div style={{fontSize:"11.5px",color:"#999",marginTop:"2px"}}>{selected.time}</div></div></div><button onClick={()=>setSelected(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"20px",color:"#888",lineHeight:1}}>×</button></div><div style={{fontSize:"12.5px",color:"#444",lineHeight:"1.8",background:"#f8f9fb",borderRadius:"7px",padding:"14px",marginBottom:"18px"}}>{selected.detail}</div><div style={{display:"flex",gap:"10px"}}><button onClick={()=>setSelected(null)} style={{flex:1,padding:"9px",background:"#1a1a2e",color:"#fff",border:"none",borderRadius:"7px",cursor:"pointer",fontSize:"12.5px",fontWeight:600}}>Close</button><button onClick={()=>{deleteN(selected.id);setSelected(null);}} style={{flex:1,padding:"9px",background:"#fef2f2",color:"#ef4444",border:"1px solid #fecaca",borderRadius:"7px",cursor:"pointer",fontSize:"12.5px",fontWeight:600}}>Dismiss</button></div></div></div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MESSAGES PAGE — exact match to screenshot
// ══════════════════════════════════════════════════════════════════
function MessagesPage() {
  const [msgs, setMsgs] = useState(INIT_MSGS);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ to:"", subject:"", body:"" });
  const [toast, setToast] = useState(null);
  const st = (msg,color)=>{setToast({msg,color});setTimeout(()=>setToast(null),2500);};

  const sendMsg = () => {
    if (!form.to) { st("Select a recipient","#ef4444"); return; }
    if (!form.subject.trim()) { st("Enter a subject","#ef4444"); return; }
    if (!form.body.trim()) { st("Type your message","#ef4444"); return; }
    const newMsg = {
      id: Date.now(), from: form.to,
      initials: form.to.split(" ").map(w=>w[0]).join("").slice(0,3).toUpperCase(),
      color:"#f0fdf4", tc:"#15803d",
      preview: form.subject, time:"Just now", online:false, thread:[],
    };
    setMsgs(p=>[newMsg,...p]);
    setForm({to:"",subject:"",body:""});
    st("Message sent ✓","#16a34a");
  };

  const inp = (extra={})=>({width:"100%",padding:"9px 12px",border:"1px solid #e2e5ea",borderRadius:"6px",fontSize:"12.5px",outline:"none",background:"#f8f9fb",color:"#333",boxSizing:"border-box",...extra});

  return (
    <div style={{padding:"24px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 0.72fr",gap:"20px",alignItems:"start"}}>

        {/* ── LEFT: Recent Messages ── */}
        <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",overflow:"hidden"}}>
          {/* Header */}
          <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"18px 22px",borderBottom:"1px solid #f0f2f6"}}>
            {I.messageMd()}
            <span style={{fontWeight:700,fontSize:"14px",color:"#1a1a2e"}}>Recent Messages</span>
          </div>

          {/* Message rows */}
          {msgs.map((m,idx)=>(
            <div key={m.id} onClick={()=>setSelected(m)}
              style={{display:"flex",alignItems:"center",gap:"14px",padding:"18px 22px",borderBottom:idx<msgs.length-1?"1px solid #f0f2f6":"none",cursor:"pointer",transition:"background 0.12s"}}
              onMouseEnter={e=>e.currentTarget.style.background="#f8f9fb"}
              onMouseLeave={e=>e.currentTarget.style.background="#fff"}>

              {/* Avatar circle */}
              <div style={{position:"relative",flexShrink:0}}>
                <div style={{width:"42px",height:"42px",borderRadius:"50%",background:m.color,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #e2e5ea"}}>
                  <span style={{fontWeight:700,fontSize:"12px",color:m.tc}}>{m.initials}</span>
                </div>
                {/* Online dot */}
                {m.online && <div style={{position:"absolute",bottom:"1px",right:"1px",width:"10px",height:"10px",background:"#22c55e",borderRadius:"50%",border:"2px solid #fff"}}/>}
              </div>

              {/* Text */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"3px"}}>
                  <span style={{fontWeight:700,fontSize:"13px",color:"#1a1a2e"}}>{m.from}</span>
                  {m.online && <div style={{width:"7px",height:"7px",borderRadius:"50%",background:"#22c55e",flexShrink:0}}/>}
                </div>
                <div style={{fontSize:"12px",color:"#888",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.preview}</div>
                <div style={{fontSize:"11px",color:"#bbb",marginTop:"3px"}}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── RIGHT: Send Message ── */}
        <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",padding:"22px 22px 24px"}}>
          <div style={{fontWeight:700,fontSize:"14px",color:"#1a1a2e",marginBottom:"16px"}}>Send Message</div>

          {/* Recipient dropdown */}
          <div style={{position:"relative",marginBottom:"12px"}}>
            <select
              value={form.to}
              onChange={e=>setForm(p=>({...p,to:e.target.value}))}
              style={{...inp(),appearance:"none",paddingRight:"32px",color:form.to?"#333":"#aaa"}}
            >
              <option value="" disabled>Select recipient</option>
              {RECIPIENTS.map(r=><option key={r} value={r}>{r}</option>)}
            </select>
            <span style={{position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>{I.chevDown()}</span>
          </div>

          {/* Subject */}
          <input
            value={form.subject}
            onChange={e=>setForm(p=>({...p,subject:e.target.value}))}
            placeholder="Subject"
            style={{...inp(),marginBottom:"12px"}}
          />

          {/* Message body */}
          <textarea
            value={form.body}
            onChange={e=>setForm(p=>({...p,body:e.target.value}))}
            placeholder="Type your message..."
            rows={5}
            style={{...inp(),resize:"none",marginBottom:"14px",lineHeight:"1.6"}}
          />

          {/* Send button */}
          <button
            onClick={sendMsg}
            style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",padding:"11px",background:"#1a1a2e",color:"#fff",border:"none",borderRadius:"7px",cursor:"pointer",fontSize:"13px",fontWeight:600}}
            onMouseEnter={e=>e.currentTarget.style.background="#2d2d44"}
            onMouseLeave={e=>e.currentTarget.style.background="#1a1a2e"}
          >
            {I.send()} Send Message
          </button>
        </div>
      </div>

      {/* Thread modal */}
      {selected && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.30)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
          <div style={{background:"#fff",borderRadius:"10px",padding:"28px",minWidth:"360px",maxWidth:"460px",width:"90%",boxShadow:"0 8px 32px rgba(0,0,0,.18)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <div style={{width:"38px",height:"38px",borderRadius:"50%",background:selected.color,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #e2e5ea"}}><span style={{fontWeight:700,fontSize:"12px",color:selected.tc}}>{selected.initials}</span></div>
                <div><div style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e"}}>{selected.from}</div><div style={{fontSize:"11px",color:"#aaa"}}>{selected.time}</div></div>
              </div>
              <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"20px",color:"#888",lineHeight:1}}>×</button>
            </div>
            <div style={{background:"#f8f9fb",borderRadius:"7px",padding:"14px",fontSize:"12.5px",color:"#444",marginBottom:"16px",lineHeight:"1.7"}}>{selected.preview}</div>
            <button onClick={()=>setSelected(null)} style={{width:"100%",padding:"9px",background:"#1a1a2e",color:"#fff",border:"none",borderRadius:"7px",cursor:"pointer",fontSize:"12.5px",fontWeight:600}}>Close</button>
          </div>
        </div>
      )}

      {toast&&<Toast {...toast}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// COMING SOON
// ══════════════════════════════════════════════════════════════════
function ComingSoon({page}) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"60vh",gap:"12px"}}>
      <div style={{fontSize:"40px"}}>🚧</div>
      <div style={{fontSize:"15px",fontWeight:600,color:"#555"}}>{page} Page</div>
      <div style={{fontSize:"12px",color:"#aaa"}}>Coming soon</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [page,setPage]=useState("Messages");
  const [notifications,setNotifications]=useState(INIT_NOTIFS);
  const unread=notifications.filter(n=>!n.read).length;

  const renderPage=()=>{
    switch(page){
      case "Home":          return <HomePage/>;
      case "Faculty":       return <FacultyPage/>;
      case "Timetable":     return <TimetablePage/>;
      case "Notifications": return <NotificationsPage notifications={notifications} setNotifications={setNotifications}/>;
      case "Messages":      return <MessagesPage/>;
      default:              return <ComingSoon page={page}/>;
    }
  };

  return (
    <div style={{fontFamily:"'Segoe UI',Arial,sans-serif",fontSize:"13px",background:"#f5f6fa",minHeight:"100vh",color:"#222"}}>
      <TopBar unreadCount={unread} onBellClick={()=>setPage("Notifications")}/>
      <div style={{display:"flex",minHeight:"calc(100vh - 53px)"}}>
        <Sidebar onBack={()=>setPage("Home")}/>
        <main style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <NavTabs active={page} onChange={setPage} unreadCount={unread}/>
          <div style={{flex:1,overflowY:"auto"}}>{renderPage()}</div>
        </main>
      </div>
    </div>
  );
}