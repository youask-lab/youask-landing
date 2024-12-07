// Optional: Add custom behavior or interaction using JavaScript
document.querySelectorAll(".accordion-button").forEach((button) => {
    button.addEventListener("click", function () {
      // Remove 'active' class from all accordion buttons
      document
        .querySelectorAll(".accordion-button")
        .forEach((btn) => btn.classList.remove("active"));
  
      // Add 'active' class to the clicked button
      if (!this.classList.contains("collapsed")) {
        this.classList.add("active");
      }
    });
  });
  