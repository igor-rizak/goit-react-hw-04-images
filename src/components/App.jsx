import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import toast, { Toaster } from 'react-hot-toast';
import { requestApi } from "../API/API"


export const App = () => {

  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      if (page !== 1 || query !== '') {
        setIsLoading(true);
        try {
          const { hits, totalHits } = await requestApi(query, page);
          if (hits.length === 0) {
            toast.error('Sorry, nothing found. Try again');
          }
          setList(prevState => [...prevState, ...hits]);
          setLoadMore(page < Math.ceil(totalHits / 12));
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
  }, [page, query]);

  const handleChange = (query) => {
    if (query === '') {
      setQuery('');
      setList([]);
      setPage(1);
    } else {
      setQuery(query);
      setList([]);
      setPage(1);
    }
  };

  const onClickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const modalOpen =  (largeImage, tags) => {
    setModalData({ largeImage, tags });
    setIsModalVisible(true);
    document.body.classList.add('no-scroll');
  };

  const modalClose = () => {
    setModalData(null);
    setIsModalVisible(false);
    document.body.classList.remove('no-scroll');
  }

  return (
    <div>
      <Searchbar handleChange={handleChange} />
      <Toaster />
      {list.length > 0 && (<ImageGallery gallery={list} modalOpen={modalOpen} />)}
      {isLoading && <Loader />}
      {loadMore && <Button onClick={onClickLoadMore} />}
      {isModalVisible && (<Modal modalData={modalData} modalClose={modalClose} />)}
    </div>
  );
};