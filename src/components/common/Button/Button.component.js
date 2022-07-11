import PropTypes from 'prop-types';
import Loader from '../Loader';
import { Btn } from './Button.styled';

const Button = ({ children, onClick, showLoader, disabled }) => {
    return (
        <Btn
            onClick={onClick}
            disabled={disabled}
        >
            { showLoader && <Loader type='spinner' />}
            {children}
        </Btn>
    )
};

Button.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
    showLoader: PropTypes.bool,
    disabled: PropTypes.bool
}

export default Button;