const hamburgerMenuToggleButton = document.getElementById(
  "hamburger-menu-toggle-button"
);

// Uses the collapsing class to animate the menu out of view
const closeMenu = (menu) => {
  menu.classList.add("collapsing");
  menu.classList.remove("show");
  document.documentElement.classList.remove("no-scroll");
  menu.addEventListener("animationend", () => {
    menu.classList.remove("collapsing");
  });
};

const openMenu = (menu) => {
  menu.classList.add("show");
  document.documentElement.classList.add("no-scroll");
};

const hamburgerMenu = document.getElementById("hamburger-menu");
hamburgerMenuToggleButton.addEventListener("click", () => {
  if (hamburgerMenu.classList.contains("show")) closeMenu(hamburgerMenu);
  else openMenu(hamburgerMenu);
});
/**
 * Disable the hamburger menu when the screen is resized to a width
 * greater than 600px in case the user decides to shrink the window
 * again later, which would cause the menu to reappear which is jarring. **/
window.matchMedia(`(max-width: 600px)`).addEventListener("change", (e) => {
  if (!e.matches && hamburgerMenu.classList.contains("show"))
    closeMenu(hamburgerMenu);
});
