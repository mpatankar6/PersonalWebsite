const cards = document.getElementsByClassName("card");
for (const card of cards) {
  const expandButton = card.querySelector(".card-button.expand");
  expandButton.addEventListener("click", function () {
    card.classList.toggle("expanded");
    if (card.classList.contains("expanded"))
      expandButton.textContent = "Less ▴";
    else expandButton.textContent = "More ▾";
  });
}
