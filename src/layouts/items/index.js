import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import useAxios from "axios-hooks";
import Table from "./table";
import Loading from "./loading";
import Empty from "./empty";
import Error from "../error";

export default function Item({ collectionId, itemFields }) {
  const { pathname } = useLocation();
  const [{ data, loading, error }] =
    useAxios({ method: "GET", url: `${pathname}/items` });

  let columns = [
    { Header: "ID", accessor: "_id" },
    { Header: "Name", accessor: "name" }
  ];
  if (itemFields)
    for (let [f, n] of Object.entries(itemFields))
      if (!f.match(/^(?:text|str)/))
        columns.push({ Header: n, accessor: f });
  
  if (error) return <Error code={error.response.status} />;
  return (
    <div className="table-responsive h-100">
      <Table columns={columns} data={data} />
      {loading && <Loading />}
      {data && data.length === 0 && <Empty />}
    </div>
  );
}
