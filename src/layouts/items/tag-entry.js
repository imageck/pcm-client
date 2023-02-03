import { useCallback, useState } from "react";
import useAxios from "axios-hooks";
import { components } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";
import debounce from "debounce-promise";

function Input({ children, ...props }) {
  return (
    <components.Input {...props} minLength={3} maxLength={35}>
      {children}
    </components.Input>
  );
}

export default function TagEntry({ labels, setLabels }) {
  let [{ data, loading, error, response }, refetch] =
    useAxios({ url: "tags", method: "GET" }, { manual: true });

  const [currentTag, setCurrentTag] = useState('');

  function createTag(label) {
    return ({
      label,
      value: label
    });
  }

  function getTags(currentTag) {
    if (currentTag.length < 3) return;
    return refetch({ params: { q: currentTag } })
      .then(res => res.data.map(t => ({ label: t._id, value: t._id })))
      .catch(err => console.error(err.message));
  }

  const debouncedTags = useCallback(debounce(getTags, 1000), []);

  function handleKeyDown(e) {
    if (!currentTag) return;
    switch (e.key) {
      case ',': case ' ':
        if (currentTag.length > 2 && labels.length <= 10) {
          if (!labels.find(({ value }) => value === currentTag)) {
            setLabels(prev => [...prev, createTag(currentTag.toLowerCase())]);
            //setTags(prev => [...prev, currentTag.toLowerCase()]);
          }
          setCurrentTag('');
        }
        e.preventDefault();
        break;
    }
  }

  return (
    <AsyncCreatableSelect cacheOptions
                          loadOptions={debouncedTags}
                          components={{ DropdownIndicator: null, Input }}
                          form="newItemForm"
                          inputValue={currentTag}
                          isClearable
                          isMulti
                          menuPlacement="top"
                          hideSelectedOptions={true}
                          noOptionsMessage={() => null}
                          onChange={v => setLabels(v)}
                          closeMenuOnSelect={true}
                          isValidNewOption={t => t.length > 2
                                                 && labels.length <= 10}
                          onInputChange={v => setCurrentTag(v)}
                          onKeyDown={handleKeyDown}
                          placeholder="Add up to 10 tags."
                          value={labels}
                          className="mt-4" />
  );
}
