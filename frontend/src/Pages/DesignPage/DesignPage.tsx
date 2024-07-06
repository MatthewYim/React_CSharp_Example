import React from "react";
import Table from "../../Components/Table/Table";

interface Props {}

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>ISG Design Page</h1>
      <h2>
        This is ISG's design page. This is where we will house various design
        aspects of the app
      </h2>
      <Table config={undefined} data={undefined} />
    </>
  );
};

export default DesignPage;
