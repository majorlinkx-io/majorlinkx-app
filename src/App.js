import { useState, createContext, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/styles/_master.scss"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import Login from "./scenes/Login"
import UserProfile from "./scenes/UserProfile"
import Browse from "./scenes/Browse"
import Signup from "./scenes/Signup"
import Home from "./scenes/Home"
import AboutPage from "./scenes/AboutPage"
import BuildProfile from "./scenes/BuildProfile"

export const UserContext = createContext(null)

function App() {
  const [globalUser, setGlobalUser] = useState(localStorage.getItem('token'))

  return (
    <UserContext.Provider value={{ globalUser, setGlobalUser }}>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/browse" component={Browse} />
          <Route exact path="/userprofile/:stageName" component={UserProfile} />
          <Route exact path="/buildprofile" component={BuildProfile} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default App
