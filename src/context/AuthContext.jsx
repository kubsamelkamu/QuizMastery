import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { currentUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};
