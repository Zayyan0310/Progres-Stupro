import PropTypes from 'prop-types';

const Image = ({ src, style }) => {
    return (

        <img src={src} className={`w-full h-full object-cover rounded-lg ${style}`} />

    );
};

Image.propTypes = {
    src: PropTypes.string,
    style: PropTypes.string,
};

export { Image };