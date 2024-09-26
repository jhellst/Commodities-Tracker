import "./stylesheets/Success.css";

/** Returns an success message containing any messages passed in argument. */
function Success({successMessage}){
  let success;
  if (Array.isArray(successMessage)) {
    success = successMessage.map((message, idx) => {
      return <p key={idx}>{message}</p>
    })
  } else {
    success = <p>{successMessage}</p>;
  }

  return (
    <div className="Success">
      <h2>Success!</h2>
      {success}
    </div>
  )
}

export default Success;