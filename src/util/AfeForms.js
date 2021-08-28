import * as ErrorManagement from "./ErrorManagement";
import { stopAsyncValidation, SubmissionError } from 'redux-form';
import { LOADSTATE, SUBMITSTATE } from "../components/AfeFields";

export const loadData = async (formInstance, fn, dispatch) => {
    try {
        formInstance.setState({ loadState: LOADSTATE.LOADING });
        await fn();
        formInstance.setState({ loadState: LOADSTATE.LOADED_OK });
    } catch (error) {
        formInstance.setState({ loadState: LOADSTATE.LOADED_KO });
        const allErrors = ErrorManagement.getAllErrors(error);
        
        if (formInstance.form === undefined && formInstance.name === undefined) {
            console.warn("'form' field or 'name' field does not exist on this instance, error will not be dispatched properly", formInstance);
        }
        
        if (dispatch === undefined) {
            dispatch = formInstance.props.dispatch;
        }
        if (dispatch !== undefined) {
            await dispatch(stopAsyncValidation(formInstance.form !== undefined ? formInstance.form : formInstance.name, allErrors));
        } else {
            console.error("Ha ocurrido un error de configuración, no se ha informado el dispatch")
        }
    }
}

export const submitData = async (formInstance, fn) => {
    try {
        formInstance.setState({ loadState: SUBMITSTATE.SUBMITTING });
        
        const navigateAway = await fn();

        if (navigateAway === false)
            formInstance.setState({ loadState: SUBMITSTATE.SUBMITTED_OK });
            
    } catch (error) {
        formInstance.setState({ loadState: SUBMITSTATE.SUBMITTED_KO });
        const errorInfo = ErrorManagement.getAllErrors(error);
        throw new SubmissionError(errorInfo);
    }
}

export const isSubmitting = (formInstance) => {
    return formInstance.state.loadState === SUBMITSTATE.SUBMITTING;
}

export const showDialog = (formName) => {
    window.$('#' + formName + 'Dialog').modal('show');
}

export const hideDialog = (formName) => {
    window.$('#' + formName + 'Dialog').modal('hide');
}

