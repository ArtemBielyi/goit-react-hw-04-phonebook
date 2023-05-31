import React from 'react';
import css from 'components/Filter/Filter.module.css';
import { PropTypes } from 'prop-types';

export const Filter = ({ filter, onChange }) => (
  <label htmlFor="filter">
    Filter
    <input
      type="text"
      className={css.input}
      id="filter"
      value={filter}
      onChange={onChange}
    />
  </label>
);

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
