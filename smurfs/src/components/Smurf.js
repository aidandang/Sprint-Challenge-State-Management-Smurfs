import React from 'react';

// import dependencies
import uuid from 'react-uuid';

// import hooks
import { useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';

// import redux components
import { connect } from 'react-redux';
import { getSmurfs } from '../actions';

// import axios
import axios from 'axios';

// import yup
import * as Yup from 'yup';

// import routes
import { Link } from 'react-router-dom';

import { useForm } from '../hooks/useForm';

// set customer information schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Name is required"),
  age: Yup
    .string()
    .required("Age is required"),
  height: Yup
    .string()
    .required("Height is required"),
});

// set form state
const formState = {
  name: "",
  age: "",
  height: ""
};

const mapStateToProps = state => ({
  smurfs: state.smurfs,
  error: state.error,
  isFetching: state.isFetching
});

const Smurf = props => {

  const location = useLocation();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    props.getSmurfs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apiUrl = `http://localhost:3333/smurfs/${params.id}`;

  

  console.log(props);

  function Form({ smurf, apiUrl }) {
    console.log(smurf);

    // set custom form hook
    const [
      formData, 
      setFormData, 
      errors, 
      handleChanges, 
      buttonDisabled
    ] = useForm(smurf[0], formSchema, apiUrl);

    // Form submit function
    const formSubmit = e => {
      e.preventDefault();

      axios.put(apiUrl, formData)
        .then(res => {
          history.goBack();
        })
        .catch(err => {
          console.log(err.response);
        });
    }

    const onInputChange = e => {
      e.persist();
      const value = e.target.value;
      handleChanges(e.target.id, value)
    }

    const deleteSmurf = e => {
      e.preventDefault();
      
      axios.delete(apiUrl)
        .then(res => {
          history.goBack();
        })
        .catch(err => {
          console.log(err.response);
        });
    }

    return <>
      <form onSubmit={formSubmit}>
      
        <div className="row">
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name"
                value={formData.name}
                onChange={onInputChange}
              />
              <small>Name is required</small>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input 
                type="text" 
                className="form-control" 
                id="age" 
                value={formData.age}
                onChange={onInputChange} 
              />
              <small>Age is required</small>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="height">Height</label>
              <input 
                type="text" 
                className="form-control" 
                id="height" 
                value={formData.height}
                onChange={onInputChange}
              />
              <small>Height is required</small>
            </div>
          </div> 
        </div>
        <div className="row">
          <div className="col">
            <button 
              type="submit" 
              className={`btn btn-${buttonDisabled ? "secondary btn-custom-disabled" : "primary btn-custom"}`}
              disabled={buttonDisabled}
            >
              Update
            </button>
            <button 
              type="button" 
              className="btn btn-primary btn-custom ml-3"
              onClick={deleteSmurf}
            >
              Delete
            </button>
          </div>
        </div>

      </form>
    </>
  }
  
  return <>
    {props.smurfs && <Form smurf={props.smurfs.filter(smurf => smurf.id === parseInt(params.id))} apiUrl={apiUrl} />}
  </>
}

export default connect(mapStateToProps, { getSmurfs })(Smurf);