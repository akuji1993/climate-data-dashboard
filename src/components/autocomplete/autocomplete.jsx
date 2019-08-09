import React from "react";
import style from "./autocomplete.module.scss";
import PropTypes from "proptypes";

class AutoComplete extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.onSuggestionClick = this.onSuggestionClick.bind(this);

    this.state = {
      inputValue: "",
      filteredOptions: []
    };
  }

  handleChange(inputValue) {
    const { options } = this.props;
    this.setState({
      inputValue,
      filteredOptions: options.filter(
        opt => opt.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
    });
  }

  onSuggestionClick(selectedOption) {
    const { onChange } = this.props;
    this.setState({
      inputValue: "",
      filteredOptions: []
    });
    onChange(selectedOption.code);
  }

  render() {
    const { inputValue, filteredOptions } = this.state;
    return (
      <div className={style.AutoComplete}>
        <input
          className={style.input}
          type="text"
          value={inputValue}
          onChange={event => this.handleChange(event.target.value)}
        />
        {inputValue.length > 3 && (
          <div className={style.suggestions}>
            {filteredOptions.map((opt, idx) => (
              <div
                onClick={() => this.onSuggestionClick(opt)}
                key={`suggestion-${opt.code}-${idx}`}
                className={style.suggestion}>
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

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
