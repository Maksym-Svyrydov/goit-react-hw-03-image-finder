import { LoarMoreBtn } from '../ButtonLoadMore/button.styled';
import PropTypes from 'prop-types';
export const LoadMore = ({ onLoadMore }) => {
  return (
    <LoarMoreBtn type="button" onClick={onLoadMore}>
      Load More...
    </LoarMoreBtn>
  );
};
LoadMore.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
