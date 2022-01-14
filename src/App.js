import { useState, useEffect, useMemo } from "react";
import "./App.css";
import { Container } from "./App.styled";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

function App() {
  const [contacts, setContacts] = useState(() => loadContacts() ?? []);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  function loadContacts() {
    return JSON.parse(localStorage.getItem("contacts"));
  }

  const saveContacts = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const handleInputChange = (value) => {
    setFilter(value);
  };

  const onContactsFilter = (array, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return array.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const findDuplicateContact = (array, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return array.filter(
      (contact) => contact.name.toLowerCase() === normalizedFilter
    );
  };

  const handleAddContact = (contact) => {
    const { name } = contact;
    const filteredArray = findDuplicateContact(contacts, name);
    if (filteredArray.length > 0) {
      alert(`${name} is already in contacts.`);
    } else {
      setContacts((arr) => [...arr, contact]);
    }
  };

  const deleteContact = (contactId) => {
    setContacts((arr) => arr.filter(({ id }) => id !== contactId));
  };

  const filteredArray = useMemo(
    () => onContactsFilter(contacts, filter),
    [contacts, filter]
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleInputChange={handleInputChange} />
      <ContactList contacts={filteredArray} deleteContact={deleteContact} />
    </Container>
  );
}

export default App;
