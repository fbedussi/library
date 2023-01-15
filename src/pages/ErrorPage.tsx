import React from 'react';
import { useSelector } from 'react-redux';

import { selectUiErrors } from '../store/errors/selectors';

const ErrorPage = () => {
  const errors = useSelector(selectUiErrors);

  return (
    <div>
      {errors.map(({ id, message }) => (
        <div key={id}>ERROR: {message}</div>
      ))}
    </div>
  );
};

export default ErrorPage;
