import PropTypes from "prop-types";
import { Field } from "./Filter.styled";

function Filter({ filter, handleInputChange }) {
  const handleChange = (value, callback) => {
    callback(value);
  };

  return (
    <Field>
      <span>Find contacts by name</span>
      <input
        type="search"
        name="filter"
        required
        onChange={(event) => {
          const { value } = event.target;
          handleChange(value, handleInputChange);
        }}
        value={filter}
      />
    </Field>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Filter;
