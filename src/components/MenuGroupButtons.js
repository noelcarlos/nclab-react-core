import React, { Component } from "react";
import classNames from "classnames";

export default class MenuGroupButtons extends Component {

    render() {
  
      const { options, value, onClick } = this.props;
  
      return (
        <div className="btn-group mb-2" role="group">
          {options.map(data => 
            <button key={data.id} type="button" className={classNames(
              "btn",
              {
                "btn-secondary": data.id !== value,
                "btn-primary": data.id === value
              })} onChange={ () => onClick(data.id, value) } >{data.label} <span className="badge badge-info"> {data.counter ? data.counter : 0} </span></button>
          )}
        </div>
      );
    }
  
  };