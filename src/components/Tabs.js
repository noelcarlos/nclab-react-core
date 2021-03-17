import React, { Component, Fragment } from "react";

export class TabItem extends Component {

    static defaultProps = {
      active: false,
      showIfSmall: true
    };
  
    render() {
      const { id, title, active, showIfSmall } = this.props;
      return (<Fragment>
        {this.props.children}
      </Fragment>);
    }
  
  }
  
  export class TabList extends Component {
    state = {
      width: 1200,
      heigth: 900
    };
  
    updateDimensions = () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
  
    componentDidMount() {
      this.updateDimensions();
      window.addEventListener('resize', this.updateDimensions);
    }
  
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }
  
    render() {
      return (<Fragment>
        <ul id={this.props.id && "tab-menu"} className={"nav nav-tabs " + (this.props.className ? this.props.className : "")} role="tablist">  
          {this.props.children.map((child, index) => (
            <Fragment key={index}>
              {child.props && (child.props.showIfSmall || this.state.width < 992) && <li key={index} className="nav-item">
                <a className={child.props.active ? "nav-link active" : "nav-link"} 
                  id={child.props.id + '-tab'} data-toggle="tab" 
                  href={(child.props.href !== undefined) ? child.props.href: '#' + child.props.id} 
                  role="tab" 
                  onClick={(e) => {if (child.props.onClick !== undefined) child.props.onClick(e, child.props.id); }}
                  aria-controls={child.props.id} 
                  aria-selected={child.props.active}>{child.props.title}</a>
              </li>}
            </Fragment>
          ))}
        </ul>
        <div className="tab-content pt-4">
          {this.props.children.map((child, index) => (
            <Fragment key={index}>
            {child.props && (child.props.showIfSmall || this.state.width < 992) &&
            <div className={(child.props.active ? "tab-pane fade show active" : "tab-pane fade")}
               id={child.props.id} role="tabpanel" aria-labelledby={child.props.title}>
              {child}
            </div>}
            </Fragment>
          ))}
        </div>
      </Fragment>);
    }
  
  }