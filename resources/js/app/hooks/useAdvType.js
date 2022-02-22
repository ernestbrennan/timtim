import { useLocation } from 'react-router-dom'
import { advTypes } from '$js/utils/realty'

export default function useAdvType() {
  const location = useLocation();
  if (location.pathname.includes(advTypes.sale)) {
    return advTypes.sale;
  }

  if (location.pathname.includes(advTypes.rent)) {
    return advTypes.rent;
  }

  return '';
}
