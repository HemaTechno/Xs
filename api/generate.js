import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { title, description, code, slug } = req.body;

  const templatePath = path.join(process.cwd(), "template.html");
  const outputPath = path.join(process.cwd(), "script", `${slug}.html`);

  let template = fs.readFileSync(templatePath, "utf8");

  template = template
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, description)
    .replace(/{{CODE}}/g, code);

  fs.writeFileSync(outputPath, template);

  res.status(200).json({
    success: true,
    url: `/script/${slug}.html`
  });
}
