export const getLocationName = (pathname: string) => {
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
    if (pathname.includes('images/resize')) {
        return 'Image Resizer';
    }
    if (pathname.includes('images/convert')) {
        return 'Image Converter';
    }
    if (pathname.includes('images/optimize')) {
        return 'Image Optimizer';
    }
    if (pathname.includes('images/generator')) {
        return 'Générateur de média d\'appels';
    }
    return pathname.replace('/', '');
}
