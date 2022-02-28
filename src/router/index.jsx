import { BrowserRouter, useRoutes } from 'react-router-dom';

import routeConfig from './generaterRouteConfig';

const Routers = () => {
  const routers = useRoutes(routeConfig);
  return routers;
}

function App(){

  return(
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  )
}

export default App;