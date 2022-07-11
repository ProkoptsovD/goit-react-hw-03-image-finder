import { Component } from 'react';
import PropTypes from 'prop-types';
import { modalPortal } from 'portals';
import { Overlay, ModalWindow } from './Modal.styled';

class Modal extends Component {
    componentDidMount() {
        const { closeModal } = this.props;
        document.addEventListener('keydown', closeModal);
    }
    componentWillUnmount() {
        const { closeModal } = this.props;
        document.removeEventListener('keydown', closeModal);
    }
    render() {
        const { closeModal, imageURL } = this.props;

        return (
            modalPortal(
                <Overlay
                    onClick={closeModal}
                >
                    <ModalWindow>
                        <img src={imageURL} alt="pixabay" />
                    </ModalWindow>
                </Overlay>
            )
        )
    }
}

Modal.propTypes = {
    imageURL: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired
}

export default Modal;