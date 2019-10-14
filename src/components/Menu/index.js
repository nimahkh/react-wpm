import React from 'react'
import {Route, Link, Switch} from "react-router-dom";
import MyScores from "../MyScores"
import Home from "../Home"

function Menu() {
  return (<React.Fragment>
    <div className="menu">
      <ul>
        <li>
          <Link to={`/scores`}>Check your scores
          </Link>
        </li>
        <li>
          <Link onClick={()=>window.location.href="/"}>Start the game
          </Link>
        </li>
      </ul>
    </div>
    <div>
      <Switch>
        <Route exact={true} path="/">
          <Home/>
        </Route>
        <Route exact={true} path="/scores">
          <MyScores/>
        </Route>
      </Switch>
    </div>
  </React.Fragment>)
}

export default Menu
