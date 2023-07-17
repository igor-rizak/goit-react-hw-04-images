import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import toast, { Toaster } from 'react-hot-toast';
import { restApi } from "../API/API"


export class App extends Component {
  state = {
    list: [],
    page: 1,
    query: '',
    isLoading: false,
    loadMore: false,
    modalData: null,
    isModalVisible: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.setState({ isLoading: true });
      try {
        const { hits, totalHits } = await restApi(query, page);
        if (hits.length === 0) {
          toast.error(
            'Sorry, nothing found. Try again'
          );
        }
        this.setState(prevState => ({
          list: [...prevState.list, ...hits],
          loadMore: this.state.page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleChange = query => {
    this.setState(prevState => {
      if (prevState.query === query) {
        return null
      } else {
        return { query, list: [], page: 1 };
      }
    });
  };

searchQuery = async() => {
    console.log(this.state.query);
    const data = await restApi(this.state.query);
    const images = data.hits;
    this.setState({list: images})   
  }

onClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  modalOpen =  (largeImage, tags) => {
    this.setState({ modalData: { largeImage, tags }, isModalVisible: true });
    document.body.classList.add('no-scroll');
  };

  modalClose = () => {
    this.setState({ isModalVisible: false, modalData: null });
    document.body.classList.remove('no-scroll');
  }

  render() {
    const { list, isLoading, loadMore, modalData, isModalVisible } = this.state;
    return (<div>
      <Searchbar handleChange={this.handleChange} />
      <Toaster />
      {list && (<ImageGallery gallery={list} modalOpen={this.modalOpen} />)}
      {isLoading && <Loader />}
      {loadMore && <Button onClick={this.onClickLoadMore} />}
      {isModalVisible && (<Modal modalData={modalData} modalClose={this.modalClose} />)}
    </div >
    );
  }
};