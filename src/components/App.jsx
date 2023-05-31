import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

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

  const checkEqualContacts = e => {
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
        // onSubmit={formSubmitHandler}
        addContact={addContact}
        checkEqualContacts={checkEqualContacts}
      />
      <Filter filter={filter} onChange={handleChange} />
      <h2>Contacts</h2>
      <ContactList visibleNames={visibleNames} deleteContact={deleteContact} />
    </div>
  );
};

// componentDidMount() {
//   const contacts = localStorage.getItem('contacts');
//   const parsedContacts = JSON.parse(contacts);
//   if (parsedContacts) {
//     this.setState({ contacts: parsedContacts });
//   }
// }
// componentDidUpdate(_, prevState) {
//   if (this.state.contacts !== prevState.contacts) {
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
// }

// const normalizedNames = this.state.filter.toLocaleLowerCase();
