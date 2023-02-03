import { useState } from "react";
import ReactMarkdown from "react-markdown";
import TagEntry from "./tag-entry";

export default function ItemForm({ itemFields, edit=true, reset='', item={}, handleSubmit }) {
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);

  let controls = [];
  for (let [f, n] of Object.entries(itemFields)) {
    if (f.startsWith("num")) controls.push(
      <div className="form-floating">
        <input type="number"
               id={f}
               name={f}
               key={f}
               readOnly={!edit}
               defaultValue={item[f]}
               placeholder=''
               required
               inputMode="decimal"
               step={0.01}
               className="form-control"/>
        <label htmlFor={f}>{n}</label>
      </div>
    )
    if (f.startsWith("str")) controls.push(
      <div className="form-floating">
        <input type="text"
               id={f}
               name={f}
               key={f}
               readOnly={!edit}
               defaultValue={item[f]}
               placeholder=''
               required
               maxLength={100}
               className="form-control"/>
        <label htmlFor={f}>{n}</label>
      </div>
    )
    if (f.startsWith("text")) controls.push(
      <div className="form-floating">
        <textarea id={f}
                  name={f}
                  key={f}
                  readOnly={!edit}
                  placeholder=''
                  required
                  maxLength={255}
                  value={item[f]}
                  onChange={e => setText(e.target.value)}
                  className="form-control"/>
        <label htmlFor={f}>{n}</label>
        <ReactMarkdown children={text ? text : "Markdown preview"}
                       className="align-items-start markdown-preview w-auto border-info-subtle input-group-text"
        />
      </div>
    )
    if (f.startsWith("date")) controls.push(
      <div className="form-floating">
        <input type="date"
               id={f}
               name={f}
               key={f}
               readOnly={!edit}
               defaultValue={item[f]}
               placeholder=''
               required
               className="form-control"/>
        <label htmlFor={f}>{n}</label>
      </div>
      )
    if (f.startsWith("check")) controls.push(
      <div className="form-check">
        <input type="checkbox"
               id={f}
               name={f}
               key={f}
               disabled={!edit}
               defaultChecked={item[f]}
               value='1'
               className="form-check-input"/>
        <label htmlFor={f} className="form-check-label">{n}</label>
      </div>
      )
  }

  return (
    <form onSubmit={handleSubmit} id="itemForm" key={reset} autoComplete="off"
          className="vstack mt-4 gap-4">
      <div className="form-floating">
        <input type="text"
               id="name"
               name="name"
               readOnly={!edit}
               defaultValue={item.name}
               placeholder=''
               autoFocus
               required
               maxLength={100}
               className="form-control"/>
        <label htmlFor="name">Name</label>
      </div>
      {controls.length > 0 && controls}
      <TagEntry labels={tags} setLabels={setTags} />
    </form>
  );
}
