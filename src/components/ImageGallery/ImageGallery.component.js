import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

const ImageGallery = ({ imageList, openModal }) => {
    return (
        <ImageList>
            {
                imageList.map(({ id, webformatURL, largeImageURL }) => {
                    const openModalBinded = openModal.bind(null, largeImageURL);

                    return (
                            <ImageGalleryItem
                                key={id}
                                imageURL={webformatURL}
                                onClick={openModalBinded}
                            />
                        )
                })
            }
        </ImageList>
    )
}

ImageGallery.propTypes = {
    imageList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired
        })
    ),
    openModal: PropTypes.func
}

export default ImageGallery;