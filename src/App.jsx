import { withAuthentication } from './componentes/Session';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ChatScreen from './pantallas/chat';
import IngresoScreen from './pantallas/Ingreso';

import * as ROUTES from './constantes/routes';
import NotFound from './pantallas/NotFound';
import UseValidateRoutes from './hook/UseValidateRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={ROUTES.HOME} element={<UseValidateRoutes><ChatScreen /></UseValidateRoutes>} />
        <Route exact path={ROUTES.INGRESO} element={<IngresoScreen />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  )
}

export default withAuthentication(App) 
