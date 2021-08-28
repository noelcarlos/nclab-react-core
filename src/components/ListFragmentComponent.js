import React, { Component, Fragment } from "react";
import { LOADSTATE, SUBMITSTATE } from "../components/AfeFields";
import Pagination from "../components/Pagination";
import classNames from "classnames";

export class FilterTagList extends Component {

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
            (filters[property].visible === undefined || filters[property].visible === true) && <div key={property} className="badge badge-info p-2 mb-2 mr-2">
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

}

export class ListFragmentViewType extends Component {

  setViewType = (viewType) => {
    if (viewType != this.props.viewType)
      this.props.onChangeViewType(viewType);
  }

  render() {

    const { viewType, enableListButton, enableCardButton, enableFullButton } = this.props;

    return (<>
        {enableListButton && 
          <button className={classNames(["btn", {
            "btn-primary": viewType === ListFragmentComponent.VIEW_TYPE_LIST, 
            "btn-secondary": viewType !== ListFragmentComponent.VIEW_TYPE_LIST
            }, "ml-2", "mb-2"])} 
            onClick={() => this.setViewType(ListFragmentComponent.VIEW_TYPE_LIST)}>
              <i className="fa fa-list"></i>
          </button>
        }
        {enableCardButton && 
          <button className={classNames(["btn", {
            "btn-primary": viewType === ListFragmentComponent.VIEW_TYPE_CARD, 
            "btn-secondary": viewType !== ListFragmentComponent.VIEW_TYPE_CARD
            }, "ml-2", "mb-2"])} 
            onClick={() => this.setViewType(ListFragmentComponent.VIEW_TYPE_CARD)}>
              <i className="fa fa-th-large"></i>
          </button>
        }
        {enableFullButton && 
        <button className={classNames(["btn", {
          "btn-primary": viewType === ListFragmentComponent.VIEW_TYPE_FULL, 
          "btn-secondary": viewType !== ListFragmentComponent.VIEW_TYPE_FULL
          }, "ml-2", "mb-2"])} 
          onClick={() => this.setViewType(ListFragmentComponent.VIEW_TYPE_FULL)}>
            <i className="fa fa-th-large"></i>
        </button>
        }
    </>
    );
  }
}

export class ListFragmentFilterBuilder {

  filters = {};

  constructor() {
  }

  boolean = (property, label, value) => {
    if (value !== null && value !== undefined && property !== null && property !== undefined) {
      this.filters[property] = { type: "MATCH", field: property, label: label + " : " 
        + (value.toLowerCase() === "true" ? "Si" : "No"), term: (value.toLowerCase() === "true" ? true : false)};
    }
    return this;
  }

  match = (property, label, value) =>  {
    if (value !== null && value !== undefined && property !== null && property !== undefined) {
      this.filters[property] = { type: "MATCH", field: property, 
        label: label + " : " + value, term: value };
    }
    return this;
  }

  term = (property, label, value) =>  {
    if (value !== null && value !== undefined && property !== null && property !== undefined) {
      this.filters[property] = { type: "TERM", field: property, 
        label: label + " : " + value, term: value };
    }
    return this;
  }

  range = (property, label, rangeStart, rangeEnd) =>  {
    if (((rangeStart !== null && rangeStart !== undefined) || (rangeEnd !== null && rangeEnd !== undefined)) && property !== null && property !== undefined) {
      this.filters[property] = { type: "TERM", field: property, 
        label: label + " : " + rangeStart + "-" + rangeEnd, rangeStart:rangeStart, rangeEnd:rangeEnd };
    }
    return this;
  }
  ListFragmentFilterBuilder

  build = () =>  {
    return this.filters;
  }

}

export default class ListFragmentComponent extends Component {
  state = {
    loadState: LOADSTATE.LOADING,
    submitState: SUBMITSTATE.NONE,
    currentPage: 1,
    viewType: ListFragmentComponent.VIEW_TYPE_LIST,
    filters : { }
  }

  static VIEW_TYPE_LIST = 'LIST';
  static VIEW_TYPE_CARD = 'CARD';
  static VIEW_TYPE_FULL = 'FULL';

  async componentDidMount() {
    window.scrollTo(0, 0);
    
    if (this.props.onRef) this.props.onRef(this);

    //await this.onLoad(1);
  }

  onLoad = async(currentPage) => {
    this.props.onLoad(currentPage/*, this.state.filters, this.state.sort*/);
  }

  /*
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
    
  }*/

  onPageChange = (newPage) => {
    this.setState({currentPage: newPage}, () => {
      this.onLoad(this.state.currentPage);
    });
  }

  render() {

    const { elements, error, tableClassName } = this.props;

    return (
      <Fragment>
          {!this.state.showFilterDialog && error && <div className="alert alert-danger" role="alert">{error}</div>}

          {elements == null && !error &&
          <div className="alert alert-warn">No ha contratado ningun producto</div>}

          {elements != null &&
          <Fragment> 

            <div className="row">
              <div className="col-md-12">
                {this.props.topFragment}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 form-row">
                {this.props.filterTagFragment}
              </div>
            </div>

           {this.props.viewType === ListFragmentComponent.VIEW_TYPE_LIST && this.props.rowFragment &&
            <div className={tableClassName ? tableClassName : "scrollable-table-container"}>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    {this.props.headers.map(data => <th key={data.label} align={data.align} style={{textAlign:''+data.align}} scope="col">{data.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {elements != null && elements.map(data => this.props.rowFragment(data))}   
                </tbody>
              </table>
            </div>
            }
            {this.props.viewType === ListFragmentComponent.VIEW_TYPE_CARD && this.props.cardFragment &&
            <div className={this.props.cardContainerStyle ? this.props.cardContainerStyle : "d-flex flex-wrap"} >
                {elements != null && elements.map(data => this.props.cardFragment(data))}   
            </div>
            }
            {this.props.viewType === ListFragmentComponent.VIEW_TYPE_FULL && this.props.fullFragment &&
            <div className="d-flex flex-wrap">
                {elements != null && elements.map(data => this.props.fullFragment(data))}   
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
          
      </Fragment>
    );
  }
}
