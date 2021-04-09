import React, { Component } from "react";
import classNames from "classnames";

export default class MenuStageButtons extends Component {

    render() {
  
      const { options, value, onChange } = this.props;
  
      return (
        <ul className={"stage-menu " + (this.props.className ? this.props.className : "")}>
          {options.map(data => 
            <li>
            <a key={data.id} href="#" className={classNames(
              {
                "current": data.id === value
              })} onClick={ () => onChange(data.id, value) } 
              >{data.label} {data.counter !== undefined && <span className="badge badge-info"> {data.counter !== undefined ? data.counter : 0} </span>}</a>
            </li>
          )}
          <li><a href="" className="current" >&nbsp;</a></li>
        </ul>
      );
    }
  
  }