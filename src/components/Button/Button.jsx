import PropTypes from 'prop-types'
import css from "./button.module.css";

export const Button = ({ onClick }) => {
    return (
    <button className={css.bload} type="button" onClick={onClick}>Load more</button>
)
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired
};