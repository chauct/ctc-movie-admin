import { Fragment } from "react";
import { Route } from "react-router-dom";
import styles from "./style.module.css";
export const UserTemplate = (props) => {
  return (
    <Route
      path={props.path}
      exact
      render={(propsRoute) => {
        return (
          <Fragment>
            <props.component />
          </Fragment>
        );
      }}
    />
  );
};
