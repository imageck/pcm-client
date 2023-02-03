import { useLocation } from "react-router-dom";
import useAxios from "axios-hooks";
import Items from "../layouts/items";
import NewItem from "../layouts/items/new";
import Error from "../layouts/error";

export default function Collection() {
  const { pathname } = useLocation();
  let [{ data, loading, error }] = useAxios({ method: "GET", url: pathname });

  if (error) return <Error code={error.response.status} />;
  if (data) return (<>
    <h1 className="text-wrap text-truncate lh-base">
      Collection "{data.name}"
    </h1>
    <NewItem itemFields={data.itemFields} collectionId={data._id} />
    <Items collectionId={data._id} itemFields={data.itemFields} />
  </>);
}
