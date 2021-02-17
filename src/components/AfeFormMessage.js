import React, { Component, Fragment } from "react";

import { LOADSTATE, SUBMITSTATE } from "./AfeFields";

export class AfeFormMessage extends Component {

    render() {
      const { error, loadState, submitState } = this.props;
      return (<Fragment>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {(loadState === LOADSTATE.LOADING) && <div className="alert alert-primary" role="info">Loading...</div>}
        {(submitState === SUBMITSTATE.SUBMITTING) && <div className="alert alert-primary" role="info">Submitting...</div>}
      </Fragment>);
    }
  
}