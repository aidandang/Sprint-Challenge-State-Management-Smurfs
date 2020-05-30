import React from 'react';

// import dependencies
import uuid from 'react-uuid';

// import hooks
import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// import redux components
import { connect } from 'react-redux';
import { getSmurfs } from '../actions';

// import routes
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
  smurfs: state.smurfs,
  error: state.error,
  isFetching: state.isFetching
});

const Smurfs = props => {

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    props.getSmurfs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>
    <div className="row">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Height</th>
              </tr>
            </thead>
            <tbody>
              {props.smurfs && props.smurfs.map(smurf => 
                <tr key={uuid()}>
                  <th scope="row"><span className="mr-2">{smurf.id}</span></th>
                  <td>{smurf.name}</td>
                  <td>{smurf.age}</td>
                  <td>{smurf.height}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <Link to={`${location.pathname}/add`} className="btn btn-primary btn-custom">Add Smurf</Link>
      </div>
    </div>
  </>
}

export default connect(mapStateToProps, { getSmurfs })(Smurfs);