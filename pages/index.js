import {useRef, useState} from "react";
export default function Home() {
  const [feedback, setFeedback] = useState();
  const emailRef = useRef();
  const feedbackRef = useRef();
  const formHandler = e => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;
    const reqBody = {email: enteredEmail, text: enteredFeedback};
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const getFeedback = () => {
    fetch("/api/feedback")
      .then(res => res.json())
      .then(data => setFeedback(data.feedback));
  };
  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={formHandler}>
        <div>
          <label htmlFor="email"> Your Email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback"> Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackRef}></textarea>
        </div>
        <button>send feedback</button>
      </form>
      <hr />

      <button onClick={getFeedback}>Load Feedback</button>
      <ul>
        {feedback?.map(el => {
          <>
            {console.log(el.feedback)}
            <li key={el.id}>{el.feedback}</li>
          </>;
        })}
      </ul>
    </div>
  );
}
