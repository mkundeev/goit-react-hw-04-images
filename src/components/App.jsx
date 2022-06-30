import {useState} from "react";
import { ToastContainer} from 'react-toastify';
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";


function App() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1);
  

     return (
    <div>
         <Searchbar onSearch={setSearch} changePage={setPage} />
         <ImageGallery search={search} page={page} changePage={setPage} />
         <ToastContainer autoClose={2000}/>
    </div>
  );
  
}


export {App}
