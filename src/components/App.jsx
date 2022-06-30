import React from "react";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";


class App extends React.Component{
  state = {
    search: '',
}
  onHendlSearch = search => {
    this.setState({ search });
}


  render(){
     return (
    <div>
         <Searchbar onSearch={this.onHendlSearch} />
         <ImageGallery search={this.state.search} />
    </div>
  );
  }
}


export {App}
