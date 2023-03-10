import React from 'react';

const AuthUserContext = React.createContext();

export const UserProvider = AuthUserContext.Provider
export const UserConsumer = AuthUserContext.Consumer

export default AuthUserContext;
