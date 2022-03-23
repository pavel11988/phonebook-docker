import React from 'react';
import { useState, useEffect } from 'react';
import shortid from 'shortid';

import { Container } from './Container/Containet.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkDuplicateContact = checkName => {
    return contacts.find(contact => contact.name === checkName);
  };

  const addContact = (name, tel) => {
    if (checkDuplicateContact(name))
      return alert(
        'Warning! A contact with this name already exists in the contact book! '
      );
    const contact = {
      id: shortid.generate(),
      name: name,
      tel: tel,
    };
    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = contactId => {
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(newContacts);
  };

  const changeFilter = event => {
    const value = event.currentTarget.value;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}
