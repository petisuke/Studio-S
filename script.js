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
