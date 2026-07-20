const fs = require("fs");
const p = "src/app/globals.css";
let c = fs.readFileSync(p, "utf8");

const replacements = [
  ["padding: 53.4px 72.2px 71.3px 72.2px;", "padding: 53.4px 0 0;"],
  ["padding: 49px 66.2px 65.3px 66.2px;", "padding: 49px 0 0;"],
  ["padding: 46px 62.1px 61.4px 62.1px;", "padding: 46px 0 0;"],
  ["padding: 43px 57px 57px 57px;", "padding: 43px 0 0;"],
  ["padding: 40.3px 53.4px 53.4px;", "padding: 40.3px 0 0;"],
  ["padding: 37.3px 49.5px 49.5px;", "padding: 37.3px 0 0;"],
  ["padding: 31.3px 24px 41.5px;", "padding: 31.3px 0 0;"],
];

for (const [from, to] of replacements) {
  // only replace inside .ourteamdiv blocks roughly - replace all occurrences of these paddings that follow ourteamdiv
  c = c.split(`.ourteamdiv {\n    ${from}`).join(`.ourteamdiv {\n    ${to}`);
}

c = c.replace(
  /\.ourteamdiv \{\n    padding-top: 40px;\n    padding-bottom: 48px;\n  \}/g,
  `.ourteamdiv {\n    padding-top: 40px;\n    padding-bottom: 0;\n  }`
);

fs.writeFileSync(p, c);
console.log("done");
