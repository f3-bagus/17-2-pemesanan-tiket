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
 import { useState, useRef, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import axios from "axios";
 import * as formik from "formik";
 import * as yup from "yup";
 import { useContext } from "react";
 import { UserContext } from "../../UserContext";
 import userProfile from "../assets/img/profile/user-def-profile.png";
 
 const AccountPages = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const { user } = state;
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const fileInputRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
 
  useEffect(() => {
   const fetchProfile = async () => {
    try {
     const token = sessionStorage.getItem("token");
     const response = await axios.get("http://localhost:3000/api/profile", {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     });
     setUserData(response.data);
    } catch (error) {
     console.error("Error fetching profile:", error);
    }
   };
   fetchProfile();
  }, []);
 
  const handleBack = () => {
   navigate(-1);
  };
 
  const handleTopUp = () => {
   setShowAlert(true);
  };
 
  const { Formik } = formik;
 
  const schema = yup.object().shape({
   username: yup.string().required(),
   email: yup.string().email().required(),
   password: yup.string().required(),
   noHp: yup.string().required(),
  });
 
  const handleIconClick = () => {
   fileInputRef.current.click();
  };
 
  const togglePasswordVisibility = () => {
   setPasswordVisible(!passwordVisible);
  };
 
  const handleSubmit = async (values) => {
   try {
    const token = sessionStorage.getItem("token");
    await axios.put("http://localhost:3000/api/profile", values, {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    });
 
    if (values.file) {
     const formData = new FormData();
     formData.append("image", values.file);
     await axios.put("http://localhost:3000/api/profile/ava", formData, {
      headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "multipart/form-data",
      },
     });
    }
 
    const response = await axios.get("http://localhost:3000/api/profile", {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    });
 
    dispatch({
     type: "UPDATE_USER",
     payload: response.data,
    });
 
    setUserData(response.data);
    setShowAlert(true);
   } catch (error) {
    console.error("Error updating profile:", error);
   }
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
          onSubmit={handleSubmit}
          initialValues={{
           username: userData.username || "",
           email: userData.email || "",
           password: "",
           noHp: userData.noHp || "",
           file: null,
          }}
          enableReinitialize
         >
          {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
           <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
             <FormGroup as={Col}>
              <div className="profile-photo-container">
               <img
                src={userData.image?.url || userProfile}
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
                onChange={(e) => setFieldValue("file", e.currentTarget.files[0])}
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
               name="noHp"
               value={values.noHp}
               onChange={handleChange}
               isInvalid={!!errors.noHp}
              />
              <Form.Control.Feedback type="invalid">
               {errors.noHp}
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
              <h5>Rp {userData.balance || 0}</h5>
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
               Request top-up already sent to admin!
              </Alert>
             )}
             <Button type="submit" className="btn-dark">
              Save
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
 