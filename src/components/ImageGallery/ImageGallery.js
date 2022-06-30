import PropTypes from 'prop-types';
import React from 'react';
import axios from "axios";
import s from './ImageGallery.module.css'
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { axiosCongif } from 'config/axiosConfig';

const { API_KEY, url, options } = axiosCongif;



class ImageGallery extends React.Component {
    state = {
        searchResults: [],
        page: 1,
        status: 'idle',
        showModal: false,
        modalUrl: '',
        totalpages: 0,
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.page > prevState.page) {
            this.setState({ status: 'pending' })
            axios(`${url}?q=${this.props.search}&page=${this.state.page}&key=${API_KEY}${options}`).then(({ data }) => this.setState((prevState) => ({ searchResults: [...prevState.searchResults, ...data.hits], status: 'resolved' })))
             
        }
        if (this.props.search !== prevProps.search) {
            this.setState({ searchResults: [], page: 1, })
            this.setState({ status: 'pending' })
            axios(`${url}?q=${this.props.search}&page=1&key=${API_KEY}${options}`).then(({ data }) => this.setState({ searchResults: data.hits, status: 'resolved',totalpages: Math.ceil(data.totalHits/12) }))
        
        }
        window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
        })
        
       
    }


    

    loadMore = () => {
       
        this.setState((prevState) => {
            return {
                page: prevState.page + 1
            };
        });
     
    };

    openModal = url => {
        this.setState({
            showModal: !this.state.showModal,
            modalUrl: url
        });
        
    }

    handleToggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
       return <>
            
             <>
                <ul className={s.gallery}>
                    {this.state.searchResults.map(({ id, webformatURL, largeImageURL }) => {
                        return <li key={id} className={s.item}>
                            <ImageGalleryItem url={webformatURL} data={largeImageURL} onClick={this.openModal} />
                        </li>
                    })}
                </ul>
                {this.state.showModal && <Modal onCloseRequest={this.handleToggleModal}> <img src={this.state.modalUrl} alt="" /> </Modal>}
           </>
           {this.state.status === 'resolved' && this.state.page !== this.state.totalpages && <Button loadMore={this.loadMore} />}
           {this.state.status === 'pending' && <Loader />}
        </>
        
    }
}
ImageGallery.propTypes = {
    search: PropTypes.string.isRequired,

} 


export default ImageGallery