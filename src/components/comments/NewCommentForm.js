import { useState, useEffect } from "react";

import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const [formValu, setFromValue] = useState("");
  const onChangeHandler = (e) => {
    setFromValue(e.target.value);
  };

  const { sendRequest, status, error } = useHttp(addComment);

  const { quoteId, onLoadComments } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onLoadComments();
    }
    console.log("useEffect");
  }, [onLoadComments, error, status]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest({
      quoteId: quoteId,
      commentData: { text: formValu },
    });

    setFromValue("");
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && <LoadingSpinner />}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          value={formValu}
          onChange={onChangeHandler}
          id="comment"
          rows="5"
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
