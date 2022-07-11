import PropTypes from 'prop-types';
import { CSSLoader } from './Loader.styled';

const loaderTypes = {
    'dual-rings': 1,
    'spinner': 12,
}

const Loader = ({ type }) => {
    return (
        <CSSLoader type={type}>
            {
                loaderTypes[type] > 1 && Array.from({ length: loaderTypes[type]}, (_, index) => <div key={index}></div>)
            }
        </CSSLoader>
    )
}

Loader.propTypes = {
    type: PropTypes.string.isRequired
}

export default Loader;