import { useMemo, useState, useContext, useEffect} from 'react'
import Cookies from 'js-cookie';
import { GlobalSettingsContext } from './Contexts/GlobalSettingsContext';
import Home from './Pages/Home/Home.js'

function App() {

  let [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyOTM0MDkyMzg0OTIzODQyIiwibmFtZSI6Ik11aHNpbiIsInN1cm5hbWUiOiJEZW5peiIsImVtYWlsIjoibW5rbnNybzQxM0BnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.baED2z3BegP2zdL6IkesZvXzwOcaGEwCV4b0Oiim6Ug")

  useEffect(() => {
    Cookies.set("token", token);
  }, [])

  return (
    <div>
      <GlobalSettingsContext.Provider value={{ token, setToken}}>
        <Home />
      </GlobalSettingsContext.Provider>
    </div>
  );
}

export default App;
