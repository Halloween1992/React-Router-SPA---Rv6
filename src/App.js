import React, { Suspense } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));
const NewQuotes = React.lazy(() => import("./pages/NewQuotes"));
const QuoteDetails = React.lazy(() => import("./pages/QuoteDetails"));
const NoPageFound = React.lazy(() => import("./pages/NoPageFound"));
const Comments = React.lazy(() => import("./components/comments/Comments"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" />} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/quotes/:quoteId" element={<QuoteDetails />}>
            <Route
              path={""}
              element={
                <div className={"centered"}>
                  <Link className={"btn--flat"} to={`comments`}>
                    Load Comments
                  </Link>
                </div>
              }
            />
            <Route path={`comments`} element={<Comments />} />
          </Route>
          <Route path="/new-quote" element={<NewQuotes />} />
          <Route path={"*"} element={<NoPageFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
