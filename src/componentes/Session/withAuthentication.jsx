import React, { useState, useEffect, useMemo } from 'react';
import { withFirebase } from '../../servidor';
import { AuthUserContext } from './index';

const withAuthentication = Component => {
    const WithAuthentication = props => {
        const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')))
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            const listener = props.firebase.onAuthUserListener(
                (authUser) => {
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    setAuthUser(authUser);
                    setLoading(false)
                },
                (error) => {
                    localStorage.removeItem('authUser');
                    setAuthUser(null);
                    setLoading(false)
                },
            );

            return () => listener()
        }, [])


        const contextAuthUser = useMemo(() => ({
            authUser,
            loading
        }), [authUser, loading]);

        return (
            <AuthUserContext.Provider value={contextAuthUser}>
                <Component {...props} />
            </AuthUserContext.Provider>
        );
    }

    return withFirebase(WithAuthentication);
};

export default withAuthentication;