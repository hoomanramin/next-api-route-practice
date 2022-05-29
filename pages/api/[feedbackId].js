import {buildFeedbackPath, extractFeedback} from "./feedback";

const handler = (req, res) => {
  const feedbackId = req.query.feedbackId;
  const path = buildFeedbackPath();
  const data = extractFeedback(path);
  const selectedFeedback = data.find(item => item.id === feedbackId);
  res.status(200).json({feedback: selectedFeedback});
};

export default handler;
