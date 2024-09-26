import React, { useState } from 'react';
import xMarkCircle from './images/circle-xmark-solid.svg';

function xCircle({ listType, unfollowLeague, unfollowTeam, user_id, id }) {

  const handleSubmitRemove = () => {
    if (listType === "League") {
      unfollowLeague(user_id, id)
    } else {
      unfollowTeam(user_id, id)
    }
  };

return (
  <xMarkCircle className='removeButton' onClick={handleSubmitRemove}/>
);
}

export default xCircle;