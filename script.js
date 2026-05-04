const buttons = document.querySelectorAll(".play-button");
const isJapanesePage = document.documentElement.lang === "ja";

buttons.forEach((button) => {
  const playLabel = isJapanesePage
    ? `${button.dataset.sample} のサンプルを再生`
    : `Play ${button.dataset.sample} sample`;
  const stopLabel = isJapanesePage
    ? `${button.dataset.sample} のサンプルを停止`
    : `Stop ${button.dataset.sample} sample`;

  button.setAttribute("aria-label", playLabel);

  button.addEventListener("click", () => {
    const wasPlaying = button.classList.contains("is-playing");

    buttons.forEach((item) => {
      const itemLabel = isJapanesePage
        ? `${item.dataset.sample} のサンプルを再生`
        : `Play ${item.dataset.sample} sample`;

      item.classList.remove("is-playing");
      item.setAttribute("aria-label", itemLabel);
    });

    if (!wasPlaying) {
      button.classList.add("is-playing");
      button.setAttribute("aria-label", stopLabel);
    }
  });
});

const quoteForm = document.querySelector("#quote-form");

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const value = (key) => String(formData.get(key) || "").trim();
    const recipient = ["petisuke", ["gmail", "com"].join(".")].join("@");
    const subject = "Voice Over Inquiry from Studio S Website";
    const lines = [
      "Studio S voice over inquiry",
      "",
      `Name / Company: ${value("name")}`,
      `Email: ${value("email")}`,
      `Project type: ${value("projectType")}`,
      `Script length / word count: ${value("scriptLength")}`,
      `Deadline: ${value("deadline")}`,
      `Usage: ${value("usage")}`,
      `Number of voices: ${value("voices")}`,
      `Video reference URL: ${value("reference") || "N/A"}`,
      `Desired tone: ${value("tone") || "N/A"}`,
      `Preferred file format: ${value("format") || "N/A"}`,
      `Budget range: ${value("budget") || "N/A"}`,
      "",
      "Message / notes:",
      value("message"),
    ];

    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    const status = document.querySelector("#form-status");

    if (status) {
      status.textContent = "Opening your email app with the prepared inquiry.";
    }

    window.location.href = mailto;
  });
}
