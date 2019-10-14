import React from "react"
import {BrowserRouter as Router} from "react-router-dom";
import Menu from "../Menu"

function MainComponent(props) {
  return (<Router>
    <Menu/>
  </Router>)
}

export default MainComponent;
