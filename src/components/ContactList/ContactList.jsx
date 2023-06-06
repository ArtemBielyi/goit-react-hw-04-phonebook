import { PropTypes } from 'prop-types';
import css from 'components/ContactList/ContactList.module.css';

export const ContactList = ({ visibleNames, deleteContact }) => (
  <ul className={css.list}>
    {visibleNames().map(({ name, number, id }) => (
      <li key={id} className={css.listItem}>
        <p className={css.title}>{name}</p>
        <p>{number}</p>
        <button className={css.btn} onClick={() => deleteContact(id)}>
          delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
};
