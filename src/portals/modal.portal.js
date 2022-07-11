import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const modalPortal = (Component) => {
    return (
        createPortal(
            Component,
            modalRoot
        )
    )
}