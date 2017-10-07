import React, {Component} from 'react';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import '../App.css';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUserChange(event) {
        this.setState({
           username: event.target.value
        });
    }
    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        if (!username || !password) {
            alert ('Please provide Username and Password');
            return;
        }
        this.props.onUserSubmit({ username: username, password: password });
        this.setState({ username: '', password: '' });
    }
    render() {
        return (
            <form onSubmit={ this.handleSubmit } className="userForm">
                <FormGroup 
                    controlId="formControlsTextarea"
                    value={ this.state.username }
                    onChange={ this.handleUserChange }>
                    <ControlLabel>Username:</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Enter your username" />
                </FormGroup>
                <FormGroup 
                    type="password"
                    controlId="formControlsPassword"
                    value={ this.state.password }
                    onChange={ this.handlePasswordChange }>
                    <ControlLabel>Password:</ControlLabel>
                    <FormControl componentClass="password" placeholder="Enter your password" />
                </FormGroup>
                <Button bsStyle='primary' type="submit">
                    SUBMIT
                </Button>
            </form>
        );
    }
}