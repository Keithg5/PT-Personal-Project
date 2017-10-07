import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Grid } from 'react-bootstrap';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        }
    }
    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            searchInput: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.searchInput);
        this.props.onSearchSubmit(this.state.searchInput);
    }
    render() {
        return (
            <Grid className="searchPanel">
                <form onSubmit={ this.handleSubmit }>
                    <FormGroup
                        controlId="formControlsTextarea"
                        value={ this.state.searchInput }
                        onChange={ this.handleInputChange }>
                        <ControlLabel>Search:</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="Enter Search Item" />
                    </FormGroup>
                    <Button bsStyle="primary" type="submit">
                        SEARCH
                    </Button>
                </form>
            </Grid>
        );
    }
}