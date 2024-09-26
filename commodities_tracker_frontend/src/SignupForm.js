import { useState } from "react";
import Alert from "./Alert";
import "./stylesheets/SignupForm.css";


/** Form for signing up a new user */
function SignupForm({ handleSubmit }) {

  const initialFormData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(null);


  function submitForm(evt) {
    evt.preventDefault();

    async function signupUser() {
      try {
        await handleSubmit(formData);
      } catch (error) {
        setErrors(error);
      }
    }
    signupUser();
  }

  function handleFormChange(evt) {
    const { name, value } = evt.target;
    setFormData(prevFormData => (
      { ...prevFormData, [name]: value }
    ));
  }

  return (
    <>
      <form className="SignupForm" onSubmit={submitForm}>
        <label className="form-label" htmlFor="username">Username</label>
        <input onChange={handleFormChange}
          value={formData.username}
          placeholder="Username"
          name="username" />
        <label className="form-label" htmlFor="password">Password</label>
        <input onChange={handleFormChange}
          type="password"
          value={formData.password}
          placeholder="Password"
          name="password" />
        <button>Submit</button>
      </form>

      {errors && <Alert errors={errors} />}
    </>
  );
}



export default SignupForm;