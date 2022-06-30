import PropTypes from 'prop-types';
import { useState } from 'react';

import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default function Searchbar({ onSearch, changePage }) {
  const [search, setSearch] = useState('');

  const onChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };
  const onSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      toast.error('Please enter search request', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    onSearch(search);
    changePage(1);
    setSearch('');
  };

  return (
    <header className={s.searhbar}>
      <form className={s.form} onSubmit={onSubmit}>
        <input
          className={s.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          onChange={onChange}
          value={search}
          placeholder="Search images and photos"
        />
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};
