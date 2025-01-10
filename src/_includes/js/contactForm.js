if (window.location.pathname === "/contact/") {
  const form = document.querySelector("form");
  const formSubmissionMessage = document.getElementById(
    "form-submission-message"
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    fetch("/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok)
          formSubmissionMessage.textContent = await response.text();
        else
          formSubmissionMessage.textContent = `HTTP Error ${response.status} ${
            response.statusText
          }, ${await response.text()}`;
      })
      .catch(
        (error) =>
          (formSubmissionMessage.textContent = `Error: ${error.message}`)
      );
  });
}
