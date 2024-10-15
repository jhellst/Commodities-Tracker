import { useState } from "react";
import Alert from "./Alert";
import "./stylesheets/LoginForm.css";


/** Form for loggin in an existing user */
function LoginForm({ handleSubmit }) {

  //build form, should have function to setUser (passed down from App)

  const initialFormData = {
    username: "",
    password: ""
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(null);

  function handleFormChange(evt) {
    const { name, value } = evt.target;
    setFormData(prevFormData => (
      { ...prevFormData, [name]: value }
    ));
  }

  function submitForm(evt) {
    evt.preventDefault();
    loginUser();
  }

  async function loginUser() {
    try {
      await handleSubmit(formData);
    } catch (error) {
      setErrors(error);
    }
  }


  return (
    <>
      <form className="LoginForm" onSubmit={submitForm}>
        <label className="form-label" htmlFor="username">Username</label>
        <input onChange={handleFormChange}
          value={formData.username}
          placeholder="Username"
          name="username" />
        <label className="form-label" htmlFor="password">Password</label>
        <input type="password" onChange={handleFormChange}
          value={formData.password}
          placeholder="Password"
          name="password" />
        <button>Submit</button>
      </form>
      {errors && <Alert errors={errors} />}
    </>
  );
}


export default LoginForm;

