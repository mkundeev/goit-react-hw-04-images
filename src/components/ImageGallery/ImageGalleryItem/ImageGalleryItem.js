import PropTypes from 'prop-types';
import React from 'react';
import s from './ImageGalleryItem.module.css'


class ImageGalleryItem extends React.Component{
   

    onOpen = e => {
        this.props.onClick(this.props.data)
    }

    render() {   
       return <img src={this.props.url} alt="" className={s.galleryImg} onClick={this.onOpen} />
    }
}
ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    onClick:PropTypes.func.isRequired,
}  

export default ImageGalleryItem