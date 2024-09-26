import React, { useState } from 'react';
import './stylesheets/RemoveButton.css';
import { FaTimesCircle } from 'react-icons/fa'; // Import x circle icon


function RemoveButton({ listType, unfollowLeague, unfollowTeam, user_id, id }) {

  const handleSubmitRemove = () => {
    if (listType === "League") {
      unfollowLeague(user_id, id)
    } else {
      unfollowTeam(user_id, id)
    }
  };

return (
  <FaTimesCircle className='removeButton' onClick={handleSubmitRemove}/>
);
}

export default RemoveButton;