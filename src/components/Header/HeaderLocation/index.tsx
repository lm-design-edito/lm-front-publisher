import { useLocation } from "@tanstack/react-router";

const getLocationName = (pathname: string) => {
    if (!pathname) {
        return null;
    }
    
    if (pathname.includes('login')) {
        return 'Login';
    }
    if (pathname.includes('signup')) {
        return 'Inscription';
    }
    if (pathname.includes('account')) {
        return 'Mon compte';
    }
    if (pathname.includes('check-email')) {
        return 'Valider l\'inscription';
    }
    if (pathname.includes('admin/users')) {
        return 'Liste des utilisateurs';
    }
    if (pathname.includes('images/formatter')) {
        return 'Image Formatter';
    }
    return pathname.replace('/', '');
}

export const HeaderLocation = () => {
    const location = useLocation()
    const locationName = getLocationName(location.pathname);
    if (!locationName) {
        return null
    } 
    return <span className="header__location">{locationName}</span>;
}