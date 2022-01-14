import { useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { Container, Field } from "./ContactForm.styled";

function ContactForm({ handleAddContact }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (value, name) => {
    if (name === "name") setName(value);
    if (name === "number") setNumber(value);
  };

  const onAddContact = (callback) => {
    callback({
      id: nanoid(),
      name: name,
      number: number,
    });
    setName("");
    setNumber("");
  };

  const isInputNameEmpty = !name;
  const isInputNumberEmpty = !number;

  return (
    <Container>
      <Field>
        <label>Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={(event) => {
            const { value, name } = event.currentTarget;
            handleChange(value, name);
          }}
          value={name}
        />
      </Field>

      <Field>
        <label>Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={(event) => {
            const { value, name } = event.currentTarget;
            handleChange(value, name);
          }}
          value={number}
        />
      </Field>

      <button
        type="button"
        name="add"
        onClick={() => onAddContact(handleAddContact)}
        disabled={isInputNameEmpty || isInputNumberEmpty}
      >
        Add contact
      </button>
    </Container>
  );
}

ContactForm.propTypes = {
  handleAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
