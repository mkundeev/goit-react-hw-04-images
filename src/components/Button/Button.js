import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({loadMore}) {
  return (<button type="button" className={s.button} onClick={loadMore}>
      <span className={s.buttonLabele}>Load more</span>
    </button>)
}
Button.propTypes = {
    loadMore:PropTypes.func.isRequired,
} 
export default Button