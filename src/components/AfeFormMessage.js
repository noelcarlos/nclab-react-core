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
        <div className="wait-spinner" data-testid="formMessageLoading" role="formMessageLoading">
           <span className="spinner-border spinner-border-xl mr-2 text-secondary-variant"></span>Cargando...
        </div>}
      {(submitState === SUBMITSTATE.SUBMITTING) && 
        <div className="wait-spinner" data-testid="formMessageSubmiting" role="formMessageSubmiting">
          <span className="spinner-border spinner-border-xl mr-2 text-secondary-variant"></span>Enviando...
        </div>}
    </Fragment>);
  }

}