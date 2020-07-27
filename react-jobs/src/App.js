import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";

import JobsPagination from "./JobsPagination";
import Job from "./Job";
import SearchForm from "./SearchForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(0);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(0);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      {loading && <h2>Loading jobs from github API...</h2>}
      {error && <h1>Error. Try Refreshing the page.</h1>}
      {!loading && !error ? (
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      ) : null}
      {!loading && !error
        ? jobs.map((job) => {
            return <Job key={job.id} job={job} />;
          })
        : null}{" "}
      {!loading && !error ? (
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      ) : null}
    </Container>
  );
}

export default App;
