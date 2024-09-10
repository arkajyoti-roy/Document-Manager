// import React from 'react'
import { useState } from 'react';


const SET = () => {
    const [isDivVisible, setIsDivVisible] = useState(false);

  const handleClick = () => {
    setIsDivVisible(true);
  };
  return (
    <div>
    {!isDivVisible && (
      <button onClick={handleClick}>Click Me</button>
    )}
    {isDivVisible && (
      <div>
        Hello! I am now visible.
      </div>
    )}
  </div>
  )
}

export default SET
