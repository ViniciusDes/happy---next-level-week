import React from "react";
import {Route, BrowserRouter, Switch} from "react-router-dom"
import Landing from "../pages/landing"
import Orphanages from "../pages/Orphanages"
function Routes(){
  return(
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route exact path="/App" component={Orphanages} />
    </BrowserRouter>
  )
}

export default Routes; 