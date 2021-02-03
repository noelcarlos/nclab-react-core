import React, { Component, Fragment } from "react";
import { stopAsyncValidation } from 'redux-form';
import { LOADSTATE, SUBMITSTATE } from "./AfeFields";
import * as ErrorManagement from "../util/ErrorManagement";

class EditPopupFragmentComponent extends Component {
  state = {
    loadState: LOADSTATE.LOADING,
    submitState: SUBMITSTATE.NONE
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.onRef) this.props.onRef(this);
  }

  onLoad = async(id) => {
    if (this.props.onLoad !== undefined) {
      try {
        this.setState({ loadState: LOADSTATE.LOADING });
        this.props.onLoad(id);
        this.setState({ loadState: LOADSTATE.LOADED_OK });
      } catch (error) {
        this.setState({ loadState: LOADSTATE.LOADED_KO });
        this.props.dispatch(stopAsyncValidation(this.props.form, ErrorManagement.getAllErrors(error)));
      }
      window.$('#' + this.props.form + 'Dialog').modal('show');
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
        this.props.dispatch(stopAsyncValidation(this.props.form, ErrorManagement.getAllErrors(error)));
        //this.props.stopAsyncValidation(this.props.form, ErrorManagement.getAllErrors(error));
      }
    }
  }

  onResetEditDialog = () => {
    if (this.props.onSubmit !== undefined) {
      this.props.onReset();
    }
    //this.props.initialize( this.props.initialValues );
  }

  onShowEditDialog = (id) => {
    this.setState({showEditDialog: true});
    window.$('#' + this.props.form + 'Dialog').modal('show');
  }

  onCloseEditDialog = () => {
    this.setState({showEditDialog: false});
    this.onResetEditDialog();
    window.$('#' + this.props.form + 'Dialog').modal('hide');
  }

  render() {

    const { handleSubmit, error } = this.props;

    return (
      <Fragment>
          <div className="modal" id={this.props.form + 'Dialog'} role="dialog" aria-hidden="true">
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
                      <button type="button" className="btn btn-secondary" onClick={this.onCloseEditDialog}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary" 
                        onClick={handleSubmit(formValues => this.onSubmit(formValues))}>
                        Guardar
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