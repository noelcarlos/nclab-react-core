import React, { Component, Fragment } from "react";

class AfePopupComponent extends Component {

  async componentDidMount() {
    window.scrollTo(0, 0);

    if (this.props.onRef) 
      this.props.onRef(this);   
  }

  render() {

    const { form, onSubmit, submitButtonTitle, onCloseDialog, closeButtonTitle } = this.props;

    return (
      <Fragment>
          <div className="modal" id={form + 'Dialog'} role="dialog" aria-hidden="true" tabIndex='-1'>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{this.props.title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseDialog}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                    {this.props.children}
                    <div className="modal-footer">               
                      <button type="button" className="btn btn-secondary" onClick={onCloseDialog}>
                        {closeButtonTitle ? closeButtonTitle : "Cancelar"}
                      </button>
                      <button type="submit" className="btn btn-primary" onClick={onSubmit}>
                        {submitButtonTitle ? submitButtonTitle : "Guardar"}
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

export default AfePopupComponent;