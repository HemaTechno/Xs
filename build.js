const fs = require("fs");
const path = require("path");

const scripts = JSON.parse(fs.readFileSync("scripts.json", "utf8"));
const template = fs.readFileSync("template.html", "utf8");

if (!fs.existsSync("script")) {
  fs.mkdirSync("script");
}

scripts.forEach(script => {
  let page = template
    .replace(/{{TITLE}}/g, script.title)
    .replace(/{{DESCRIPTION}}/g, script.description)
    .replace(/{{CODE}}/g, script.code);

  const outputPath = path.join("script", `${script.slug}.html`);
  fs.writeFileSync(outputPath, page);
  console.log("Generated:", outputPath);
});
