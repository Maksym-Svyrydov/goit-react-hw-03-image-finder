import { LoarMoreBtn } from '../ButtonLoadMore/button.styled';

export const LoadMore = ({ onLoadMore }) => {
  return (
    <LoarMoreBtn type="button" onClick={onLoadMore}>
      Load More...
    </LoarMoreBtn>
  );
};
