import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Dashboard, Login, SignUp } from "./pages";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { currentUser } = useAuth();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signUp" component={SignUp} />
          {/* {currentUser ? (
            <Route exact path="/" component={Dashboard} />
          ) : (
            <Redirect to="/login" />
          )} */}
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
