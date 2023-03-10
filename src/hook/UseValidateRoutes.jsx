import React, { useContext } from "react";
import { AuthUserContext } from '../componentes/Session';
import { Navigate } from 'react-router-dom';

import * as ROUTES from '../constantes/routes';
import { Spinner } from "react-bootstrap";

const UseValidateRoutes = ({ children, scopes = [], ...props }) => {
    const { authUser, loading } = useContext(AuthUserContext)
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="grow" />
            </div>
        )
    }

    if (authUser) {
        return (<div className="page-wrapper">
            <div className="main-content d-flex flex-column">
                {React.cloneElement(children, { ...props })}
                <div className="flex-grow-1"></div>
            </div>
        </div>)
    }

    return <Navigate to={ROUTES.INGRESO} />

}

export default UseValidateRoutes;