import { Item, Img } from '../ImageGalleryItem/ImageGalleryItem.styled';

export const ImageItem = ({ webformatURL, largeImageURL, openModal }) => {
  return (
    <Item>
      <Img src={webformatURL} alt="" onClick={() => openModal(largeImageURL)} />
    </Item>
  );
};
