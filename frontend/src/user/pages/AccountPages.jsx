import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Alert,
  FormGroup,
  OverlayTrigger,
  Tooltip,
 } from "react-bootstrap";
 import { useState, useRef, useEffect } from "react";
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
 
  useEffect(() => {
   const token = sessionStorage.getItem("token");
   if (token) {
    axios
     .get("http://localhost:3000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
     })
     .then((response) => {
      setUserData(response.data);
      console.log("Profile data fetched:", response.data);
     })
     .catch((error) => {
      console.error("Error fetching profile data:", error);
     });
   }
  }, []);
 
  const handleBack = () => {
   navigate(-1); // Go back to the previous page
  };
 
  const handleTopUp = () => {
   setShowAlert(true);
  };
 
  const { Formik } = formik;
 
  const schema = yup.object().shape({
   username: yup.string(),
   email: yup.string().email(),
   password: yup.string(),
   noHp: yup.string(),
   file: yup.mixed(),
  });
 
  const handleIconClick = () => {
   fileInputRef.current.click();
  };
 
  const togglePasswordVisibility = () => {
   setPasswordVisible(!passwordVisible);
  };
 
  const handleSubmit = async (values) => {
   const token = sessionStorage.getItem("token");
 
   try {
    // Update profile data
    await axios.put(
     "http://localhost:3000/api/profile",
     {
      username: values.username,
      email: values.email,
      password: values.password,
      noHp: values.noHp,
     },
     {
      headers: { Authorization: `Bearer ${token}` },
     }
    );
 
    console.log("Profile updated successfully");
 
    // Update profile photo if a new file is selected
    if (values.file) {
     const formData = new FormData();
     formData.append("image", values.file);
 
     await axios.put("http://localhost:3000/api/profile/ava", formData, {
      headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "multipart/form-data",
      },
     });
 
     console.log("Profile photo updated successfully");
    }
 
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
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
          {({
           handleSubmit,
           handleChange,
           setFieldValue,
           values,
           touched,
           errors,
          }) => (
           <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
             <FormGroup as={Col}>
              <div className="profile-photo-container">
               <img
                src={
                 userData.image
                  ? `http://localhost:3000/uploads/members/${userData.image.filename}`
                  : userProfile
                }
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
                onChange={(event) => {
                 setFieldValue("file", event.target.files[0]);
                }}
               />
              </div>
             </FormGroup>
            </Row>
 
            <FormGroup as={Col} controlId="validationFormikUsername">
             <Form.Label className="fs-6">Username</Form.Label>
             <InputGroup hasValidation>
              <Form.Control
               type="text"
               placeholder="Username"
               name="username"
               value={values.username}
               onChange={handleChange}
               isValid={touched.username && !errors.username}
               isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type="invalid">
               {errors.username}
              </Form.Control.Feedback>
             </InputGroup>
            </FormGroup>
 
            <FormGroup
             as={Col}
             controlId="validationFormikEmail"
             className="mt-2"
            >
             <Form.Label className="fs-6">Email</Form.Label>
             <InputGroup hasValidation>
              <Form.Control
               type="email"
               placeholder="Email"
               name="email"
               value={values.email}
               onChange={handleChange}
               isValid={touched.email && !errors.email}
               isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
               {errors.email}
              </Form.Control.Feedback>
             </InputGroup>
            </FormGroup>
 
            <FormGroup
             as={Col}
             controlId="validationFormikPassword"
             className="mt-2"
            >
             <Form.Label className="fs-6">Password</Form.Label>
             <InputGroup hasValidation>
              <Form.Control
               type={passwordVisible ? "text" : "password"}
               placeholder="Password"
               name="password"
               value={values.password}
               onChange={handleChange}
               isValid={touched.password && !errors.password}
               isInvalid={touched.password && !!errors.password}
              />
              <InputGroup.Text
               className="password-toggle-icon"
               onClick={togglePasswordVisibility}
              >
               <i
                className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
               ></i>
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
               {errors.password}
              </Form.Control.Feedback>
             </InputGroup>
            </FormGroup>
 
            <FormGroup
             as={Col}
             controlId="validationFormikNoHp"
             className="mt-2"
            >
             <Form.Label className="fs-6">Phone Number</Form.Label>
             <InputGroup hasValidation>
              <Form.Control
               type="text"
               placeholder="Phone Number"
               name="noHp"
               value={values.noHp}
               onChange={handleChange}
               isValid={touched.noHp && !errors.noHp}
               isInvalid={touched.noHp && !!errors.noHp}
              />
              <Form.Control.Feedback type="invalid">
               {errors.noHp}
              </Form.Control.Feedback>
             </InputGroup>
            </FormGroup>
 
            <Button variant="primary" type="submit" className="mt-3">
             Save Changes
            </Button>
           </Form>
          )}
         </Formik>
        </Card.Body>
       </Card>
      )}
 
      {showAlert && (
       <Alert
        variant="success"
        onClose={() => setShowAlert(false)}
        dismissible
        className="mt-3 w-75"
       >
        Profile updated successfully!
       </Alert>
      )}
     </Row>
    </Container>
   </div>
  );
 };
 
 export default AccountPages;
 