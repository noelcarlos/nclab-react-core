import React, { Component, Fragment } from "react";

import { LOADSTATE, SUBMITSTATE } from "./AfeFields";

export class AfeFormMessage extends Component {

    render() {
      const { error } = this.props;

      return (<Fragment>
        {error && <div className="alert alert-danger" data-testid="formMessageAlert" role="formMessageAlert">{error}</div>}
      </Fragment>);
    }
  
}

export class AfeLoading extends Component {
  render() {
    const { loadState, submitState } = this.props;

    return (<Fragment>
      {(loadState === LOADSTATE.LOADING) && 
        <div data-testid="formMessageLoading" role="formMessageLoading">
           <span className="spinner-border spinner-border-xl mr-2 text-primary"></span>
        </div>}
      {(submitState === SUBMITSTATE.SUBMITTING) && 
        <div data-testid="formMessageSubmiting" role="formMessageSubmiting">
          <span className="spinner-border spinner-border-xl mr-2 text-primary"></span>
        </div>}
    </Fragment>);
  }

}