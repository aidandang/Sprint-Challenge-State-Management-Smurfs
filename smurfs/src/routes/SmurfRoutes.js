import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Smurfs from '../components/Smurfs';
import AddSmurf from '../components/AddSmurf';
import Smurf from '../components/Smurf'

export default function CustomerRoutes() {
  return (
    <Switch>
      <Route
        exact
        path='/smurfs'
        render={props => <Smurfs {...props} />}
      />
      <Route
        exact
        path='/smurfs/add'
        render={props => <AddSmurf {...props} />}
      />
      <Route
        exact
        path='/smurfs/:id'
        render={props => <Smurf {...props} />}
      />
    </Switch>
  )
}