import { ImageItem } from '../ImageGalleryItem/ImageGalleryItem';
import { List } from '../ImageGallery/ImageGallery.styled';
export const ImageGallery = ({ images, openModal }) => {
  return (
    <List>
      {images.map(image => (
        <ImageItem
          key={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          openModal={openModal}
        />
      ))}
    </List>
  );
};

export default ImageGallery;
