import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { quoteId } = params;

  const { sendRequest, data, status } = useHttp(getAllComments);
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const onLoadCommentsHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;

  if (status === "pending") comments = <LoadingSpinner />;

  if (status === "completed" && data && data.length > 0)
    comments = <CommentsList comments={data} />;

  if (status === "completed" && data && data.length === 0)
    comments = (
      <div>
        <p>No comments were added yet</p>
      </div>
    );

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onLoadComments={onLoadCommentsHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
