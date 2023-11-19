import PropTypes from 'prop-types';

const ImageCell = ({ value }) => (
  <img
    src={`./src/server/uploads/${value}`} 
    alt="Bike"
    style={{ maxWidth: '200px', maxHeight: '60px' }}
    onError={(e) => console.error('Error loading image:', e.target.src)}
  />
);

ImageCell.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ImageCell;
