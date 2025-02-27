const mailgunAPI = "https://api.mailgun.net/v3/mihirpatankar.com/messages";

export async function onRequestPost(context) {
  const { request, env } = context;

  const contentType = request.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    const formData = await request.json();
    const email = new URLSearchParams();
    email.append("from", "My Website <no-reply@mihirpatankar.com>");
    email.append("to", "mihir@mihirpatankar.com");
    email.append("subject", "New contact form submission");
    email.append(
      "html",
      `<h1>New Form Submission</h1>
       <p><strong>Name:</strong> ${formData.name}</p>
       <p><strong>Email:</strong> ${formData.email}</p>
       <p><strong>Message:</strong><br/>${formData.message}</p>`
    );

    const response = await fetch(mailgunAPI, {
      method: "POST",
      headers: {
        Authorization: getAuthString(env.MAILGUN_API_KEY),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: email,
    });

    if (response.ok) {
      return new Response("Email sent successfully", { status: 200 });
    } else {
      return new Response(`Failed to send email: ${await response.text()}`, {
        status: 500,
      });
    }
  } else {
    return new Response("Unsupported content type", { status: 415 });
  }
}

const getAuthString = (apiKey) => `Basic ${btoa(`api:${apiKey}`)}`;
