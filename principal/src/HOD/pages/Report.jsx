// ── REPORTS ───────────────────────────────────────────────────────
function ReportsPage() {
  const [selected, setSelected] = useState(null);

  const REPORT_CARDS = [
    {
      key:"faculty",
      icon:()=><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
      label:"Faculty Reports",
      data:[
        {name:"Prof. Priya Sharma", subject:"Programming in C",   attendance:"95%", hours:"3h/day",  status:"Active"},
        {name:"Dr. Amit Verma",     subject:"Data Structures",    attendance:"98%", hours:"2.5h/day",status:"Active"},
        {name:"Prof. Neha Gupta",   subject:"Database Management",attendance:"92%", hours:"4h/day",  status:"Active"},
        {name:"Prof. Rohit Singh",  subject:"Web Development",    attendance:"90%", hours:"3h/day",  status:"Active"},
      ],
      cols:["Faculty Name","Subject","Attendance","Hours","Status"],
      rows:r=>[r.name,r.subject,r.attendance,r.hours,r.status],
    },
    {
      key:"academic",
      icon:()=><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
      label:"Academic Reports",
      data:[
        {batch:"BCA-1",course:"B.Tech CS",  semester:"5th",cgpa:"8.2",students:"45"},
        {batch:"BCA-2",course:"B.Tech CS",  semester:"3rd",cgpa:"7.9",students:"40"},
        {batch:"BCA-3",course:"B.Tech CS",  semester:"1st",cgpa:"8.5",students:"38"},
      ],
      cols:["Batch","Course","Semester","Avg CGPA","Students"],
      rows:r=>[r.batch,r.course,r.semester,r.cgpa,r.students],
    },
    {
      key:"attendance",
      icon:()=><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      label:"Attendance Reports",
      data:[
        {batch:"BCA-1",present:"41",absent:"4", total:"45",pct:"91%"},
        {batch:"BCA-2",present:"36",absent:"4", total:"40",pct:"90%"},
        {batch:"BCA-3",present:"33",absent:"5", total:"38",pct:"87%"},
      ],
      cols:["Batch","Present","Absent","Total","Percentage"],
      rows:r=>[r.batch,r.present,r.absent,r.total,r.pct],
    },
    {
      key:"performance",
      icon:()=><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      label:"Performance Reports",
      data:[
        {batch:"BCA-1",avgMarks:"82/100",topStudent:"Priya R.",passRate:"96%",grade:"A"},
        {batch:"BCA-2",avgMarks:"78/100",topStudent:"Rahul M.",passRate:"92%",grade:"B+"},
        {batch:"BCA-3",avgMarks:"85/100",topStudent:"Anjali K.",passRate:"97%",grade:"A+"},
      ],
      cols:["Batch","Avg Marks","Top Student","Pass Rate","Grade"],
      rows:r=>[r.batch,r.avgMarks,r.topStudent,r.passRate,r.grade],
    },
    {
      key:"assessment",
      icon:()=><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      label:"Assessment Reports",
      data:[
        {title:"Web Dev Assignment 1", batch:"BCA-1",submitted:"38/45",due:"20 Mar",status:"Open"},
        {title:"C Programming Lab 3",  batch:"BCA-1",submitted:"45/45",due:"18 Mar",status:"Closed"},
        {title:"DS Unit Test",         batch:"BCA-1",submitted:"12/45",due:"25 Mar",status:"Open"},
        {title:"DBMS ER Diagram",      batch:"BCA-2",submitted:"28/40",due:"22 Mar",status:"Open"},
      ],
      cols:["Assignment","Batch","Submitted","Due","Status"],
      rows:r=>[r.title,r.batch,r.submitted,r.due,r.status],
    },
    {
      key:"issue",
      icon:()=><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
      label:"Issue Reports",
      data:[
        {issue:"Lab equipment malfunction", reported:"Prof. Priya",  date:"15 Mar",priority:"High",  status:"Pending"},
        {issue:"Projector not working",      reported:"Dr. Amit",    date:"14 Mar",priority:"Medium",status:"Resolved"},
        {issue:"WiFi connectivity issue",    reported:"Prof. Neha",  date:"13 Mar",priority:"High",  status:"In Progress"},
        {issue:"Library books shortage",     reported:"Prof. Rohit", date:"12 Mar",priority:"Low",   status:"Pending"},
      ],
      cols:["Issue","Reported By","Date","Priority","Status"],
      rows:r=>[r.issue,r.reported,r.date,r.priority,r.status],
    },
  ];

  const statusColor = (val) => {
    const v = val?.toLowerCase();
    if (v==="active"||v==="resolved"||v==="closed") return {color:"#15803d",bg:"#f0fdf4",border:"#bbf7d0"};
    if (v==="pending"||v==="open")                   return {color:"#1d4ed8",bg:"#eff6ff",border:"#bfdbfe"};
    if (v==="in progress")                           return {color:"#d97706",bg:"#fffbeb",border:"#fde68a"};
    if (v==="high")                                  return {color:"#dc2626",bg:"#fef2f2",border:"#fecaca"};
    if (v==="medium")                                return {color:"#d97706",bg:"#fffbeb",border:"#fde68a"};
    if (v==="low")                                   return {color:"#15803d",bg:"#f0fdf4",border:"#bbf7d0"};
    return null;
  };

  const card = REPORT_CARDS.find(c => c.key === selected);

  return (
    <div style={{padding:"24px"}}>
      <div style={{background:"#fff",border:"1px solid #e2e5ea",borderRadius:"8px",padding:"22px 24px"}}>

        {/* Header */}
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"22px"}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e"}}>Department Reports</span>
        </div>

        {/* 3×2 card grid */}
        {!selected && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px"}}>
            {REPORT_CARDS.map(({key,icon:Icon,label}) => {
              const [h,setH] = useState(false);
              return (
                <div key={key}
                  onClick={()=>setSelected(key)}
                  onMouseEnter={()=>setH(true)}
                  onMouseLeave={()=>setH(false)}
                  style={{border:"1px solid #e2e5ea",borderRadius:"10px",padding:"32px 20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"14px",cursor:"pointer",background:h?"#f9fafb":"#fff",transition:"all 0.15s",boxShadow:h?"0 2px 12px rgba(0,0,0,0.07)":"none",minHeight:"130px"}}>
                  <Icon/>
                  <span style={{fontSize:"13px",fontWeight:500,color:"#374151"}}>{label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Detail table view */}
        {selected && card && (
          <div>
            {/* Back + title */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"18px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <button onClick={()=>setSelected(null)}
                  style={{display:"flex",alignItems:"center",gap:"5px",background:"none",border:"none",cursor:"pointer",color:"#555",fontSize:"12px",fontWeight:500,padding:0}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  Back
                </button>
                <span style={{color:"#dde3ec"}}>|</span>
                <span style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a2e"}}>{card.label}</span>
              </div>
              <button
                onClick={()=>window.print()}
                style={{display:"flex",alignItems:"center",gap:"6px",background:"#1a1a2e",color:"#fff",border:"none",borderRadius:"6px",padding:"7px 14px",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>
                🖨 Print / Export
              </button>
            </div>

            {/* Table */}
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{background:"#fafbfc",borderBottom:"1px solid #eef0f4"}}>
                    {card.cols.map((col,i) => (
                      <th key={col} style={{padding:"10px 14px",textAlign:"left",fontSize:"12px",fontWeight:600,color:"#555",paddingLeft:i===0?"20px":"14px",whiteSpace:"nowrap"}}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {card.data.map((row,idx) => {
                    const cells = card.rows(row);
                    return (
                      <tr key={idx} style={{borderBottom:idx<card.data.length-1?"1px solid #f0f2f6":"none",verticalAlign:"middle"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"}
                        onMouseLeave={e=>e.currentTarget.style.background="white"}>
                        {cells.map((cell,ci) => {
                          const badge = statusColor(cell);
                          return (
                            <td key={ci} style={{padding:"13px 14px",paddingLeft:ci===0?"20px":"14px",fontSize:"12.5px",color:"#1a1a2e",fontWeight:ci===0?600:400}}>
                              {badge
                                ? <span style={{background:badge.bg,color:badge.color,border:`1px solid ${badge.border}`,borderRadius:"4px",padding:"2px 9px",fontSize:"11px",fontWeight:600}}>{cell}</span>
                                : cell
                              }
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}