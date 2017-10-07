import React from 'react';
import { Col, Thumbnail, Button, Image } from 'react-bootstrap';
import '../App.css';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    // marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }
    render() {  
        return (
            <div>
                <Col xs={6} md={2}>
                    <Thumbnail href="#" alt="image thumbnail" src={this.props.image} className="thumbNail" onClick={this.openModal}/>
                </Col>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    style={modalStyle}
                    contentLabel="Modal"
                    > 
                    <Image 
                        src={this.props.imageModal} 
                        rounded 
                        style={{'maxHeight': 400, 'marginBottom': 20, display: 'block' }}/>
                    <Button 
                        bsStyle='primary' 
                        onClick={this.closeModal}>
                        CLOSE
                    </Button>
                    <FontAwesome 
                        name='heart' 
                        size='2x'
                        style={{ color: '#ff0000', marginLeft: 500}}/>
                </Modal>
            </div>
        );
    }
}
export default Images;