import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import 'tailwindcss/tailwind.css';
import MainContainer from './containers/MainContainer.jsx';
import Navigationbar from './components/Navigationbar.jsx';
function App() {
  /**
  App
  |-- Navigation Bar
  |-- MainContainer
      |-- UserForm (Container)
            |-- DropDown (small part component)
      |-- DisplayContainer (Container)
          
 */

  return (
    <NextUIProvider>
      <Navigationbar />
      <MainContainer />
    </NextUIProvider>
  );
}

export default App;
