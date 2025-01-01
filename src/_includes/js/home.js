document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("no-scroll");
  loadDate(new Date());
  document.addEventListener("ConsoleAnimationFinished", () => freeContent());

  if (new URLSearchParams(window.location.search).get("visited") == "true")
    skipAnimations();
  else writeConsoleLines();

  splashScreenScrollBehavior();
});

const freeContent = () => {
  document.body.classList.remove("no-scroll");
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
    span.classList.remove("animate-typing");
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

const writeConsoleLines = () => {
  let currentLine = 0;
  const lineCount = document.getElementsByClassName("line").length;
  document.addEventListener("animationend", (event) => {
    if (event.animationName == "typing") {
      if (currentLine === lineCount - 1) {
        document.dispatchEvent(new Event("ConsoleAnimationFinished"));
        return;
      }
      const currentLineElement = document.getElementById(`line-${currentLine}`);
      const nextLineElement = document.getElementById(
        `line-${(currentLine += 1)}`
      );
      currentLineElement.querySelector("span").style.border = "none";
      characterCount = nextLineElement.querySelector("span").textContent.length;
      nextLineElement.style.setProperty("--characters", `${characterCount}`);
      nextLineElement.style.setProperty(
        "--typing-time",
        `${characterCount * 75}ms`
      );
      nextLineElement.style.display = "block";
    }
  });
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
