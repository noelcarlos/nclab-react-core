import React from "react";
import RangeSlider from 'react-bootstrap-range-slider';
import classNames from "classnames";
import { change } from "redux-form";

export const Input = ({
  input,
  label,
  containerStyle = "col-sm",
  placeholder,
  type,
  meta: { touched, error, warning }
}) => {
  const classError = (touched && (error || warning)) ? "form-control col-md-12 mb-2 is-invalid" : "form-control col-md-12 mb-2";
  return (
    <div className={containerStyle}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <input data-testid={input.name} {...input} className={classError} placeholder={placeholder} type={type} />
        {touched &&
          ((error && <div className="text-danger" role="alert">{error}</div>) ||
            (warning && <div className="text-warning" role="alert">{warning}</div>))}
    </div>
  );
};

export const Select = ({
  input,
  containerStyle = "col-sm",
  meta: { touched, error, warning },
  input: { onChange, value, ...restInput },
  label,
  children,
  ...restProps
}) => {
  const classError = (touched && (error || warning)) ? "form-control col-md-12 mb-2 is-invalid" : "form-control col-md-12 mb-2";
  return (
    <div className={containerStyle}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <select
        className={classError} 
        {...restProps}
        value={value}
        onChange={value => onChange(value)}
        {...restInput}
      >
        {children}
      </select>
      {touched &&
        ((error && <div className="text-danger" role="alert">{error}</div>) ||
          (warning && <div className="text-warning" role="alert">{warning}</div>))}
    </div>
  );
};

export const Slider = ({
  input,
  label,
  placeholder,
  containerStyle = "col-sm",
  type,
  min=0,
  max=100,
  step=1,
  onChange,
  meta: { touched, error, warning }
}) => {
  const classError = (touched && (error || warning)) ? "form-control col-md-12 mb-2 is-invalid" : "form-control col-md-12 mb-2";
  return (
    <div className={containerStyle}>
      {label && <label htmlFor={input.name}>{label}</label>}

      <div className="row">
        <div className="col-md-4">      
          <input {...input} className={classError} placeholder={placeholder} type={type} 
            onChange={changeEvent => { 
              input.onChange(changeEvent.target.value); 
              if (onChange!= null) onChange(changeEvent.target.value); }} />
            {touched &&
              ((error && <div className="text-danger" role="alert">{error}</div>) ||
                (warning && <div className="text-warning" role="alert">{warning}</div>))}
        </div>
  
        <div className="col-md-8">
          <RangeSlider
            value={Number(input.value)} min={min} max={max} tooltip='off' step={step}
            onChange={changeEvent => {
              if (input.onChange !== null)
                input.onChange(changeEvent.target.value); 
              if (onChange!= null) onChange(changeEvent.target.value); }}
          />
        </div>

      </div>  
      
    </div>
  );
};

export const Checkbox = ({
  input,
  label,
  placeholder,
  containerStyle = "col-sm",
  children,
  meta: { touched, error, warning }
}) => {
  const classError = (touched && (error || warning)) ? "form-check-input is-invalid" : "form-check-input";
  
  return (
    <div className={containerStyle}>
      {label && <div className="form-control col-md-12 border border-0">
        {label && <label htmlFor={input.name}>{label}</label>}
      </div>}
      <div className="d-flex flex-column ml-3">
        <div className="p-1">
          <input {...input} className={classError} type="checkbox" />
          {placeholder && <label htmlFor={input.name}>{placeholder}</label>}
          {children}
        </div>
      </div>
        {touched &&
          ((error && <div className="p-1"><div className="text-danger" role="alert">{error}</div></div>) ||
            (warning && <div className="text-warning" role="alert">{warning}</div>))}
    </div>
  );
};

export const Radio = ({
  input,
  label, value,
  containerStyle = "col-sm",
  children,
  meta: { touched, error, warning }
}) => {
  const classError = (touched && (error || warning)) ? "form-check-input is-invalid" : "form-check-input";

  //console.log("name=", input.name);
  //console.log("input value=", input.value);
  //console.log("value=", value);

  return (
    <div className={containerStyle}>
       
      <div className="d-flex flex-column ml-3">
        <div className="p-1">
        <label>
          <input {...input} className={classError} type="radio" />
          
          {/*checked={input && value === input.value} */}
          {label ? label : null}{children}
        </label>
        </div> 
      </div> 
        {touched &&
          ((error && <div className="text-danger" role="alert">{error}</div>) ||
            (warning && <div className="text-warning" role="alert">{warning}</div>))}
    </div>
  );
};

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

export const File = ({
  input,
  label,
  containerStyle = "col-sm",
  onChange,
  onBlur,
  placeholder,
  meta: { touched, error, warning }
}) => {
  
  const classError = (touched && (error || warning)) ? "form-control col-md-12 mb-2 is-invalid" : "form-control col-md-12 mb-2";
  return (
    <div className={containerStyle}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <input 
        onChange={(e) => {
          input.onChange(e.target.files[0])
        }}
        onBlur={adaptFileEventToValue(onBlur)}
        {...input} 
        value={input.value === '' || input.value == null ? undefined : undefined}
        className={classError} 
        placeholder={placeholder} 
        type="file" />
        {touched &&
          ((error && <div className="text-danger" role="alert">{error}</div>) ||
            (warning && <div className="text-warning" role="alert">{warning}</div>))}
    </div>
  );
};

export const MenuWithIcons = ({
  input,
  label,
  placeholder,
  containerStyle = "col-sm-1",
  options=[],
  meta: { touched, error, warning, dispatch, form }
}) => {
  const classError = (touched && (error || warning)) ? "form-control col-md-12 mb-2 is-invalid" : "form-control col-md-12 mb-2";

  return (
    <div className={containerStyle}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <input {...input} className={classError} placeholder={placeholder} type="hidden" /> 

      <button type="button" className="btn btn-primary dropdown-toggle ml-2" data-toggle="dropdown" 
        aria-haspopup="true" aria-expanded="false">
        {options.map( item =>  item.value === input.value ? <span key={item.value}>
          <span className="mr-2">{item.label}</span>
          {item.asc ? <i className="fas fa-long-arrow-alt-up"></i> : <i className="fas fa-long-arrow-alt-down"></i>}
          </span> : null
        )}
          
      </button>
      <div className="dropdown-menu">
        {options.map( (item, index) => 
          <a key={item.value} className="dropdown-item"  href="#"
            onClick={ async (clickEvent) => {
                const elValor = item.value;
                await dispatch(change(form, input.name, elValor));
                if (input.onChange !== null)
                  input.onChange(elValor);
            }}>
          <span className="mr-2">{item.label} </span>
          {item.asc ? <i className="fas fa-long-arrow-alt-up"></i> : <i className="fas fa-long-arrow-alt-down"></i>}          
          </a>)
        }
      </div>
      
    </div>
  );
};

export const MenuGroupButtons = ({
  input,
  label,
  placeholder,
  containerStyle = "col-sm-1",
  options=[],
  meta: { touched, error, warning, dispatch, form }
}) => {
  const classError = (touched && (error || warning)) ? "form-control col-md-12 mb-2 is-invalid" : "form-control col-md-12 mb-2";

  return (
    <div className={containerStyle}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <input {...input} className={classError} placeholder={placeholder} type="hidden" /> 

      <div className="btn-group mb-2" role="group">
        {options.map(data => 
          <button key={data.id} type="button" className={classNames(
            "btn",
            {
              "btn-secondary": data.id !== input.value,
              "btn-primary": data.id === input.value
            })} 
            onClick={ async (event) => { await dispatch(change(form, input.name, data.id)); input.onChange(data.id);  } }
            >{data.label} {data.counter && <span className="badge badge-info"> {data.counter ? data.counter : 0} </span>}</button>
        )}
      </div>
    </div>
  );

};

export class CheckboxGroup extends React.Component {

  checkboxGroup() {

      // for vertical layout containerStyle = "col-sm" 
      let {label, required, options, input, meta, containerStyle = "d-flex flex-row" } = this.props;

      return (<div className={containerStyle}>{options.map((option, index) => {
          return (
              <div className="checkbox mr-2" key={index}>
                <label>
                    <input type="checkbox"
                          name={`${input.name}[${index}]`}
                          value={option.id}
                          checked={input.value.indexOf(option.id) !== -1}
                          onChange={(event) => {
                              const newValue = [...input.value];
                              if (event.target.checked) {
                                  newValue.push(option.id);
                              } else {
                                  newValue.splice(newValue.indexOf(option.id), 1);
                              }

                              return input.onChange(newValue);
                          }}/>
                    <span className="ml-2">{option.name}</span>
                </label>          
            </div>)
      })}
      </div>);
  }

  render() {
      return (
          <div>
              {this.checkboxGroup()}
          </div>
      )
  }
}

export const LOADSTATE = {
  LOADING: 'LOADING',
  LOADED_OK: 'LOADED_OK',
  LOADED_KO: 'LOADED_KO',
  LOADED_SECURITY_ERROR: 'LOADED_SECURITY_ERROR'
};

export const SUBMITSTATE = {
  NONE: 'NONE',
  SUBMITTING: 'SUBMITTING',
  SUBMITTED_OK: 'SUBMITTED_OK',
  SUBMITTED_KO: 'SUBMITTED_KO',
  SUBMITTED_SECURITY_ERROR: 'SUBMITTED_SECURITY_ERROR'
};