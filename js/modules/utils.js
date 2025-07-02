// Current year updater
export function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Console greeting
export function showConsoleGreeting() {
  console.log("%c👋 Hi there! Need a DevOps expert? Let's chat!", "color: #06b6d4; font-size: 16px;");
}
