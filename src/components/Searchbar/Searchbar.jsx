import { Component } from "react";
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import css from "./searchbar.module.css"

export class Searchbar extends Component {
    state = {
        q: '',
    }

    handleSubmit = async e => {
        e.preventDefault();
        const query = e.target.elements[1].value.trim();
        if (query === '') {
            return toast.error('Please enter key words for search');
        } else {
            this.props.handleChange(query);
        this.setState({ q: query })
        }
    }

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.button}>
                        <span className={css.buttonLabel}></span>
                    </button>

                    <input
                        className={css.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        defaultValue={this.state.q}
                        onSubmit={this.handleChange}
                    />
                </form>
            </header>
        );
    }
}

Searchbar.propTypes = {
  handleChange: PropTypes.func.isRequired
};