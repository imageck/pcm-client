import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import useAxios from "axios-hooks";
import ExtraFields from "./extra-fields";

axios.defaults.baseURL = "https://pcm-server-production.up.railway.app/api";

export default function NewCollection() {
  const [desc, setDesc] = useState("");
  const cats = ["Autographs", "Books", "Bottles", "Cards",
                "Clocks", "Coins", "Comics", "Fantasy",
                "Games", "Pens", "Stamps", "Toys"];
  const [img, setImg] = useState(null);
  const [imgBtn, setImgBtn] = useState("btn-outline-primary");
  const [itemFields, setItemFields] = useState({});

  let navigate = useNavigate();
  let [{ data, loading, error, response }, execute] =
    useAxios({ url: "collections", method: "POST" }, { manual: true });

  function handleSubmit(e) { 
    e.preventDefault();
    document.querySelectorAll(".itemFields").forEach(e => {
      e.value = '';
      e.disabled = true;
    })

    let formData     = new FormData(e.target),
        cloudName    = "du1j7kxao",
        uploadPreset = "mrebtnan",
        uploadURL    = `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        jsonData     = {};

    if (!img)
      formData.delete("img");

    for (let [key, value] of formData)
      jsonData[key] = value;
    jsonData.itemFields = itemFields;

    if (img) {
      let fd = new FormData();
      fd.append("upload_preset", uploadPreset);
      fd.append("file", formData.get("img"));

      axios.post(uploadURL, fd, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        jsonData.img = res.data.secure_url;
        execute({
          data: jsonData
        })
        .then(res => {
          navigate(`/collections/${res.data._id}`);
        });
      })
      .catch(err => {
        setImgBtn("btn-danger");
      });
    } else {
      execute({
        data: jsonData
      })
      .then(res => {
        navigate(`/collections/${res.data._id}`);
      });
    }
  }

  function handleImg(e) {
    let f;
    if (e.type === "change") {
      f = e.target.files[0];
    } else if (e.type === "drop") {
      let dt = e.dataTransfer;
      f = dt.files[0];
    }
    if (f.type.match(/^image\/(?:webp|jpeg)$/)) {
      setImg(f.name);
      setImgBtn("btn-primary");
    }
    else
      setImgBtn("btn-danger");
  }

  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    handleImg(e);
  }

  return (
    <form onSubmit={handleSubmit} id="newCollectionForm">
     <fieldset>
      <legend>Add new collection</legend>
      <p className="form-floating">
       <input type="text"
              required
              autoFocus
              maxLength={100}
              id="name"
              name="name"
              placeholder=""
              className="form-control" />
       <label htmlFor="name">Name</label>
      </p>
      <div className="input-group flex-column flex-lg-row desc">
       <p className="form-floating my-0 w-auto">
        <textarea id="desc"
                  maxLength={255}
                  onInput={e => setDesc(e.target.value)}
                  name="desc"
                  placeholder=""
                  className="form-control markdown-desc" />
        <label htmlFor="desc">Short description</label>
       </p>
       <ReactMarkdown children={desc ? desc : "Markdown preview"} className="align-items-start markdown-desc w-auto border-info-subtle input-group-text" />
      </div>
      <p className="form-floating">
       <select id="cat"
               required
               name="cat"
               className="form-select form-select-sm mt-3">
        <option className="muted-text" value="">Please select one</option>
        {cats.map(e => (<option	key={e} value={e}>{e}</option>))}
       </select>
       <label htmlFor="cat">Category</label>
      </p>
      <menu className="btn-toolbar p-0 gap-2">
       <li className="btn-group">
        <ExtraFields setItemFields={setItemFields} />
       </li>
       <li className="btn-group">
        <input type="file" id="img" name="img"
               accept="image/webp, image/jpeg"
               onChange={handleImg}
               className="visually-hidden" />
        <label htmlFor="img"
               onDragEnter={dragenter}
               onDragOver={dragover}
               onDrop={drop}
               className={"btn rounded " + imgBtn}>
         {img ? img : "Click or drag & drop here to add an image (WebP, JPG)"}
        </label>
       </li>
      </menu>
      <p className="d-grid">
       <button type="submit"
               className={"btn btn-lg btn-primary" + (loading ? " disabled" : "")}>
        Let's go!
       </button>
      </p>
     </fieldset>
    </form>
  );
}
