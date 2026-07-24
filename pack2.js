const FD_AUTH_KEY = "fd_demo_user";
const FD_PREFS_KEY = "fd_demo_preferences";
const FD_NOTIFICATIONS_KEY = "fd_demo_notifications";

function fdGetUser() {
  try {
    return JSON.parse(localStorage.getItem(FD_AUTH_KEY));
  } catch {
    return null;
  }
}

function fdSaveUser(user) {
  localStorage.setItem(FD_AUTH_KEY, JSON.stringify(user));
}

function fdClearUser() {
  localStorage.removeItem(FD_AUTH_KEY);
  localStorage.removeItem(FD_PREFS_KEY);
}

function fdGetPreferences() {
  try {
    return JSON.parse(localStorage.getItem(FD_PREFS_KEY)) || {
      emailUpdates: true,
      researchAlerts: true,
      productUpdates: false,
      compactView: false
    };
  } catch {
    return {};
  }
}

function fdSavePreferences(preferences) {
  localStorage.setItem(FD_PREFS_KEY, JSON.stringify(preferences));
}

function fdSeedNotifications() {
  if (!localStorage.getItem(FD_NOTIFICATIONS_KEY)) {
    const notifications = [
      {
        id: 1,
        title: "Prototype workspace created",
        body: "Your Fingerprint Diagnostics workspace is ready.",
        date: "Today",
        read: false
      },
      {
        id: 2,
        title: "Endometriosis model available",
        body: "The illustrative fingerprint model is now visible in your dashboard.",
        date: "Today",
        read: false
      },
      {
        id: 3,
        title: "Research-only reminder",
        body: "This platform is not clinically validated and must not be used for patient care.",
        date: "Earlier",
        read: true
      }
    ];
    localStorage.setItem(FD_NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }
}

function fdGetNotifications() {
  fdSeedNotifications();
  try {
    return JSON.parse(localStorage.getItem(FD_NOTIFICATIONS_KEY)) || [];
  } catch {
    return [];
  }
}

function fdSaveNotifications(items) {
  localStorage.setItem(FD_NOTIFICATIONS_KEY, JSON.stringify(items));
}

function fdRequireUser() {
  const user = fdGetUser();
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  return user;
}

function fdUpdateUserUI() {
  const user = fdGetUser();

  document.querySelectorAll("[data-user-name]").forEach((node) => {
    node.textContent = user?.name || "User";
  });

  document.querySelectorAll("[data-user-email]").forEach((node) => {
    node.textContent = user?.email || "";
  });

  document.querySelectorAll("[data-user-role]").forEach((node) => {
    node.textContent = user?.role || "Research user";
  });

  document.querySelectorAll("[data-user-organisation]").forEach((node) => {
    node.textContent = user?.organisation || "Independent";
  });

  const unread = fdGetNotifications().filter((item) => !item.read).length;
  document.querySelectorAll("[data-notification-count]").forEach((node) => {
    node.textContent = unread;
    node.hidden = unread === 0;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fdUpdateUserUI();

  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      fdClearUser();
      window.location.href = "index.html";
    });
  });
});
