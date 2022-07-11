import PropTypes from 'prop-types';
import { ListItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ imageURL, onClick }) => {
    return (
        <ListItem>
            <Image
                src={imageURL}
                alt='pixabay'
                onClick={onClick}
            />
        </ListItem>
    )
}

ImageGalleryItem.propTypes = {
    imageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

export default ImageGalleryItem;