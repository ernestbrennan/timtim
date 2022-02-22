import React from 'react';
import { getTime } from '$app/utlis/flat';
const FormattedDate = ({ date, locale }) => {
  return <>{getTime(date, locale)}</>;
};

export default FormattedDate;
