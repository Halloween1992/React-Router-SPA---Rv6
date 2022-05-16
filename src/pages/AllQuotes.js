import { useEffect } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

export default function AllQuotes(props) {
  const { sendRequest, status, data, error } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered focused">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered focused">
        <p>{error}</p>
      </div>
    );
  }

  if (status === "completed" && (!data || data.length === 0)) {
    return <NoQuotesFound />;
  }

  return (
    <>
      <QuoteList quotes={data} />
    </>
  );
}
