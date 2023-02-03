import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function InputFields({ itemFields, readOnly }) {
  let inputs = [];
  for (let [f, n] of Object.entries(itemFields)) {
    if (f.startsWith("num"))
      inputs.push(<NumberForm key={f} name={f} label={n} readOnly={readOnly} />)
    if (f.startsWith("str"))
      inputs.push(<TextForm key={f} name={f} label={n} readOnly={readOnly} />)
    if (f.startsWith("text"))
      inputs.push(<TextareaForm key={f} name={f} label={n} readOnly={readOnly} />)
    if (f.startsWith("date"))
      inputs.push(<DateForm key={f} name={f} label={n} readOnly={readOnly} />)
    if (f.startsWith("check"))
      inputs.push(<CheckForm key={f} name={f} label={n} readOnly={readOnly} />)
  }
  return (
    <div className="vstack mt-4 gap-4">
      {inputs}
    </div>
  );
}

function NumberForm({ name, label, readOnly }) {
  return (
    <div className="form-floating">
      <input type="number"
             name={name}
             id={name}
             required
             placeholder=""
             readOnly={readOnly}
             className="form-control"/>
      <label htmlFor={name} className="form-label">{label}</label>
    </div>
  );
}

function TextForm({ name, label, readOnly }) {
  return (
    <div className="form-floating">
      <input type="text"
             name={name}
             id={name}
             required
             placeholder=""
             readOnly={readOnly}
             maxLength={100}
             className="form-control"/>
      <label htmlFor={name} className="form-label">{label}</label>
    </div>
  );
}

function TextareaForm({ name, label, readOnly }) {
  const [content, setContent] = useState('');
  return (
    <div className="form-floating">
      <textarea name={name}
                id={name}
                required
                maxLength={255}
                value={content}
                placeholder=""
                readOnly={readOnly}
                onChange={e => setContent(e.target.value)}
                className="form-control"/>
      <label htmlFor={name} className="form-label">{label}</label>
      <ReactMarkdown children={content ? content : "Markdown preview"}
                     className="align-items-start markdown-desc w-auto border-info-subtle input-group-text" />
    </div>
  );
}

function DateForm({ name, label, readOnly }) {
  return (
    <div className="form-floating">
      <input type="date"
             name={name}
             id={name}
             required
             readOnly={readOnly}
             className="form-control"/>
      <label htmlFor={name} className="form-label">{label}</label>
    </div>
  );
}

function CheckForm({ name, label, readOnly }) {
  return (
    <div className="form-check">
      <input type="checkbox"
             name={name}
             id={name}
             readOnly={readOnly}
             className="form-check-input"/>
      <label htmlFor={name} className="form-check-label">{label}</label>
    </div>
  );
}
