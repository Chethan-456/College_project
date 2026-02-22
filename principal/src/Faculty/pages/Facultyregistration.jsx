import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadItem({ doc }) {
  const [fileName, setFileName] = useState("");
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        {doc.label} {doc.req && <span className="text-red-500">*</span>}
      </div>
      <label className={`border-2 border-dashed rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer text-xs transition-all ${fileName ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-300 bg-gray-50 text-gray-500 hover:border-violet-400 hover:text-violet-600"}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
        <span className="truncate max-w-[120px]">{fileName ? fileName : `Upload ${doc.label}`}</span>
        <input type="file" accept={doc.accept} className="hidden" onChange={(e) => { if (e.target.files[0]) setFileName(e.target.files[0].name); }} />
      </label>
      <span className="text-xs text-gray-400">{doc.hint}</span>
    </div>
  );
}

const documents = [
  { label: "Passport Photo",           req: true,  hint: "Max 5MB. JPG, PNG only.",          accept: ".jpg,.jpeg,.png" },
  { label: "Aadhar Card",              req: true,  hint: "Max 5MB. PDF, JPG, PNG allowed.",   accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "Highest Degree Certificate", req: true, hint: "Max 5MB. PDF, JPG, PNG allowed.", accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "PG Degree (if applicable)", req: false, hint: "Max 5MB. PDF, JPG, PNG allowed.", accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "10th Marks Card",          req: true,  hint: "Max 5MB. PDF, JPG, PNG allowed.",   accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "12th Marks Card",          req: true,  hint: "Max 5MB. PDF, JPG, PNG allowed.",   accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "UG Marksheet",             req: true,  hint: "Max 5MB. PDF, JPG, PNG allowed.",   accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "PG Marksheet (if applicable)", req: false, hint: "Max 5MB. PDF, JPG, PNG allowed.", accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "Experience Certificate",   req: false, hint: "Max 5MB. PDF, JPG, PNG allowed.",   accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "Last 3 Months Salary Slips", req: false, hint: "Max 5MB. PDF, JPG, PNG allowed.", accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "PAN Card",                 req: true,  hint: "Max 5MB. PDF, JPG, PNG allowed.",   accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "Bank Passbook/Statement",  req: true,  hint: "Max 5MB. PDF, JPG, PNG allowed.",   accept: ".pdf,.jpg,.jpeg,.png" },
];

export default function FacultyRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", designation: "", age: "",
    gender: "", address: "", qualification: "", mobile: "", email: "",
    isClassTeacher: "yes", className: "", section: "", year: "", semester: "",
    isHOD: "yes", department: "", password: "", confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const reset = () => setForm({
    firstName: "", lastName: "", designation: "", age: "",
    gender: "", address: "", qualification: "", mobile: "", email: "",
    isClassTeacher: "yes", className: "", section: "", year: "", semester: "",
    isHOD: "yes", department: "", password: "", confirmPassword: "",
  });

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-gray-100 text-sm text-gray-900 outline-none focus:bg-violet-50 focus:ring-2 focus:ring-violet-300 transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  const EyeIcon = ({ open }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {open ? (<><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>)}
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 flex items-start justify-center py-10 px-5">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl px-10 py-9">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-violet-700 text-lg font-semibold mb-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            New Faculty Registration
          </div>
          <p className="text-gray-400 text-sm">Please fill in all the required information below</p>
        </div>

        {/* First Name + Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className={labelClass}>First Name <span className="text-red-500">*</span></label><input type="text" placeholder="Enter first name" value={form.firstName} onChange={set("firstName")} className={inputClass}/></div>
          <div><label className={labelClass}>Last Name <span className="text-red-500">*</span></label><input type="text" placeholder="Enter last name" value={form.lastName} onChange={set("lastName")} className={inputClass}/></div>
        </div>

        {/* Designation + Age */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>Designation <span className="text-red-500">*</span></label>
            <select value={form.designation} onChange={set("designation")} className={inputClass}>
              <option value="">Select designation</option>
              <option>Assistant Professor</option><option>Associate Professor</option>
              <option>Professor</option><option>HOD</option><option>Principal</option>
            </select>
          </div>
          <div><label className={labelClass}>Age <span className="text-red-500">*</span></label><input type="number" placeholder="Enter age" value={form.age} onChange={set("age")} className={inputClass}/></div>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className={labelClass}>Gender <span className="text-red-500">*</span></label>
          <div className="flex gap-6 mt-1">
            {["Male","Female","Others"].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                <input type="radio" name="gender" value={g} checked={form.gender===g} onChange={set("gender")} className="accent-violet-600 w-4 h-4"/>
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className={labelClass}>Address <span className="text-red-500">*</span></label>
          <textarea placeholder="Enter complete address" value={form.address} onChange={set("address")} rows={3} className={`${inputClass} resize-none`}/>
        </div>

        {/* Qualification */}
        <div className="mb-4">
          <label className={labelClass}>Qualification <span className="text-red-500">*</span></label>
          <textarea placeholder="Enter educational qualification details" value={form.qualification} onChange={set("qualification")} rows={3} className={`${inputClass} resize-none`}/>
        </div>

        {/* Mobile + Email */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className={labelClass}>Mobile Number <span className="text-red-500">*</span></label><input type="tel" placeholder="Enter 10-digit mobile" value={form.mobile} onChange={set("mobile")} className={inputClass}/></div>
          <div><label className={labelClass}>Email ID <span className="text-red-500">*</span></label><input type="email" placeholder="Enter email address" value={form.email} onChange={set("email")} className={inputClass}/></div>
        </div>

        {/* Class Teacher */}
        <div className="mb-4">
          <label className={labelClass}>Are you a class teacher? <span className="text-red-500">*</span></label>
          <div className="flex gap-6 mt-1">
            {["yes","no"].map((v) => (
              <label key={v} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                <input type="radio" name="isClassTeacher" value={v} checked={form.isClassTeacher===v} onChange={set("isClassTeacher")} className="accent-violet-600 w-4 h-4"/>
                {v.charAt(0).toUpperCase()+v.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {form.isClassTeacher === "yes" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-800 mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              Class Details
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><label className={labelClass}>Class <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., Class-1" value={form.className} onChange={set("className")} className={inputClass}/></div>
              <div>
                <label className={labelClass}>Section <span className="text-red-500">*</span></label>
                <select value={form.section} onChange={set("section")} className={inputClass}>
                  <option value="">Select section</option>
                  <option>A</option><option>B</option><option>C</option><option>D</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClass}>Year <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., 2024" value={form.year} onChange={set("year")} className={inputClass}/></div>
              <div>
                <label className={labelClass}>Semester <span className="text-red-500">*</span></label>
                <select value={form.semester} onChange={set("semester")} className={inputClass}>
                  <option value="">Select semester</option>
                  {[1,2,3,4,5,6,7,8].map((s) => <option key={s}>Semester {s}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* HOD */}
        <div className="mb-4">
          <label className={labelClass}>Are you a HOD? <span className="text-red-500">*</span></label>
          <div className="flex gap-6 mt-1">
            {["yes","no"].map((v) => (
              <label key={v} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                <input type="radio" name="isHOD" value={v} checked={form.isHOD===v} onChange={set("isHOD")} className="accent-violet-600 w-4 h-4"/>
                {v.charAt(0).toUpperCase()+v.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {form.isHOD === "yes" && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-800 mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              HOD Details
            </div>
            <div><label className={labelClass}>Branch/Department <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., Computer Science" value={form.department} onChange={set("department")} className={inputClass}/></div>
          </div>
        )}

        {/* Document Upload */}
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 my-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Document Upload
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          {documents.map((doc) => <UploadItem key={doc.label} doc={doc} />)}
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-800 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
            Document Upload Guidelines:
          </div>
          <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
            <li>Ensure all documents are clear and readable</li>
            <li>Maximum file size: 5MB per document</li>
            <li>Accepted formats: PDF, JPG, JPEG, PNG</li>
            <li>Documents marked with * are mandatory</li>
            <li>Keep original documents ready for verification</li>
          </ul>
        </div>

        {/* Password */}
        <div className="grid grid-cols-2 gap-4 mb-7">
          <div>
            <label className={labelClass}>Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} placeholder="Enter password" value={form.password} onChange={set("password")} className={`${inputClass} pr-10`}/>
              <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-600"><EyeIcon open={showPw}/></button>
            </div>
          </div>
          <div>
            <label className={labelClass}>Confirm Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input type={showCpw ? "text" : "password"} placeholder="Confirm password" value={form.confirmPassword} onChange={set("confirmPassword")} className={`${inputClass} pr-10`}/>
              <button onClick={() => setShowCpw(!showCpw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-600"><EyeIcon open={showCpw}/></button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => navigate("/dashboard/faculty")} className="py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            Submit Application
          </button>
          <button onClick={reset} className="py-3.5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
            Reset Form
          </button>
        </div>

      </div>
    </div>
  );
}