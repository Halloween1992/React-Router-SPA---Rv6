import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

export default function NewQuotes(props) {
  const { sendRequest, status } = useHttp(addQuote);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      navigate("/quotes", { replace: true });
    }
  }, [status, navigate]);

  const onAddQuoteHandler = (data) => {
    sendRequest(data);
  };
  return (
    <>
      <QuoteForm
        isLoading={status === "pending"}
        onAddQuote={onAddQuoteHandler}
      />
    </>
  );
}
