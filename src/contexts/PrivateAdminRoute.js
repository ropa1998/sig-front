import React from "react";
import {Route} from "react-router-dom";
import {useAuth} from "./AuthContext";
import {Redirect} from "react-router-dom";

export default function PrivateRoute({children, ...rest}) {
    const {isAdmin} = useAuth();

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAdmin() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/home",
                            state: {from: location},
                        }}
                    />
                )
            }
        />
    );
}
