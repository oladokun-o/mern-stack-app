import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createUser } from '../services/UserService'
import React, { useState } from 'react';
import $ from 'jquery';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import { AddButton } from './action-btns';
export default function CreateUser(props) {    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = (data, e) => {
        createUser(data).then(response => {
            props.userCreated();
            console.log(response)
            if ($('tbody :checkbox').length === 0) $('#checkAll').removeAttr('disabled');
            else $('#checkAll').attr('disabled', '');
            e.resetForm();
            handleClose();
        });
    };
  
    function closePopUp() {
        handleShow();
    }
    const schema = yup.object().shape({
    name: yup.string().required(),
    phone_number: yup.string()
        .phone()
        .required(),
    email: yup.string().email().required(),
    hobbies: yup.string().required()
    });
    
  
    return(
        <>
                        
            <AddButton action={closePopUp} state={props.state}></AddButton>         
            <div className="container-fluid position-fixed header py-3 shadow">
                <div className="row pt-3">
                    <div className="col-6">
                        <h2>User Data</h2>
                    </div>
                </div>
            </div>
            
            <Modal className="shadow" show={show} onHide={handleClose}>
            <Modal.Header className="bg-dark">
                <Modal.Title>
                    <h2>New User Data</h2>
                </Modal.Title>
                <Button type="button" className="btn-close" onClick={handleClose} aria-label="Close">
                    <i className="bi bi-x-lg"></i>
                </Button>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <div className="container-fluid">
                <Formik validationSchema={schema} onSubmit={onSubmit} 
                    initialValues={{
                        name: '',
                        phone_number: '',
                        email: '',
                        hobbies: ''
                    }}>
                    {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={values.name}
                                isInvalid={!!errors.name}
                                placeholder="Enter full name"
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="phone_number">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone_number"
                                placeholder="Enter contact number"
                                onChange={handleChange}
                                value={values.phone_number}
                                isInvalid={!!errors.phone_number}
                            />
                            <Form.Control.Feedback type="invalid">{errors.phone_number}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="email">
                        <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email address"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                {errors.email}
                                </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" className="mb-3" controlId="hobbies">
                        <Form.Label>Hobbies</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter hobbies"
                            name="hobbies"                            
                            onChange={handleChange}
                            value={values.hobbies}
                            isInvalid={!!errors.hobbies}
                        />
                        <Form.Control.Feedback type="invalid">
                {errors.hobbies}
              </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <div className="container-fluid text-end px-0">
                        <Button className="mb-3 primary-btn" type="submit">Save new data</Button>
                    </div>
                </Form>
            )}  
            </Formik>   
            </div>
            </Modal.Body>
            </Modal>
        </>
    )
}