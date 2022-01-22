import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

function Nav() {
  const navStyleState = useState({ color: "white" });
  const navigate = useNavigate();
  return (
    <Fragment>
      <AppBar style={{ position: "relative" }}>
        <Toolbar>
          <Typography variate="h6">
            <Button
              style={navStyleState[0]}
              onClick={function onClick() {
                navigate("/");
              }}
            >
              Home
            </Button>
          </Typography>

          <ul className="nav-links">
            <Link to={"/students"} className="nav-link">
              <li>Students</li>
            </Link>
            <Link to={"/books"} className="nav-link">
              <li>Books</li>
            </Link>
          </ul>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default Nav;
