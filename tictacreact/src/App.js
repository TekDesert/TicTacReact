import logo from './logo.svg';
import './App.css';

import Header from './components/common/header'
import Main from './components/Main'
import Footer from './components/common/footer'

import Login from './components/Authentification/Login'
import Register from './components/Authentification/Register'

import 'animate.css'

import "./assets/css/argon.min.css"

import history from './history'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

//Socket
import {SocketContext, socket} from './context/socket';


require('dotenv').config() //.env file


function App() {


  //Used to protect route for non-authenticated users
  function PrivateRoute ({component: Component, authed, ...rest}) {

    var isAuthed = (localStorage.getItem('user-info') === null)? false : true

    console.log(isAuthed);

    return (
      
      <Route
        {...rest}
        render={(props) => isAuthed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }


  return (
    <div className="App">

        <Router history={history}>


        


            <Header></Header>
          
            
            
              <Switch>   
                  <Route path="/login" component={Login} > 
          
                  </Route>

                  <PrivateRoute  path="/dashboard" component={Main} />
                  
                

                  <Route exact path="/" component={Register}>
                      <Register></Register>
                  </Route>
              </Switch>
              
            

            <Footer></Footer>


         


        </Router>
    </div>
  );
}

export default App;


//  {/*<SocketContext.Provider value={socket}>*/}

// {/*</SocketContext.Provider>*/}