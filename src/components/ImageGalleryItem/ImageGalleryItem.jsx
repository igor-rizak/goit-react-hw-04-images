import PropTypes from "prop-types";
import css from "./imageGalleryItem.module.css"

export const ImageGalleryItem = ({ gallery, modalOpen }) => {
    return gallery.map(({ id, largeImageURL, webformatURL, tags }) => (
        < li key={id} className={css.galleryItem} onClick={() => {
            modalOpen(largeImageURL, tags)
        }}>
            <img src={webformatURL} alt={tags} className={css.image}/>
        </li >
    ));
}

ImageGalleryItem.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};