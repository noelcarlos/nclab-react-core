import React, { Component, Fragment } from "react";
import { stopAsyncValidation} from 'redux-form';
import store from "../api/store"; 
import { LOADSTATE, SUBMITSTATE } from "./AfeFields";
import * as ErrorManagement from "../util/ErrorManagement";

class MessageBoxComponent extends Component {
  state = {
    loadState: LOADSTATE.LOADING,
    submitState: SUBMITSTATE.NONE
  }


  onLoad = async() => {
    if (this.props.onLoad !== undefined) {
      try {
        this.setState({ loadState: LOADSTATE.LOADING });
        this.props.onLoad();
        this.setState({ loadState: LOADSTATE.LOADED_OK });
      } catch (error) {
        this.setState({ loadState: LOADSTATE.LOADED_KO });
        store.dispatch(stopAsyncValidation(this.props.form, { _error: ErrorManagement.getMessage(error) }));
      }
    }
  }

  onSubmit = async (formValues) => {
    if (this.props.onSubmit !== undefined) {
      try {
        this.setState({ loadState: LOADSTATE.LOADING });
        await this.props.onSubmit(formValues);
        this.setState({ loadState: LOADSTATE.LOADED_OK });
        this.onCloseEditDialog();
      } catch (error) {
        this.setState({ loadState: LOADSTATE.LOADED_KO });
        store.dispatch(stopAsyncValidation(this.props.form, ErrorManagement.getAllErrors(error)));
      }
    }
  }

  onShowEditDialog = (id) => {
    this.setState({showEditDialog: true});
    window.$('#modalMessageBoxDialog').modal('show');
  }

  onCloseEditDialog = () => {
    this.setState({showEditDialog: false});
    this.onResetEditDialog();
    window.$('#modalMessageBoxDialog').modal('hide');
  }

  render() {

    return (
      <Fragment>
          <div className="modal" id="modalMessageBoxDialog" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{this.props.title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    {this.props.children}
                    <div className="modal-footer">               
                      <button type="button" className="btn btn-secondary" onClick={this.onClickCancel}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary" 
                        onClick={this.onClickAccept}>
                        Aceptar
                      </button>
                    </div> 
                </div>
                
              </div>
            </div>
          </div>

      </Fragment>
    );
  }
}

export default EditPopupFragmentComponent;