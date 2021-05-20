
import './header.css'

import { useHistory } from "react-router-dom";

function Header(props) {

    const history = useHistory();

    async function logout() 
    {
        var user_id = JSON.parse(localStorage.getItem('user-info'))._id; //Get logged in user's ID

      

        let result = await fetch(process.env.REACT_APP_API_URL+"users/logout",{ //Log him out
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({_id: user_id})
        });


        if (result.status === 200){
            localStorage.removeItem('user-info');
            history.push("/")
            
        }else{
            console.log("----------------------------------------------")
            console.log("Logout Failed")
        }


      
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img id="logo" src="https://images-eu.ssl-images-amazon.com/images/I/41Yj12sPTtL.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                Tic Tac React
            </a>

            {
                // display the logout button only if we are logged in
                window.location.pathname === "/dashboard"?<i className="ni ni-button-power" onClick={logout} style={{color: "#0079ca", fontSize:"25px", marginRight:"15px", cursor: "pointer"}}></i> : null
            
            }

            
        </nav>
    );
}

export default Header;

