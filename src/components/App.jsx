import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  const handleChange = e => {
    setFilter(e.currentTarget.value);
  };

  const checkDuplicateContacts = e => {
    return contacts.find(
      contact =>
        contact.name.toLowerCase() ===
        e.target.elements.name.value.toLowerCase()
    );
  };

  const visibleNames = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Form
        addContact={addContact}
        checkDuplicateContacts={checkDuplicateContacts}
      />
      <Filter filter={filter} onChange={handleChange} />
      {contacts.length > 0 ? (
        <>
          <h2 className={css.contactsTitle}>Contacts</h2>
          <ContactList
            visibleNames={visibleNames}
            deleteContact={deleteContact}
          />
        </>
      ) : (
        ''
      )}
    </div>
  );
};
