import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { editUser } from '../services/UserService';
import { Formik } from 'formik';
import * as yup from 'yup';
import "yup-phone";

export default function EditUserModal({user, userEdited}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = data => {
        editUser(data).then(response => {
          userEdited(response);
          setShow(false);
        });
      };
  
    const updateSchema = yup.object().shape({
      name: yup.string().required(),
      phone_number: yup.string()
        .phone()
        .required(),
      email: yup.string().email().required(),
      hobbies: yup.string().required()
    });
      
    return (
      <>
        <Button className="cell-btn btn" onClick={handleShow}>
          <i className="bi bi-pencil-square"></i>
        </Button>
  
        <Modal className="shadow" show={show} onHide={handleClose}>
          <Modal.Header className="bg-dark">
            <Modal.Title>
              <h2>Update User Data</h2>
            </Modal.Title>
            <Button type="button" className="btn-close" onClick={handleClose} aria-label="Close">
                <i className="bi bi-x-lg"></i>
            </Button>
          </Modal.Header>
          <Modal.Body className="bg-dark">
          <Formik validationSchema={updateSchema} onSubmit={onSubmit} 
                    initialValues={{
                        _id: user._id,
                        serial_no: user.serial_no,
                        name: user.name,
                        phone_number: user.phone_number,
                        email: user.email,
                        hobbies: user.hobbies
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
                        <Button className="mb-3 primary-btn" type="submit">Update</Button>
                    </div>
                </Form>
            )}  
            </Formik>  
          </Modal.Body>
          
        </Modal>
      </>
    );
}