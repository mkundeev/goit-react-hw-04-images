import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { axiosCongif } from 'config/axiosConfig';

function ImageGallery({ search, page, changePage }) {
  const { API_KEY, url, options } = axiosCongif;
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!search) {
      return;
    }
    setStatus('pending');
    axios(`${url}?q=${search}&page=${page}&key=${API_KEY}${options}`).then(
      ({ data }) => {
        setSearchResults(
          page > 1 ? [...searchResults, ...data.hits] : data.hits
        );
        setStatus('resolved');
        page === 1 && setTotalPages(Math.ceil(data.totalHits / 12));
      }
    );
  }, [search, page, options, API_KEY, url]);

  const loadMore = () => {
    changePage(page + 1);
  };

  const openModal = url => {
    setModalUrl(url);
    setShowModal(!showModal);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <>
        <ul className={s.gallery}>
          {searchResults.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <li key={id} className={s.item}>
                <ImageGalleryItem
                  url={webformatURL}
                  data={largeImageURL}
                  onClick={openModal}
                />
              </li>
            );
          })}
        </ul>
        {showModal && (
          <Modal onCloseRequest={handleToggleModal}>
            {' '}
            <img src={modalUrl} alt="" />{' '}
          </Modal>
        )}
      </>
      {status === 'resolved' && page !== totalPages && (
        <Button loadMore={loadMore} />
      )}
      {status === 'pending' && <Loader />}
    </>
  );
}

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default ImageGallery;
