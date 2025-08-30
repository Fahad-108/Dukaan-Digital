import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/Routes.jsx'
import { UserProvider } from './components/context/UserContext.jsx'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
    <Toaster position="bottom-right" />
      <BrowserRouter basename="/Dukaan-Digital">
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App