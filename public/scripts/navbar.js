document.addEventListener("DOMContentLoaded", () => {
  const userIconWrapper = document.querySelector(".menu-item-user");
  const userIcon = document.querySelector(".fa-user");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  userIconWrapper.addEventListener("mouseenter", () => {
    userIcon.style.color = "#1363df";
  });

  userIconWrapper.addEventListener("mouseleave", () => {
    userIcon.style.color = "#000000";
  });

  dropdownMenu.addEventListener("mouseenter", () => {
    userIcon.style.color = "#1363df";
  });
});
