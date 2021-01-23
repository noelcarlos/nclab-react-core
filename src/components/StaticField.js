import React, { Component, Fragment } from "react";

export class StaticField extends Component {
  render() {

    return (
      <Fragment>
        <div className="col-md-3 text-right font-weight-bold">{this.props.label} :</div>
        <div className="col-md-3 text-break">{this.props.children}</div>
      </Fragment>
    );
  }
}