import React from 'react';
import { Row, Panel, Button } from 'react-bootstrap';
import '../App.css';

const UserPanel = ({username}) => {
    console.log(username)
    return (
        <Row>
            <Panel>
                <h3>Welcome {username}</h3>
                <Button href="/" bsStyle='primary'>SIGN OUT</Button>
            </Panel>
        </Row>
    )
}

export default UserPanel;