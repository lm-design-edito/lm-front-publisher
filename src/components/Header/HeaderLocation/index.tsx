import { useLocation } from '@tanstack/react-router';
import { getLocationName } from './utils';

export const HeaderLocation = () => {
  const location = useLocation();
  const locationName = getLocationName(location.pathname);
  if (!locationName) {
    return null;
  }
  return <span className="header__location">{locationName}</span>;
};
