import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Redirect } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const { isUserLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
