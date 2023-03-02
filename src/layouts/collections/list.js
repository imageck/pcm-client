import axios from "axios";
import useAxios from "axios-hooks";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import Loading from "./loading";
import Error from "../error";

axios.defaults.baseURL = "https://pcm-server-production.up.railway.app/api";

export default function List({ url, n }) {
  let [{data, loading, error}] = useAxios({ method: "GET", url });
  if (loading) return <Loading n={n} />;
  if (error) return <Error code={error.response.status} />;
  if (data) { console.log(data);
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
     {
      data.map(collection => (
      <div className="col col-sm-6" key={collection._id}>
       <div className="card h-100 shadow">
        {collection.img ?
        <img src={collection.img}
             className="card-img-top w-100 object-fit-cover"
             alt=""/>
        : (
        <svg width="100%"
             height="180"
             xmlns="http://www.w3.org/2000/svg"
             className="card-img-top rounded-top-2 w-100 object-fit-contain">
         <rect width="100%" height="100%" fill="#6c757d" />
        </svg>)
        }
         <div className="card-body">
          <h5 className="card-title">
           <Link to={collection._id} state={{ collection }}
                 className="stretched-link text-decoration-none">
            {collection.name}
           </Link>
          </h5>
          <p className="card-text">{collection.author}</p>
          <ReactMarkdown children={collection.desc} className="card-text" />
         </div>
        <div className="card-footer">
         <small className="text-muted">
          Last updated {collection.updatedAt}
         </small>
        </div>
       </div>
      </div>
      ))
     }
    </div>
  )}
}
