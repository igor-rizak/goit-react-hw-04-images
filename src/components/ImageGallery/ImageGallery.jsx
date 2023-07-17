import PropTypes from "prop-types";
import css from "./imageGallery.module.css"
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";


export const ImageGallery = ({gallery, modalOpen}) => {

    return (
        <ul className={css.gallery}>
            <ImageGalleryItem gallery={gallery} modalOpen={modalOpen} />
        </ul>
    )
} 

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  modalOpen: PropTypes.func.isRequired,
};