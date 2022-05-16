import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParam = new URLSearchParams(location.search);
  const isSortingAcending = queryParam.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isSortingAcending);

  const changeQueryParams = () => {
    navigate(
      `${location.pathname}/?sort=${isSortingAcending ? "desc" : "asc"}`
    );
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeQueryParams}>
          Sort {isSortingAcending ? "Ascending" : "Decending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
