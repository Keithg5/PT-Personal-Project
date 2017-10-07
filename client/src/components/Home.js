import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
    return (
        <div className="userForm">
            <h1 style={{'fontWeight':800, 'marginBottom':50}}>React Image Search App</h1>
            <Link to={'/signup'}>
                <Button 
                    bsStyle="primary" 
                    bsSize="large" 
                    block 
                    style={{'marginBottom': 60}}>
                        SIGN UP
                </Button>
            </Link>
            <Link to={'/signin'}>
                <Button bsStyle="primary" bsSize="large" block>SIGN IN</Button>
            </Link>
        </div>
    )
}

export default Home;