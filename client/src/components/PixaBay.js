import React from 'react';
import { Row } from 'react-bootstrap';
import '../App.css';

import Images from './Images';

const PixaBay = (props) => {
    return (
        <Row>
            {props.images.map((image) => {
                return (
                    <div key = {image._id}>
                        <Images image={image.url} imageModal={image.imageURL} />
                    </div>
                );
            })}
        </Row>
    )
}

export default PixaBay;