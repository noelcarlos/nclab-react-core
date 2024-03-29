import React from "react";
import RangeSlider from 'react-bootstrap-range-slider';
import { change, touch } from "redux-form";
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import classNames from "classnames";

export const Input = ({
  input,
  label,
  containerStyle = "col-sm",
  placeholder,
  type,
  disabled,
  meta: { touched, error, warning }
}) => {
  const classError = (touched && (error || warning)) ? "form-control col-md-12 mb-2 is-invalid" : "form-control col-md-12 mb-2";
  return (
    <div className={containerStyle}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <input data-testid={input.name} {...input} className={classError} placeholder={placeholder} type={type} disabled={disabled}/>
        {touched &&
          ((error && <div className="text-danger" role="alert">{error}</div>) ||
            (warning && <div className="text-warning" role="alert">{warning}</div>))}
    </div>
  );
};

export const InputArea = ({
  input,
  label,
  containerStyle = "col-sm",
  placeholder,
  rows,
  disabled,
  meta: { touched, error, warning }
}) => {
  const classError = (touched && (error || warning)) ? "form-control col-md-12 mb-2 is-invalid" : "form-control col-md-12 mb-2";
  return (
    <div className={containerStyle}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <textarea data-testid={input.name} {...input} className={classError} placeholder={placeholder} rows={rows} disabled={disabled}/>
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
  disabled,
  options,
  optionLabel = "label",
  optionId = "id",
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
        onChange={ v => onChange(v)}
        disabled={disabled}
        {...restInput}
      >
        {children}
        {options && options.map(data => <option key={data[optionId]} value={data[optionId]}>{data[optionLabel]}</option>)}
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
  disabled,
  meta: { touched, error, warning }
}) => {
  const classError = (touched && (error || warning)) ? "form-check-input is-invalid" : "form-check-input";

  return (
    <div className={containerStyle}>
      {label && <div className="form-control col-md-12 border border-0">
        {label && <label htmlFor={input.name}>{label}</label>}
      </div>}
      <div className="d-flex flex-column ml-3">
        <div className="d-flex align-items-center">
          <input {...input} className={classError} type="checkbox" 
            checked={input.value} disabled={disabled} />
          {placeholder && <label htmlFor={input.name}>{placeholder}</label>}
          {children}
        </div>
      </div>
        {touched &&
          ((error && <div className="text-danger" role="alert">{error}</div>) ||
            (warning && <div className="text-warning" role="alert">{warning}</div>))}
    </div>
  );
};

export const Radio = ({
  input,
  label, value,
  containerStyle = "col-sm",
  children,
  disabled,
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
          <input {...input} className={classError} type="radio" disabled={disabled} />
          
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
  const classError = (touched && (error || warning)) ? "col-md-12 px-0 mb-2 is-invalid" : "col-md-12 px-0 mb-2";
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

const handleOnImageChange = (e, onImageChange) => {
  console.log("cambiando impage");
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  reader.onloadend = () => {
    onImageChange(file, reader.result);
  }

  reader.readAsDataURL(file)
}

export const Image = ({
  input,
  label,
  containerStyle = "col-sm",
  onChange,
  onBlur,
  onImageChange,
  placeholder,
  meta: { touched, error, warning }
}) => {
  const classError = (touched && (error || warning)) ? "col-md-12 px-0 mb-2 is-invalid" : "col-md-12 px-0 mb-2";
  return (
    <div className={containerStyle}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <input 
        {...input} 
        onChange={(e) => {
          //onImageChange(e.target.files[0]);
          input.onChange(e.target.files[0])
          if (onImageChange)
            handleOnImageChange(e, onImageChange);
        }}
        //onBlur={adaptFileEventToValue(onBlur)}
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
            >{data.label} {data.counter !== undefined && <span className="badge badge-info"> {data.counter !== undefined ? data.counter : 0} </span>}</button>
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



export const Autocomplete = ({
  input,
  containerStyle = "col-sm",
  meta: { touched, error, warning, dispatch, form },
  input: { value, ...restInput },
  label,
  labelKey,
  options,
  selected,
  clearButton,
  placeholder,
  onChange,
  ...restProps
}) => {
  const classError = (touched && (error || warning)) ? "is-invalid" : "";

  const locateSelection = options.filter(x => x.value === input.value);

  /*console.log("input.value 1", input.value);
  console.log("locateSelection 1", locateSelection);
  console.log("locateSelection 2", [{label: "ESTONIA", value: 334}]);
  console.log("labelKey 2", locateSelection.length > 0 ? labelKey(locateSelection[0]) : '');*/
  //console.log("is equals", locateSelection == [{label: "ESTONIA", value: 334}]);

  return (
    <div className={containerStyle}>
      {label && <label htmlFor={input.name}>{label}</label>}

      <input name={input.name} type="hidden" />
      <Typeahead
        id={input.name}
        labelKey={labelKey}
        clearButton={clearButton}
        className={classError}
        //filterBy={filterBy} 
        //onInputChange={(text, e) => { console.log(text, e); }}
        //multiple
        //onChange={v => onChange(v)}
        options={options}
        placeholder={placeholder}
        selected= {locateSelection}
        //defaultInputValue = { locateSelection.length > 0 ? labelKey(locateSelection[0]) : '' }
        //inputProps = { { value: locateSelection.length > 0 ? labelKey(locateSelection[0]) : '' } }
        //defaultSelected={ (options && options.length) ? [ {label: "ESTONIA", value: 334} /*options[0]*/ ] : [ ] }
        onChange={async (item) => {
          const elValor = (item.length === 0) ? null: item[0].value;
          await dispatch(change(form, input.name, elValor));
          if (onChange !== null && onChange !== undefined)
            onChange((item.length === 0) ? null: item[0]);
        }}

        onBlur={async () => {
          await dispatch(touch(form, input.name));
        }}

      />

      {touched &&
        ((error && <div className="text-danger" role="alert">{error}</div>) ||
          (warning && <div className="text-warning" role="alert">{warning}</div>))}
    </div>

  );
};

export const AsyncAutocomplete = ({
  input,
  containerStyle = "col-sm",
  meta: { touched, error, warning, dispatch, form },
  label,
  labelKey,
  options,
  selected,
  clearButton,
  placeholder,
  onSearch,
  isLoading,
  onChange,
  ...restProps
}) => {
  const classError = (touched && (error || warning)) ? "is-invalid" : "";

  const locateSelection = options.filter(x => x.value === input.value);
  const defaultInputValue = (locateSelection.length === 0) ? undefined : labelKey(locateSelection[0]);
  
  //console.log("options", options[2]);
  console.log("input.value", input.value);
  console.log("locateSelection", locateSelection);
  console.log("defaultInputValue", defaultInputValue);

  return (
    <div className={containerStyle}>
      {label && <label htmlFor={input.name}>{label}</label>}

      <AsyncTypeahead
        id={input.name}
        labelKey={labelKey}
        clearButton={clearButton}
        onSearch={onSearch}
        className={classError}
        isLoading={isLoading}
        //filterBy={filterBy} 
        //onInputChange={(text, e) => { console.log(text, e); }}
        //multiple
        //onChange={v => onChange(v)}
        options={options}
        //placeholder={placeholder}
        //defaultInputValue = { defaultInputValue }
        selected= {(locateSelection.length === 0) ? [] : locateSelection}
        //useCache={false}
        onChange={async (item) => {
          const elValor = (item.length === 0) ? null: item[0].value;
          await dispatch(change(form, input.name, elValor));
          if (onChange !== null && onChange !== undefined)
            onChange((item.length === 0) ? null: item[0]);
        }}

        onBlur={async () => {
          await dispatch(touch(form, input.name));
        }}

      />

      {touched &&
        ((error && <div className="text-danger" role="alert">{error}</div>) ||
          (warning && <div className="text-warning" role="alert">{warning}</div>))}
    </div>

  );
};

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