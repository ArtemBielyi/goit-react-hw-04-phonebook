import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  checkEqualContacts = e => {
    return this.state.contacts.find(
      contact =>
        contact.name.toLowerCase() ===
        e.target.elements.name.value.toLowerCase()
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const normalizedNames = this.state.filter.toLocaleLowerCase();

    const visibleNames = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedNames)
    );
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Form
          onSubmit={this.formSubmitHandler}
          addContact={this.addContact}
          checkEqualContacts={this.checkEqualContacts}
        />
        <Filter value={this.state.filter} onChange={this.handleChange} />
        <h2>Contacts</h2>
        <ContactList
          contacts={visibleNames}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
