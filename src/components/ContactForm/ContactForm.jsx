import { useState } from 'react';
// import { nanoid } from 'nanoid';
import { PropTypes } from 'prop-types';
import css from 'components/ContactForm/ContactForm.module.css';

export const Form = ({ addContact, checkEqualContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        return;
    }

    // this.setState({ [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (checkEqualContacts(e)) {
      alert(`${name} already in contacts`);
      return;
    }
    addContact(name, number);
    // const { name, number } = this.state;
    // const newContact = {
    //   id: nanoid(),
    //   name,
    //   number,
    // };
    // this.props.addContact(newContact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  // const { name, number } = this.state;

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.label}>
        Name
        <input
          type="text"
          className={css.input}
          value={name}
          onChange={handleChange}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        Number
        <input
          type="tel"
          className={css.input}
          value={number}
          onChange={handleChange}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit" className={css.inputBtn}>
        Add contact
      </button>
    </form>
  );
};

export default Form;

Form.propTypes = {
  addContact: PropTypes.func.isRequired,
};