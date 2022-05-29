import {useState} from "react";
import {buildFeedbackPath, extractFeedback} from "../api/feedback";

const Feedbacks = props => {
  const [feedbackData, setFeedbackData] = useState();
  const feedbackDetailsHandler = id => {
    fetch(`/api/${id}`)
      .then(res => res.json())
      .then(data => setFeedbackData(data.feedback));
  };
  console.log(props.feedbackItems);
  return (
    <>
      <ul>
        {props.feedbackItems.map(item => (
          <li style={{color: "red"}} key={item.id}>
            {item.Feedback}
            <button onClick={feedbackDetailsHandler.bind(null, item.id)}>
              show details
            </button>
          </li>
        ))}
      </ul>
      {feedbackData && <p>{feedbackData.email}</p>}
    </>
  );
};

export const getStaticProps = async ctx => {
  const path = buildFeedbackPath();
  const data = extractFeedback(path);
  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default Feedbacks;
