import React, { Component, Fragment } from "react";

export class Grid extends Component {
    render() {
        return (
            <div className="card-grid">{this.props.children}</div>
        );
    }
}

export class FieldContainer extends Component {
    render() {
        const { cols, className } = this.props;

        let baseStyle = "card-fields-1";

        if (cols == 2) baseStyle = "card-fields-2";

        return (
            <div className={"card-fields " + baseStyle + " " + className}>{this.props.children}</div>
        );
    }
}

export class FieldText extends Component {
    render() {
        return (
            <div>
                <div className="text-right font-weight-bold mx-1">{this.props.label} :</div>
                <div className="text-left text-break mx-1">{this.props.children}</div>
            </div>
        );
    }
}

export class FieldButtons extends Component {
    render() {
        return (
            <>
                <div className="card-buttons mx-1">{this.props.children}</div>
            </>
        );
    }
}