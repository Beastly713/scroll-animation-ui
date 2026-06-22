const sceneTwoPrinciples = [
  {
    index: "01",
    text: "Choose files. They stay in your browser.",
  },
  {
    index: "02",
    text: "Hiraishin binds a temporary share link.",
  },
  {
    index: "03",
    text: "The server remembers the route, not the file.",
  },
  {
    index: "04",
    text: "WebRTC carries chunks directly between browsers.",
  },
  {
    index: "05",
    text: "The receiver rebuilds, verifies, and saves the transfer.",
  },
];

export function SceneTwoPrinciples() {
  return (
    <div className="scene-two-principles" aria-label="How Hiraishin transfers files">
      {sceneTwoPrinciples.map((principle) => (
        <article
          className="scene-two-principle"
          data-scene-two-line
          key={principle.index}
        >
          <p className="scene-two-principle__index">{principle.index}</p>
          <p className="scene-two-principle__text">{principle.text}</p>
        </article>
      ))}
    </div>
  );
}
