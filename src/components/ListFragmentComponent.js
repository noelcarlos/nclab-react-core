import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, getFormValues, change, stopAsyncValidation } from 'redux-form';
import { LOADSTATE, SUBMITSTATE } from "../components/AfeFields";
import * as AfeFields from "../components/AfeFields";
import Pagination from "../components/Pagination";
import * as ErrorManagement from "../util/ErrorManagement";
import classNames from "classnames";

class FilterTagList extends Component {

  state = {
    showAll: false
  }

  showAll = () => {
    this.setState({ showAll: true})
  }

  hideSome = () => {
    this.setState({ showAll: false})
  }

  render() {

    const { filters, onRemove } = this.props;

    const initialElements = Object.keys(filters);
    
    const elements = this.state.showAll ? initialElements : initialElements.filter((property, i)=>i<5);

    return (
      <div className="row mb-2">
        <div className="col-md-12">
          {filters && elements.map( property => 
            <div key={property} className="badge badge-info p-2 mb-2 mr-2">
              <span className="mr-2">{filters[property].label} </span>
              <a href="/" className="btn-danger px-1" role="button" onClick={ (e) => {onRemove(property); e.preventDefault();} }>
                <i className="fa fa-close" ></i>
              </a>            
            </div>
          )}
          {filters && initialElements.length > 5 && !this.state.showAll &&
            <div className="badge badge-primary p-2 mb-2 mr-2">
              <a href="/" className="btn-primary px-1" role="button" 
                onClick={ (e) => { this.showAll(); e.preventDefault();} }>{initialElements.length - 5} Más...</a>
            </div>
          }
          {filters && initialElements.length > 5 && this.state.showAll &&
            <div className="badge badge-primary p-2 mb-2 mr-2">
              <a href="/" className="btn-primary px-1" role="button" 
                onClick={ (e) => { this.hideSome(); e.preventDefault();} }>Ocultar {initialElements.length - 5}</a>
            </div>
          }
        </div>
      </div>
    );
  }

};

export default class ListFragmentComponent extends Component {
  state = {
    loadState: LOADSTATE.LOADING,
    submitState: SUBMITSTATE.NONE,
    currentPage: 1,
    showFilterDialog: false,
    filters : { }
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    
    if (this.props.onRef) this.props.onRef(this);

    await this.onLoad(1);
  }

  onLoad = async(currentPage) => {
    try {
      this.setState({ loadState: LOADSTATE.LOADING, currentPage: currentPage });

      this.props.onLoad(currentPage, this.state.filters, this.state.sort);

      this.setState({ loadState: LOADSTATE.LOADED_OK });
    } catch (error) {
      this.setState({ loadState: LOADSTATE.LOADED_KO });
      this.props.dispatch(stopAsyncValidation(this.props.form, ErrorManagement.getAllErrors(error)));
      //this.props.stopAsyncValidation(this.props.form, { _error: ErrorManagement.getMessage(error) });
    }
  }

  static createBooleanFilter(filter, property, label, value) {
    if (value !== null && value !== undefined && property !== null && property !== undefined) {
      filter[property] = { type: "MATCH", field: property, label: label + " : " 
        + (value.toLowerCase() === "true" ? "Si" : "No"), term: (value.toLowerCase() === "true" ? true : false)};
    }
  }

  static createMatchFilter(filters, property, label, value) {
    if (value !== null && value !== undefined && property !== null && property !== undefined) {
      filters[property] = { type: "MATCH", field: property, 
        label: label + " : " + value, term: value };
    }
  }

  static createTermFilter(filters, property, label, value) {
    if (value !== null && value !== undefined && property !== null && property !== undefined) {
      filters[property] = { type: "TERM", field: property, 
        label: label + " : " + value, term: value };
    }
  }

  reload = async() => {
    this.onLoad(this.state.currentPage);
  }

  onSubmit = (fv) => {
    this.setState({ filters: this.props.onRebuildFilters(fv), sort: fv.sort }, () => {
      this.onLoad(1);
    });

    this.setState({showFilterDialog: false});
    window.$('#modalFilterDialog').modal('hide');
  }

  onSearch = (formValues) => {
    this.onSubmit(formValues);
  }

  onSortChange = (sort) => {
    this.setState({ sort: sort }, () => {
      this.onLoad(1);
    });
  }

  onResetEditDialog = () => {
    this.props.initialize( this.props.initialValues );
  }

  onShowEditDialog = () => {
    this.setState({showEditDialog: true});
    this.props.onCreate(null);
    window.$('#modalEditDialog').modal('show');
  }

  onCloseEditDialog = () => {
    this.setState({showEditDialog: false});
    window.$('#modalEditDialog').modal('hide');
  }

  onResetFilterDialog = () => {
    this.props.initialize( this.props.initialValues );
  }

  onShowFilterDialog = () => {
    this.setState({showFilterDialog: true});
    window.$('#modalFilterDialog').modal('show');
  }

  onCloseFilterDialog = () => {
    this.setState({showFilterDialog: false});
    window.$('#modalFilterDialog').modal('hide');
  }

  onRemoveFilter = (property) => {
    delete this.state.filters[property];
    this.setState({filters: this.state.filters}, async () => {
      await this.props.dispatch(change(this.props.form, property, null));
      this.onLoad(1);
    });
    
  }

  onPageChange = (newPage) => {
    this.setState({currentPage: newPage}, () => {
      this.reload();
    });
  }

  setShowItemsAsTable = (newState) => {
    if (newState != this.props.showItemsAsTable)
      this.props.onChangeShowItemsAsTable(newState);
  }

  render() {

    const { elements, handleSubmit, error, showItemsAsTable } = this.props;

    return (
      <Fragment>
          <div className="h3 card-title">{this.props.title}</div>

          {!this.state.showFilterDialog && error && <div className="alert alert-danger" role="alert">{error}</div>}

          {elements == null && !error &&
          <div className="h114">No ha contratado ningun producto</div>}

          {elements != null &&
          <Fragment> 

            <div className="row">
              <div className="col-md-12 form-row">
                <button className="btn btn-primary mb-2" onClick={(e) => { this.onShowEditDialog(null); e.preventDefault(); }}>
                    <i className="fa fa-pencil"></i> Alta
                </button>

                {this.props.quickSearchFragment}

                <button className="btn btn-primary ml-2 mb-2" onClick={handleSubmit(this.onSearch)}>
                    <i className="fa fa-search"></i> Buscar
                </button>

                <button className="btn btn-primary ml-2 mb-2" onClick={(e) => { this.onShowFilterDialog(); e.preventDefault(); }}>
                    <i className="fas fa-filter"></i> Filtrar
                </button>
                
                {this.props.sortFragment}

                <button className={classNames(["btn", {
                  "btn-primary": this.props.showItemsAsTable, 
                  "btn-secondary": !this.props.showItemsAsTable
                  }, "ml-2", "mb-2"])} 
                  onClick={() => this.setShowItemsAsTable(true)}>
                    <i className="fa fa-list"></i>
                </button>
                <button className={classNames(["btn", {
                  "btn-primary": !this.props.showItemsAsTable, 
                  "btn-secondary": this.props.showItemsAsTable
                  }, "ml-2", "mb-2"])} 
                  onClick={() => this.setShowItemsAsTable(false)}>
                    <i className="fa fa-th-large"></i>
                </button>

              </div>
            </div>

            <FilterTagList filters={this.state.filters} onRemove={(property) => this.onRemoveFilter(property)} />

            <div className="row">
              <div className="col-md-12 form-row">
                {this.props.quickFilterFragment}
              </div>
            </div>

           {this.props.showItemsAsTable && 
            <div className="scrollable-table-container">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    {this.props.headers.map(data => <th key={data.label} align={data.align} scope="col">{data.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {elements != null && elements.map(data => this.props.rowFragment(data))}   
                </tbody>
              </table>
            </div>
            }
            {!this.props.showItemsAsTable && 
            <div className="d-flex flex-wrap">
                {elements != null && elements.map(data => this.props.cardFragment(data))}   
            </div>
            }

            <div className="row mt-2">
              <div className="col-md-12">
                <Pagination
                  hideFirstLastPages
                  pageRangeDisplayed={5}
                  activePage={this.state.currentPage}
                  itemsCountPerPage={10}
                  totalItemsCount={this.props.totalElements}
                  onChange={this.onPageChange}
                />
              </div>
            </div>

          </Fragment>
          }
          
          <div className="modal" id="modalFilterDialog" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Configuración del filtro</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">    
                    {this.state.showFilterDialog && error && <div className="alert alert-danger" role="alert">{error}</div>}
                      {this.props.filterFragment}
                      <div className="modal-footer">               
                        <button type="button" className="btn btn-secondary" onClick={this.onCloseFilterDialog}>
                          Cerrar
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={this.onResetFilterDialog}>
                          Limpiar filtros
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit(this.onSearch)}>
                          Aplicar filtros
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
