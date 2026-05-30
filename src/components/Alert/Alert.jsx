import React from 'react'
import './Alert.scss';

const Alert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="alert">
      {message}
    </div>
  )
}

export default Alert