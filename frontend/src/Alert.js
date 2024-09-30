import "./stylesheets/Alert.css";

/** Returns an alert message containing any errors passed in argument. */
function Alert({ errors }) {
  let errorMessage;

  if (Array.isArray(errors)) errorMessage = errors[0].message;
  else if (errors.message) errorMessage = errors.message;

  let errorDisplay;
  if (Array.isArray(errorMessage)) {
    errorDisplay = errorMessage.map((message, idx) => {
      return <p key={idx}>{message}</p>;
    });
  } else {
    errorDisplay = <p>{errorMessage}</p>;
  }


  return (
    <div className="Alert">
      <h2>Alert! You messed up.</h2>
      {errorDisplay}
    </div>
  );
}

export default Alert;