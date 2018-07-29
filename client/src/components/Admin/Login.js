import React from "react";
import { Login, LoginForm } from "react-admin";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  main: { background: "#333" },
  avatar: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: 80
  }
};

const CustomLoginForm = withStyles({
  button: {
    backgroundColor: "#61a63a",
    "&:hover": {
      background: "#61a63a"
    }
  }
})(LoginForm);

const CustomLoginPage = props => (
  <Login loginForm={<CustomLoginForm />} {...props} />
);

export default withStyles(styles)(CustomLoginPage);
