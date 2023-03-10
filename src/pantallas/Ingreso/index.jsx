import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthUserContext } from '../../componentes/Session';
import * as ROUTES from '../../constantes/routes';
import { withFirebase } from '../../servidor';
import './styles.css'
import Formulario from '../../componentes/Ingreso/Formulario';

const IngresoScreen = (props) => {
    const navigate = useNavigate();

    const { authUser } = useContext(AuthUserContext)

    useEffect(() => {
        if (authUser) {
            navigate(ROUTES.HOME);
        }
    }, [])

    return (
        <div className='login'>
            <div className="login-container">
                <div className='login-container-header'>
                    <h1>Chat Online</h1>
                    <h2>Bienvenido</h2>
                </div>

                <Formulario {...props} />
            </div>
        </div>
    )
}

export default withFirebase(IngresoScreen);
