// components.js
console.log("components.js loaded");

// This script dynamically loads components like navigation and footer into the main HTML document.
document.addEventListener("DOMContentLoaded", () => {
  const components = [
    { selector: "#nav-container", path: "../../components/nav.html" },
    { selector: "#footer-container", path: "../../components/footer.html" }
  ];

  components.forEach(component => {
    const container = document.querySelector(component.selector);

    if (container) {
      fetch(component.path)
        .then(response => response.text())
        .then(data => {
          container.innerHTML = data;

          // Ensure the sticky class is applied after loading
          const nav = container.querySelector(".sticky");
          if (nav) {
            nav.classList.add("top-0");
          }
        })
        .catch(error => console.error(`Error loading ${component.path}:`, error));
    }
  });
});


