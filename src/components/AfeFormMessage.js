import React, { Component, Fragment } from "react";

import { LOADSTATE, SUBMITSTATE } from "./AfeFields";

export class AfeFormMessage extends Component {

    render() {
      const { error, loadState, submitState } = this.props;
      return (<Fragment>
        {error && <div className="alert alert-danger" data-testid="formMessageAlert" role="formMessageAlert">{error}</div>}
        {(loadState === LOADSTATE.LOADING) && <div className="alert alert-primary" data-testid="formMessageLoading" role="formMessageLoading">Loading...</div>}
        {(submitState === SUBMITSTATE.SUBMITTING) && <div className="alert alert-primary" data-testid="formMessageSubmiting" role="formMessageSubmiting">Submitting...</div>}
      </Fragment>);
    }
  
}