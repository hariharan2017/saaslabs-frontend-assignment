import React from "react";
import { Table } from "../../components/Table";
import { useGetApi } from "../../hooks/useGetApi";
import styles from './Kickstarters.module.css';

const KICKSTARTERS_API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

export const Kickstarters = () => {
  const { data, loading, error } = useGetApi(KICKSTARTERS_API_URL);

  const columns = [
    { id: "sno", label: "S.No.", accessor: "s.no" },
    {
      id: "percentFunded",
      label: "Percentage Funded",
      accessor: "percentage.funded",
    },
    { id: "amtPledged", label: "Amount Pledged", accessor: "amt.pledged" },
  ];

  if (loading) return <div>Loading</div>;
  if (error)
    return (
      <div>
        Unable to load table data! Please refresh the page or try after sometime
      </div>
    );

  return (
    <div className={styles["kickstarters-container"]}>
      <Table
        columns={columns}
        data={data}
        title={"Highly Rated Kickstarter Projects"}
        paginate={true}
      />
    </div>
  );
};