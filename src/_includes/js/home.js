const freeContent = () => {
  document.body.classList.remove("no-scroll");
  document.querySelector(".replay").style.display = "inline-flex";
  document.querySelector(".welcome-text").style.display = "block";
  document.querySelector(".down-arrow").style.display = "block";
  document.querySelector(".content-view").style.display = "block";
};

const skipAnimations = () => {
  const lineElements = document
    .querySelector(".text-area")
    .querySelectorAll("p");
  lineElements.forEach((element) => {
    element.style.display = "block";
    const span = element.querySelector("span");
    span.style.border = "none";
  });
  document.dispatchEvent(new Event("ConsoleAnimationFinished"));
};

const loadDate = (now) => {
  const padTime = (time) => time.toString().padStart(2, "0");
  document.getElementById("datetime").textContent = `
  ${now.toLocaleString("en-us", { weekday: "short" })}
  ${now.toLocaleString("en-us", { month: "short" })}
  ${now.getDate()}
  ${padTime(now.getHours())}:${padTime(now.getMinutes())}:${padTime(
    now.getSeconds()
  )}`;
};

const typeLineAnimation = (element, text, hasLineBelow) => {
  const timeBetweenCharactersMs = 100;
  return new Promise((resolve) => {
    let i = 0;
    const typeNextCharacter = () => {
      if (i < text.length) {
        element.insertBefore(document.createTextNode(text[i]), null);
        i++;
        setTimeout(typeNextCharacter, timeBetweenCharactersMs);
      } else {
        // Removes the cursor before the next line is typed.
        if (hasLineBelow) element.style.border = "none";
        resolve();
      }
    };

    typeNextCharacter();
  });
};

const runConsoleTypingAnimation = async () => {
  const lines = [
    "cat <<EOF >> home.html",
    "Hi! I'm Mihir.",
    "Welcome to my website.",
    "EOF",
    "\u200B",
  ];

  const lineInputElements = document.querySelectorAll(".line-input");
  const lineElements = document.querySelectorAll(".line");
  for (let i = 0; i < lines.length; i++) {
    lineElements[i].style.visibility = "visible";
    await typeLineAnimation(
      lineInputElements[i],
      lines[i],
      lineElements[i].nextElementSibling
    );
  }

  document.dispatchEvent(new Event("ConsoleAnimationFinished"));
};

const splashScreenScrollBehavior = () => {
  const downArrow = document.querySelector(".down-arrow");

  downArrow.addEventListener("click", () => {
    const contentView = document.querySelector(".content-view");
    contentView.scrollIntoView({ behavior: "smooth" });
    downArrow.style.display = "none";
  });

  window.addEventListener("scroll", () => {
    const splashScreen = document.querySelector(".splash");
    const windowScrolledPastSplashScreen =
      window.scrollY > splashScreen.scrollHeight / 3;
    downArrow.style.display = windowScrolledPastSplashScreen ? "none" : "block";
  });
};

if (window.location.pathname === "/") {
  document.body.classList.add("no-scroll");
  loadDate(new Date());
  document.addEventListener("ConsoleAnimationFinished", () => freeContent());
  if (new URLSearchParams(window.location.search).get("visited") == "true")
    skipAnimations();
  else runConsoleTypingAnimation();
  splashScreenScrollBehavior();
}
