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
        if (stopAsyncValidation !== undefined && dispatch !== undefined) {
            dispatch(stopAsyncValidation(formInstance.form !== undefined ? formInstance.form : formInstance.name, ErrorManagement.getAllErrors(error)));
        }
    }
}

export const submitData = async (formInstance, fn) => {
    try {
        formInstance.setState({ loadState: SUBMITSTATE.SUBMITTING });
        
        const navigateAway = await fn();

        if (navigateAway === false)
            formInstance.setState({ loadState: SUBMITSTATE.SUBMITTED_OK });
            /*.then(res => {
                formInstance.setState({ loadState: SUBMITSTATE.SUBMITTED_OK });
                console.log("Hemos pillado un nada");
            })
            .catch(error => {
                console.log("Hemos pillado un asdsadda");
                formInstance.setState({ loadState: SUBMITSTATE.SUBMITTED_KO });
                if (stopAsyncValidation !== undefined && dispatch !== undefined) {
                    dispatch(stopAsyncValidation(formInstance.form, ErrorManagement.getAllErrors(error)));
                } else {
                    console.log("Hemos pillado un error");
                    throw new SubmissionError(ErrorManagement.getAllErrors(error));
                }
            });*/
        
    } catch (error) {
        formInstance.setState({ loadState: SUBMITSTATE.SUBMITTED_KO });
        throw new SubmissionError(ErrorManagement.getAllErrors(error));
    }
}

export const showDialog = (formName) => {
    window.$('#' + formName + 'Dialog').modal('show');
}

export const hideDialog = (formName) => {
    window.$('#' + formName + 'Dialog').modal('hide');
}

