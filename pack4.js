
const FD4_PATIENTS_KEY = "fd_demo_clinician_patients";
const FD4_NOTES_KEY = "fd_demo_clinical_notes";

function fd4Read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function fd4Write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function fd4Seed() {
  if (!localStorage.getItem(FD4_PATIENTS_KEY)) {
    fd4Write(FD4_PATIENTS_KEY, [
      {
        id: "FD-1001",
        name: "Amelia Clarke",
        age: 31,
        status: "Under review",
        condition: "Suspected endometriosis",
        lastActivity: "2026-06-18",
        match: 78,
        priority: "High"
      },
      {
        id: "FD-1002",
        name: "Nora Evans",
        age: 28,
        status: "Monitoring",
        condition: "Possible PCOS",
        lastActivity: "2026-06-16",
        match: 69,
        priority: "Medium"
      },
      {
        id: "FD-1003",
        name: "Leila Ahmed",
        age: 37,
        status: "Awaiting results",
        condition: "Chronic pelvic pain",
        lastActivity: "2026-06-12",
        match: 54,
        priority: "Medium"
      },
      {
        id: "FD-1004",
        name: "Sophie Morgan",
        age: 45,
        status: "Follow-up",
        condition: "Perimenopausal symptoms",
        lastActivity: "2026-06-05",
        match: 41,
        priority: "Routine"
      }
    ]);
  }

  if (!localStorage.getItem(FD4_NOTES_KEY)) {
    fd4Write(FD4_NOTES_KEY, [
      {
        id: 1,
        patientId: "FD-1001",
        date: "2026-06-18",
        author: "Dr Maya Bennett",
        title: "Ultrasound review",
        body: "Discussed imaging findings and the limitations of ultrasound in excluding endometriosis. Continue symptom tracking while awaiting specialist review."
      }
    ]);
  }
}

function fd4Date(value) {
  return new Date(value + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

document.addEventListener("DOMContentLoaded", fd4Seed);
