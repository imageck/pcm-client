import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxios from "axios-hooks";
import ReactMarkdown from "react-markdown";
import Toast from "../toast";
import ItemForm from "./form";
import TagEntry from "./tag-entry";

export default function NewItem({ itemFields, collectionId }) {
  const { pathname } = useLocation();
  let [{ data, loading, error }, postItem] =
    useAxios({ url: `items/?collectionId=${collectionId}`, method: "POST" }, { manual: true });

  const [modal, setModal] = useState(undefined);
  const modalRef = useRef(null);
  const [toast, setToast] = useState(undefined);
  const toastRef = useRef(null);
  useEffect(() => {
    setModal(new window.bootstrap.Modal(modalRef.current,
      { keyboard: false, backdrop: "static" }
    ));
    setToast(new window.bootstrap.Toast(toastRef.current));
  }, [modalRef, toastRef]);

  const [reset, setReset] = useState(0);
  function showModal() {
    modal.show();
  }

  function hideModal() {
    modal.hide();
    setReset(reset => reset + 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    modal.hide();
    let itemFields = Object.fromEntries(new FormData(e.target));
    itemFields.tags = [];
    tagLabels.map(tagLabel => itemFields.tags.push(tagLabel.value));
    postItem({ data: itemFields })
      .then(() => setReset(reset => reset + 1))
      .catch(() => toast.show());
  }

  const [tagLabels, setTagLabels] = useState([]);

  return (
    <>
      <Toast ref={toastRef} body="Could not add the item." />
      <button type="button"
              onClick={showModal}
              className="btn btn-primary mb-2">
        <svg xmlns="http://www.w3.org/2000/svg"
             width={16}
             height={16}
             fill="currentColor"
             className="bi bi-plus-lg"
             viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
        </svg>
        &nbsp;Add new item
      </button>
     <div className="modal fade"
          ref={modalRef}
          id="staticBackdrop"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
       <div className="modal-content">
        <div className="modal-header justify-content-start gap-2">
         <button type="button"
                 form="itemForm"
                 className="btn-close mx-0"
                 onClick={hideModal}
                 aria-label="Close"/>
         <h1 className="modal-title fs-5" id="staticBackdropLabel">
          Add new item
         </h1>
        </div>
        <div className="modal-body">
          <ItemForm itemFields={itemFields} reset={reset} handleSubmit={handleSubmit} />
        </div>
         <div className="modal-footer justify-content-start">
           <button type="button"
                   form="itemForm"
                   onClick={hideModal}
                   className="btn btn-secondary">
             Discard
           </button>
           <button type="submit"
                   form="itemForm"
                   className="btn btn-primary">
             Add
           </button>
         </div>
       </div>
      </div>
     </div>
    </>
  );
}
