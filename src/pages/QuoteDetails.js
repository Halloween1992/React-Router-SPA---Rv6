import { useParams, Outlet } from "react-router-dom";
import { useEffect } from "react";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

export default function QuoteDetails(props) {
  const params = useParams();

  const { quoteId } = params;
  const { sendRequest, data, error, status } = useHttp(getSingleQuote);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending")
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="centered">
        <p>Error</p>
      </div>
    );
  if (!data) return <h1>No Quote Found</h1>;

  return (
    <>
      <HighlightedQuote text={data.text} author={data.author} />
      <Outlet />
    </>
  );
}
