import { useState } from "react";

function ThreeFields({ name }) {
  let f = [];
  for (let i = 1; i <= 3; i++)
    f.push(
      <input type="text"
             name={name+i}
             key={name+i}
             placeholder={name+i}
             maxLength={50}
             className="form-control itemFields" />
    );
  return (
    <div className="vstack gap-2">
     {f}
    </div>
  );
}

export default function ExtraFields(props) {
  const [fieldBtn, setFieldBtn] = useState("btn-outline-primary");

  function clearFields(e) {
    document.querySelectorAll(".itemFields").forEach(e => e.value='');
  }

  function saveFields(e) {
    let itemFields = {};
    document.querySelectorAll(".itemFields").forEach(e => {
      if (e.value)
        itemFields[e.name] = e.value;
    })
    props.setItemFields(itemFields);
    setFieldBtn("btn-primary");
  }

  return (
    <>
     <button type="button" className={"btn rounded " + fieldBtn}
             data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Configure additional fields
     </button>
     <div className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
       <div className="modal-content">
        <div className="modal-header justify-content-start gap-2">
         <button type="button"
                 className="btn-close mx-0"
                 onClick={clearFields}
                 data-bs-dismiss="modal"
                 aria-label="Close"/>
         <h1 className="modal-title fs-5" id="staticBackdropLabel">
          Configure additional fields
         </h1>
        </div>
        <div className="modal-body">
         <p>You are free to add up to 15 custom fields; 3 per each of the following types. Just fill in their names and save. Any item that you add to this collection later will inherit these fields.</p>
         <div className="accordion" id="itemFields">
          <div className="accordion-item">
           <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne">
             Numbers
            </button>
           </h2>
           <div id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#itemFields">
            <div className="accordion-body">
             <ThreeFields name="num" />
            </div>
           </div>
          </div>
          <div className="accordion-item">
           <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo">
             Text
            </button>
           </h2>
           <div id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#itemFields">
            <div className="accordion-body">
               <p>Up to 50 characters are allowed.</p>
               <ThreeFields name="str" />
              </div>
            </div>
          </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree">
       Multiline text
      </button>
     </h2>
     <div id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#itemFields">
      <div className="accordion-body">
       <p>Up to 255 characters are allowed. Markdown is supported. Displayed on individual item page only.</p>
       <ThreeFields name="text" />
      </div>
    </div>
  </div>
  <div className="accordion-item">
  <h2 className="accordion-header" id="headingFour">
    <button
      className="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseFour"
      aria-expanded="false"
      aria-controls="collapseFour"
    >
      Dates
    </button>
  </h2>
  <div
    id="collapseFour"
    className="accordion-collapse collapse"
    aria-labelledby="headingFour"
    data-bs-parent="#itemFields"
  >
    <div className="accordion-body">
     <ThreeFields name="date" />
    </div>
  </div>
</div>
<div className="accordion-item">
  <h2 className="accordion-header" id="headingFive">
    <button
      className="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseFive"
      aria-expanded="false"
      aria-controls="collapseFive"
    >
      Checkboxes
    </button>
  </h2>
  <div
    id="collapseFive"
    className="accordion-collapse collapse"
    aria-labelledby="headingFive"
    data-bs-parent="#itemFields"
  >
    <div className="accordion-body">
     <ThreeFields name="check" />
    </div>
  </div>
</div>

</div>

         </div>
         <div className="modal-footer justify-content-start">
          <button type="button"
                  className="btn btn-secondary"
                  onClick={clearFields}
                  data-bs-dismiss="modal">
           Discard
          </button>
          <button type="button"
                  onClick={saveFields}
                  className="btn btn-primary"
                  data-bs-dismiss="modal">
           Save fields & continue
          </button>
         </div>
        </div>
       </div>
      </div>
    </>
  );
}
