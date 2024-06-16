import {
 Container,
 Row,
 Col,
 Form,
 Button,
 Card,
 InputGroup,
 Alert,
 Image,
 Tooltip,
 OverlayTrigger,
 FormGroup,
} from "react-bootstrap";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as formik from "formik";
import * as yup from "yup";
import userProfile from "../assets/img/profile/user-def-profile.png";

const AccountPages = () => {
 const navigate = useNavigate();
 const [userData, setUserData] = useState({});
 const [editMode, setEditMode] = useState(true); // Set to true to show the form by default
 const [showAlert, setShowAlert] = useState(false);
 const fileInputRef = useRef(null);
 const [passwordVisible, setPasswordVisible] = useState(false);

 const handleBack = () => {
  navigate(-1); // Go back to the previous page
 };

 const handleTopUp = () => {
  setShowAlert(true);
 };

 const { Formik } = formik;

 const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  file: yup.mixed().required(),
 });

 // Temporary profile data
 const profile = {
  username: "kumi",
  email: "anak pucis@example.com",
  password: "password123",
  phone: "123-456-7890",
  profilePhoto: userProfile,
  balance: 500000,
 };

 const handleIconClick = () => {
  fileInputRef.current.click();
 };

 const togglePasswordVisibility = () => {
  setPasswordVisible(!passwordVisible);
 };

 return (
  <div className="user-account">
   <Container className="min-vh-100 pb-5">
    <div className="back-button d-flex align-items-center mb-3">
     <Button
      variant="light"
      onClick={handleBack}
      style={{ border: "none", background: "none" }}
     >
      <i className="fa-solid fa-arrow-left"></i>
     </Button>
     <h4 className="ml-2 mb-0">Account Setting</h4>
    </div>

    <Row className="justify-content-center">
     {editMode && (
      <Card className="profile-settings mt-4 w-75">
       <Card.Body>
        <h3 className="fw-bold pb-1">Profile Settings</h3>
        <Formik
         validationSchema={schema}
         onSubmit={console.log}
         initialValues={{
          username: userData.username || profile.username,
          email: userData.email || profile.email,
          password: "",
          phone: userData.phone || profile.phone,
          file: null,
         }}
         enableReinitialize
        >
         {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
           <Row className="mb-3">
            <FormGroup as={Col}>
             <div className="profile-photo-container">
              <img
               src={userData.profilePhoto || profile.profilePhoto}
               alt="Profile"
               className="profile-photo"
              />
              <OverlayTrigger
               placement="right"
               overlay={
                <Tooltip id="button-tooltip-2">Edit Profile Picture</Tooltip>
               }
              >
               {({ ref, ...triggerHandler }) => (
                <div
                 className="overlay-profile"
                 onClick={handleIconClick}
                 ref={ref}
                 {...triggerHandler}
                >
                 <i className="fa-solid fa-pen"></i>
                </div>
               )}
              </OverlayTrigger>
              <Form.Control
               type="file"
               name="file"
               ref={fileInputRef}
               style={{ display: "none" }}
               onChange={handleChange}
               isInvalid={!!errors.file}
               accept="image/png, image/jpeg"
              />
             </div>
            </FormGroup>
           </Row>
           <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormikUsername">
             <Form.Label>
              <strong>Username</strong>
             </Form.Label>
             <Form.Control
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
             />
             <Form.Control.Feedback type="invalid">
              {errors.username}
             </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormikPhone">
             <Form.Label>
              <strong>Phone Number</strong>
             </Form.Label>
             <Form.Control
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
             />
             <Form.Control.Feedback type="invalid">
              {errors.phone}
             </Form.Control.Feedback>
            </Form.Group>
           </Row>

           <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormikEmail">
             <Form.Label>
              <strong>Email</strong>
             </Form.Label>
             <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
             />
             <Form.Control.Feedback type="invalid">
              {errors.email}
             </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormikPassword">
             <Form.Label>
              <strong>Password</strong>
             </Form.Label>
             <InputGroup>
              <Form.Control
               type={passwordVisible ? "text" : "password"}
               name="password"
               value={values.password}
               onChange={handleChange}
               isInvalid={!!errors.password}
              />
              <InputGroup.Text
               className="rounded-right"
               onClick={togglePasswordVisibility}
               style={{ cursor: "pointer" }}
              >
               <i
                className={`fa-solid ${
                 passwordVisible ? "fa-unlock" : "fa-lock"
                }`}
               ></i>
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
               {errors.password}
              </Form.Control.Feedback>
             </InputGroup>
            </Form.Group>
           </Row>
           <Row>
            <Form.Group as={Col} className="position-relative mb-3">
             <Form.Control
              type="file"
              name="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleChange}
              isInvalid={!!errors.file}
              accept="image/png, image/jpeg"
             />
             <Form.Control.Feedback type="invalid">
              {errors.file}
             </Form.Control.Feedback>
            </Form.Group>
           </Row>

           <Form.Group className="position-relative mb-3">
            <Form.Label>
             <strong>Balance </strong>
            </Form.Label>{" "}
            <br />
            <Form.Label>
             <h5>Rp {userData.balance || profile.balance}</h5>
            </Form.Label>
           </Form.Group>
           <div className="d-grid gap-2">
            <Button className="btn-dark" onClick={handleTopUp}>
             Request Top-Up
            </Button>
            {showAlert && (
             <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
             >
              Request top-up already sent to admin.
             </Alert>
            )}
            <Button type="submit" className="btn-orange">
             Change Profile
            </Button>
           </div>
          </Form>
         )}
        </Formik>
       </Card.Body>
      </Card>
     )}
    </Row>
   </Container>
  </div>
 );
};

export default AccountPages;
