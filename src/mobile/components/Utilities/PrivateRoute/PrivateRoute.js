import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from '../../Header/Header';

const PrivateRoute = ({component:Component,isLoggedIn,...rest}) => (
    <Route {...rest} render={(props) => (
        isLoggedIn? ([<Header/>
                    ,<Component {...props} />])
                : <Redirect to={{
                    pathname:"/login",
                    state:{from:props.location}
                    }} 
                />
        )
    }
    />
)

export default PrivateRoute;