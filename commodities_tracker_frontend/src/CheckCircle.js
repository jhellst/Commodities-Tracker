import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'; // Import check circle icons
import './stylesheets/CheckCircle.css';

function CheckCircleToggle({ user_id, team_id, isFollowedByUser, followTeam, unfollowTeam }) {
  const [isChecked, setIsChecked] = useState(isFollowedByUser);

  let visibility = "visible";
  if (user_id && user_id !== "" && user_id !== undefined && user_id !== null) {
    visibility = 'visible';
  } else {
    visibility = 'hidden'
  }

  const toggleCheckOn = () => {
    followTeam(user_id, team_id);
    setIsChecked(prevState => !prevState);
  };

  const toggleCheckOff = () => {
    unfollowTeam(user_id, team_id);
    setIsChecked(prevState => !prevState);
  };

  return (

    <div className="checkCircleContainer">
      <div className="checkCircle">
        {isChecked ? (
          <FaCheckCircle visibility={visibility} onClick={toggleCheckOff} className='circleIsChecked' />
        ) : (
          <FaRegCircle visibility={visibility} onClick={toggleCheckOn} className='circleIsNotChecked' />
        )}
      </div>
    </div>
  );
}

export default CheckCircleToggle;