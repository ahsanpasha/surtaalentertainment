import AnimatedCounter from "../Counter/AnimatedCounter";

const STATS = [
  { end: 7, label: "Years Experience" },
  { end: 100, label: "Successful Event" },
  { end: 50, label: "Exclusive Artists" },
  { end: 60, label: "Professional Team" },
];

export default function SuccessStats() {
  return (
    <div className="SuccessContainer">
      {STATS.map(({ end, label }) => (
        <div className="SuccessDiv" key={label}>
          <AnimatedCounter end={end} />
          <p className="SuccessLabel">{label}</p>
        </div>
      ))}
    </div>
  );
}
