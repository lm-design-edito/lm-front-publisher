import { createContext, useContext } from 'react';


type AuthContextType = {
    status: 'loggedIn' | 'loggedOut';
}

const AuthContext = createContext<AuthContextType>({
    status: 'loggedOut'
});

export function AuthProvider({ children }) {

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// A hook that components can use to access the auth context
export function useAuth() {
  return useContext(AuthContext);
}