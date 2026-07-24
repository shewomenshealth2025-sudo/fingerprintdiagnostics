const FD3_PATIENT = "fd_demo_patient";
const FD3_SYMPTOMS = "fd_demo_symptoms";
const FD3_RESULTS = "fd_demo_results";
const FD3_TIMELINE = "fd_demo_timeline";

function fd3Read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}

function fd3Write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function fd3Seed() {
  if (!localStorage.getItem(FD3_PATIENT)) {
    fd3Write(FD3_PATIENT, {
      fullName: "Amelia Clarke",
      dateOfBirth: "1995-04-18",
      sex: "Female",
      nhsNumber: "943 476 5919",
      email: "amelia.clarke@example.com",
      phone: "+44 7700 900123",
      gpPractice: "Riverside Medical Practice",
      conditions: ["Suspected endometriosis"],
      medications: ["Ibuprofen as needed"],
      allergies: ["No known drug allergies"]
    });
  }
  if (!localStorage.getItem(FD3_SYMPTOMS)) {
    fd3Write(FD3_SYMPTOMS, [
      {id:1,name:"Pelvic pain",severity:8,frequency:"Most days",onset:"2024-09-01",notes:"Worse during menstruation"},
      {id:2,name:"Fatigue",severity:6,frequency:"Several days a week",onset:"2024-11-12",notes:"More noticeable after poor sleep"},
      {id:3,name:"Painful periods",severity:9,frequency:"Every cycle",onset:"2018-01-01",notes:"Has gradually worsened"}
    ]);
  }
  if (!localStorage.getItem(FD3_RESULTS)) {
    fd3Write(FD3_RESULTS, [
      {test:"CA-125",value:"42 U/mL",range:"0–35 U/mL",date:"2026-05-21",status:"High"},
      {test:"CRP",value:"7.8 mg/L",range:"0–5 mg/L",date:"2026-05-21",status:"High"},
      {test:"Ferritin",value:"28 µg/L",range:"15–150 µg/L",date:"2026-05-21",status:"Normal"},
      {test:"Haemoglobin",value:"121 g/L",range:"115–160 g/L",date:"2026-05-21",status:"Normal"}
    ]);
  }
  if (!localStorage.getItem(FD3_TIMELINE)) {
    fd3Write(FD3_TIMELINE, [
      {date:"2026-06-18",title:"Pelvic ultrasound reviewed",type:"Investigation",detail:"No large ovarian endometrioma identified. Further assessment recommended."},
      {date:"2026-05-21",title:"Blood tests completed",type:"Test result",detail:"Mild elevations in CA-125 and CRP recorded."},
      {date:"2026-04-09",title:"GP consultation",type:"Appointment",detail:"Discussed cyclical pelvic pain and fatigue. Referred to gynaecology."},
      {date:"2025-11-14",title:"Symptom diary started",type:"Patient entry",detail:"Began tracking pain, fatigue and menstrual symptoms."}
    ]);
  }
}

function fd3Date(value) {
  return new Date(value + "T00:00:00").toLocaleDateString("en-GB", {
    day:"numeric", month:"short", year:"numeric"
  });
}

document.addEventListener("DOMContentLoaded", fd3Seed);
