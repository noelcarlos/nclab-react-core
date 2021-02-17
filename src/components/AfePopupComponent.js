import React, { Component, Fragment } from "react";

class AfePopupComponent extends Component {

  async componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.onRef) this.props.onRef(this);
  }

  render() {

    const { form, onSubmit, onCloseDialog } = this.props;

    return (
      <Fragment>
          <div className="modal" id={form + 'Dialog'} role="dialog" aria-hidden="true" tabindex='-1'>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{this.props.title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                    {this.props.children}
                    <div className="modal-footer">               
                      <button type="button" className="btn btn-secondary" onClick={onCloseDialog}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary" 
                        onClick={onSubmit}>
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

export default AfePopupComponent;