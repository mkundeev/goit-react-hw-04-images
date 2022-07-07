import PropTypes from 'prop-types';
import React from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ url, data, onClick }) {
  const onOpen = e => {
    onClick(data);
  };

  return <img src={url} alt="" className={s.galleryImg} onClick={onOpen} />;
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
