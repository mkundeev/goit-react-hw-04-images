import PropTypes from 'prop-types';
import React from 'react';
import s from './Searchbar.module.css'



class Searchbar extends React.Component{
state={
search: '',
}

  onChange = e => {
    this.setState({ search: e.currentTarget.value.toLowerCase() })
    
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      return
    }

    this.props.onSearch(this.state.search);
    this.setState({ search: '' });

  };

  render() {
     return (<header className={s.searhbar}>
  <form className={s.form} onSubmit={this.onSubmit}>
    <input
      className={s.input}
           type="text"
           name='search'
      autoComplete="off"
           autoFocus
           onChange={this.onChange}
           value={this.state.search}
      placeholder="Search images and photos"
        />
    <button type="submit" className={s.button}>
      <span className={s.buttonLabel}  >Search</span>
    </button>
  </form>
</header>)
  }
}
Searchbar.propTypes = {
    onSearch:PropTypes.func.isRequired,
} 

export default Searchbar