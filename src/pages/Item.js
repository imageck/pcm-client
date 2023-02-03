import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import useAxios from "axios-hooks";
import Error from "../layouts/error";
import ItemForm from "../layouts/items/form";

export default function Item() {
  const { pathname } = useLocation();
  const [{ data, loading, error }] =
    useAxios({ method: "GET", url: pathname });

  const [edit, setEdit] = useState(false);

  if (error) return <Error code={error.response.status} />;
  if (data) return (
    <>
      <h1>Item</h1>
      <ItemForm itemFields={data.collectionId.itemFields} edit={edit} item={data} />
    </>
  );
}
