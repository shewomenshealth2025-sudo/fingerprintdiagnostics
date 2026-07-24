
const FD5_MODELS_KEY = "fd_demo_fingerprint_models";
const FD5_ACTIVE_MODEL_KEY = "fd_demo_active_model";

function fd5Read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function fd5Write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function fd5Seed() {
  if (!localStorage.getItem(FD5_MODELS_KEY)) {
    fd5Write(FD5_MODELS_KEY, [
      {
        id: "endo-v1",
        name: "Endometriosis",
        version: "0.8 research",
        description: "Illustrative multi-signal pattern combining symptoms, inflammation, hormones, microbiome and genetics.",
        ridges: [
          { name: "Symptoms", score: 90, weight: 0.30, evidence: 18 },
          { name: "Inflammation", score: 82, weight: 0.22, evidence: 14 },
          { name: "Microbiome", score: 71, weight: 0.18, evidence: 10 },
          { name: "Hormonal", score: 64, weight: 0.18, evidence: 12 },
          { name: "Genetic", score: 42, weight: 0.12, evidence: 8 }
        ]
      },
      {
        id: "pcos-v1",
        name: "PCOS",
        version: "0.5 research",
        description: "Illustrative pattern combining metabolic, hormonal, ovarian, dermatological and genetic signals.",
        ridges: [
          { name: "Hormonal", score: 84, weight: 0.27, evidence: 16 },
          { name: "Metabolic", score: 79, weight: 0.24, evidence: 15 },
          { name: "Cycle pattern", score: 75, weight: 0.21, evidence: 13 },
          { name: "Dermatological", score: 57, weight: 0.14, evidence: 8 },
          { name: "Genetic", score: 48, weight: 0.14, evidence: 7 }
        ]
      },
      {
        id: "meno-v1",
        name: "Perimenopause",
        version: "0.3 research",
        description: "Illustrative pattern for fluctuating hormonal, vasomotor, sleep, mood and cycle changes.",
        ridges: [
          { name: "Cycle change", score: 76, weight: 0.24, evidence: 11 },
          { name: "Vasomotor", score: 72, weight: 0.22, evidence: 10 },
          { name: "Sleep", score: 68, weight: 0.19, evidence: 9 },
          { name: "Mood", score: 60, weight: 0.18, evidence: 9 },
          { name: "Hormonal", score: 55, weight: 0.17, evidence: 8 }
        ]
      }
    ]);
  }
  if (!localStorage.getItem(FD5_ACTIVE_MODEL_KEY)) {
    localStorage.setItem(FD5_ACTIVE_MODEL_KEY, "endo-v1");
  }
}

function fd5Models() {
  fd5Seed();
  return fd5Read(FD5_MODELS_KEY, []);
}

function fd5ActiveModel() {
  const models = fd5Models();
  const id = localStorage.getItem(FD5_ACTIVE_MODEL_KEY);
  return models.find(model => model.id === id) || models[0];
}

function fd5Score(model) {
  return Math.round(model.ridges.reduce((total, ridge) => total + ridge.score * ridge.weight, 0));
}

document.addEventListener("DOMContentLoaded", fd5Seed);
