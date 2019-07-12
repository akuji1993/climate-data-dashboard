import React, { useState, useEffect } from "react";
import style from "./autocomplete.module.scss";
import PropTypes from "proptypes";

const AutoComplete = props => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    const { options } = props;
    return () => {
      if (inputValue.length > 3) {
        setFilteredOptions(
          options.filter(
            opt =>
              opt.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
          )
        );
      }
    };
  }, [inputValue, props]);

  const onSuggestionClick = selectedOption => {
    const { onChange } = props;
    setInputValue("");
    setFilteredOptions([]);
    onChange(selectedOption.code);
  };

  return (
    <div className={style.AutoComplete}>
      <input
        type="text"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      {inputValue.length > 3 && (
        <div className={style.suggestions}>
          {filteredOptions.map((opt, idx) => (
            <div
              onClick={() => onSuggestionClick(opt)}
              key={`suggestion-${opt.code}-${idx}`}
              className={style.suggestion}>
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

AutoComplete.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      label: PropTypes.string
    })
  ),
  onChange: PropTypes.func.isRequired
};

export default AutoComplete;
