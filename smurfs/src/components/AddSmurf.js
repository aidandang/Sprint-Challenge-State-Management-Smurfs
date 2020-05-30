import React from 'react';
import * as Yup from "yup";
// a custom hook to handle form inputs
import { useForm } from '../hooks/useForm';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

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

// main component
export default function AddSmurf(props) {
  const location = useLocation();
  const history = useHistory();

  const apiUrl = 'http://localhost:3333/smurfs'

  // set custom form hook
  const [
    formData, 
    setFormData, 
    errors, 
    handleChanges, 
    buttonDisabled
  ] = useForm(formState, formSchema, apiUrl);

  // Form submit function
  const formSubmit = e => {
    e.preventDefault();

    axios.post(apiUrl, formData)
      .then(res => {
        setFormData(formState);
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
            {errors.age.length > 0 ? <p className="mt-2 text-danger">{errors.age}</p> : null}
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
            {errors.height.length > 0 ? <p className="mt-2 text-danger">{errors.height}</p> : null}
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
            Submit
          </button>
        </div>
      </div>

    </form>
  </>
}