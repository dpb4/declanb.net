// light/dark toggle

const root = document.documentElement;
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function loadTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // storage blocked, toggle still works for this page
  }
}

function currentTheme() {
  return root.dataset.theme || (darkQuery.matches ? "dark" : "light");
}

const saved = loadTheme();
if (saved === "light" || saved === "dark") {
  root.dataset.theme = saved;
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");
  button.className = "themetoggle";
  button.title = "toggle light/dark";
  button.setAttribute("aria-label", "toggle light/dark theme");

  button.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    saveTheme(next);
  });

  document.querySelector("header").append(button);
});
