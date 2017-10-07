import React, { Component } from 'react';
import './App.css';
import { Well, Col, Grid } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import {BrowserRouter} from "react-router";

import axios from 'axios';

import SearchBar from './components/SearchBar';
import PixaBay from './components/PixaBay';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import UserPanel from './components/UserPanel';

class App extends Component {
  constructor() {
      super();
      this.state = {
          images: [],
          username: null,
          imagesScreen: false,
          userImages: [],
      }
  }
  
  componentDidMount() {
    console.log(this.state.username);
  }

  handleSearchChange = (term) => {    
    axios.post(`/api/${term}`)
    .then(res => {
      const urlArray = res.data.hits;
      const imagesArray = [];
      urlArray.forEach((hit) => {
        imagesArray.push(
          {
            _id: hit.id,
            url: hit.previewURL,
            imageURL: hit.webformatURL,
          }
        );
      });
      this.setState({
         images: imagesArray
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleSignUp = (user) => {
    axios.post('/users', user)
    .then(res => {
      this.setState({ 
        username: res.data.username,
        imagesScreen: true, 
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleSignIn = (user) => {
    axios.post('/users/login', user)
    .then(res => {
      if (res.data) {
        this.setState({ 
          username: res.data.username,
          userImages: res.data.userImages,
          imagesScreen: true
        });
      } else {
        alert('Incorrect Username or Password');
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    if (this.state.imagesScreen) {
      return (
        <Well className="App">
          <Grid style={{'paddingRight':30}}>
            <SearchBar onSearchSubmit = { this.handleSearchChange } />
            <Col xs={12} md={8} style={{'marginRight':80}}>
              <PixaBay images = { this.state.images } />
            </Col>
            <Col xs={12} md={3}>
              <UserPanel username = { this.state.username }/>
            </Col>
          </Grid>
        </Well>
      )
    }
    return (
      <Well className="App">
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route 
                    exact path="/signup" 
                    render={(props) => <SignUp onUserSubmit = { this.handleSignUp }/>} 
                />
                <Route 
                    exact path="/signin" 
                    render={(props) => <SignIn onUserSubmit = { this.handleSignIn }/>} 
                />
            </div>
        </Router>
      </Well>
    );
  }
}

export default App;
