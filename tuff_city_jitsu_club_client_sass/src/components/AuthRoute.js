import React from "react";

import { Route, Redirect } from "react-router-dom";

const AuthRoute = props => {
  const {
    isAuthenticated = false,
    component: Component,
    render,
    ...restProps
  } = props;

  return (
    <Route
      {...restProps}
      render={routeProps => {
        if (isAuthenticated) {
            if (typeof render === "function") {
                return render(routeProps);
            } else {
                return <Component {...routeProps} />;
            }
        } else {
          return <Redirect to="/sign_in" />;
        }
      }}
    />
  );
};

export default AuthRoute;