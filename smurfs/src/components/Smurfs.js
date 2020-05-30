import React from 'react';

// import hooks
import { useEffect } from 'react';

// import redux components
import { connect } from 'react-redux';
import { getSmurfs } from '../actions';

const mapStateToProps = state => ({
  smurfs: state.smurfs,
  error: state.error,
  isFetching: state.isFetching
});

const Smurfs = props => {
  
  console.log(props.smurfs);

  useEffect(() => {
    props.getSmurfs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>
  </>
}

export default connect(mapStateToProps, { getSmurfs })(Smurfs);