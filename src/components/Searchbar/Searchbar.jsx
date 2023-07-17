import { useState } from "react";
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import css from "./searchbar.module.css"

export const Searchbar = ({handleChange}) => {
    const [q, setQ] = useState('');
    
    const handleSubmit = async e => {
        e.preventDefault();
        const query = e.target.elements[1].value.trim();
        if (query === '') {
            return toast.error('Please enter key words for search');
        } else {
            handleChange(query);
            setQ(query)
        }
    }

        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <button type="submit" className={css.button}>
                        <span className={css.buttonLabel}></span>
                    </button>

                    <input
                        className={css.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        defaultValue={q}
                        onSubmit={handleChange}
                    />
                </form>
            </header>
        );
    }

Searchbar.propTypes = {
  handleChange: PropTypes.func.isRequired
};