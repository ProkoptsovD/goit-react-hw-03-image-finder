import PropTypes from 'prop-types';
import { ListItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, imageURL, onClick }) => {
    return (
        <ListItem key={id}>
            <Image
                src={imageURL}
                alt='pixabay'
                onClick={onClick}
            />
        </ListItem>
    )
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

export default ImageGalleryItem;