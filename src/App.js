import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Card from "./components/Card"

const MOVIE = "movie";
const TV = "tv";
const IMAGE_URL  = "http://image.tmdb.org/t/p/w185";
const apiKey = `${process.env.REACT_APP_ENTERTAINMENT_API_KEY}`;

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      type: MOVIE,
      query: ""
    }

    this.loadContent = this.loadContent.bind(this);
    this.searchContent = this.searchContent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadContent(this.state.type);
  }

  loadContent(type) {
    let url = "https://api.themoviedb.org/3/";
    if (type === MOVIE) url += "movie/popular?api_key=" + apiKey + "&language=en-US&page=1";
    else if (type === TV) url += "tv/popular?api_key=" + apiKey + "&language=en-US&page=1";
    
    axios.get(url)
      .then(res => {
        const results = res.data.results;
        this.setState({
          content: results
        });
      })
  }

  searchContent(query) {
    let url = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&query=" + query + "&page=1&include_adult=false";    
    
    axios.get(url)
      .then(res => {
        const results = res.data.results;
        this.setState({
          content: results
        });
      })
  }

  handleClick(e) {
    const newType = e.target.value;
    this.loadContent(newType);
    this.setState({type: newType});
  }

  handleChange(e) {
    const newQuery = e.target.value;
    this.setState({query: newQuery});
  }

  handleSubmit(e) {
    const query = this.state.query;
    if (query !== '') {
      this.searchContent(query);
    }
    e.preventDefault();
  }

  render() {
    const cards = this.state.content.map( (element, i) => {
      return (
        <Card name={element.title === undefined ?  element.name : element.title } imageUrl={IMAGE_URL + element.poster_path} key={i} />
      );
    });
    
    return (
      <div className="App">
        <header className="App-header">
          Entertainment Repository
        </header>
        <form onSubmit={this.handleSubmit} className="search-form">
          <input type="text" onChange={this.handleChange} className="search-input" placeholder="Type the name of a movie or a tv show" />
          <button className="submit-btn">Search</button>
        </form>
        <div className="select-btns">
          <button className="select-btn" value={MOVIE} onClick={this.handleClick}>Movies</button>
          <button className="select-btn" value={TV} onClick={this.handleClick}>Television</button>
        </div>
        <div className="cards">
            {cards}
        </div>
      </div>
    );
  }
}

export default App;
