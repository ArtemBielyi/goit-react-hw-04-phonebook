import React from 'react';
import css from 'components/Filter/Filter.module.css';
import { PropTypes } from 'prop-types';

export const Filter = ({ filter, onChange }) => (
  <div className={css.filterContainer}>
    <label htmlFor="filter" className={css.label}>
      Filter
      <input
        type="text"
        className={css.input}
        id="filter"
        value={filter}
        onChange={onChange}
      />
    </label>
  </div>
);

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
