import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}
export function extractFeedback(myFilePath) {
  const fileData = fs.readFileSync(myFilePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };

    //store
    const myFilePath = buildFeedbackPath();
    const data = extractFeedback(myFilePath);
    data.push(newFeedback);
    fs.writeFileSync(myFilePath, JSON.stringify(data));
    res.status(201).json({message: "Sucsses", feedback: newFeedback});
  } else {
    const myFilePath = buildFeedbackPath();
    const data = extractFeedback(myFilePath);
    res.status(200).json({feedback: data});
  }
}
export default handler;
