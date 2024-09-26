import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'; // Import check circle icons
import './stylesheets/CheckCircleLeagues.css';

function CheckCircleToggleLeagues({ user_id, league_id, isFollowedByUser, followLeague, unfollowLeague, isUserList }) {
  const [isChecked, setIsChecked] = useState(isFollowedByUser);

  let visibility = "visible";
  if (user_id && user_id !== "" && user_id !== undefined && user_id !== null) {
    visibility = 'visible';
  } else {
    visibility = 'hidden';
  }

  const toggleCheckOn = () => {
    if (isUserList == "True") {
      followLeague(user_id, league_id);
    } else {
      setIsChecked(prevState => !prevState);
      followLeague(user_id, league_id);
    }
  };

  const toggleCheckOff = () => {
    if (isUserList == "True") {
      unfollowLeague(user_id, league_id);
    } else {
      setIsChecked(prevState => !prevState);
      unfollowLeague(user_id, league_id);
    }
  };

  return (

    <div className="checkCircleLeaguesContainer">
      <div className="checkCircleLeagues">
        {(isUserList == "True" || isChecked) ? (
          <FaCheckCircle visibility={visibility} onClick={toggleCheckOff} className='circleIsChecked' />
        ) : (
          <FaRegCircle visibility={visibility} onClick={toggleCheckOn} className='circleIsNotChecked' />
        )}
      </div>
    </div>
  );
}

export default CheckCircleToggleLeagues;