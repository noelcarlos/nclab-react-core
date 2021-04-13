export const getMessage = (error) => {
    console.log("Error captured:", error);

    if (error.response && error.response.data && error.response.data.error_description) 
        return error.response.data.error_description;

    if (error.response && error.response.data && error.response.data.type) {
        console.log("Error server data:", error.response.data);
        if (error.response.data.detail)
            return error.response.data.detail;
        else
            return error.response.data.message;
    }

    if (error.message)
        return "Something went wrong!, " + error.message;
    else
        return error;
};

export const getAllErrors = (error) => {
    console.log("Error captured:", error);
    console.log("Error response:", error.response);

    if (error.response && error.response.data && error.response.data.error_description) 
        return { _error: error.response.data.error_description };

    if (error.response && error.response.data && error.response.data.type) {
        console.log("Error server data:", error.response.data);

        if (error.response.data.errors !== undefined && error.response.data.errors != null && error.response.data.errors.length !== 0) {
            let errors = { _error: 'Existen errores en el formulario' };
            error.response.data.errors.forEach(element => {
                errors[element.field] = element.detail;
            });
            return errors;
        } else {
            if (error.response.data.detail)
                return { _error: error.response.data.detail };
            else
                return { _error: error.response.data.message };
        }
    }

    if (error.message) {
        if (error.response === undefined)
            return { _error: "Operation could not be performed!, " + error.message };
        if (error.response && error.response.status === 500)
            return { _error: "Server returns error!, " + error.message };
        else
            return { _error: "Something went wrong!, " + error.message };
    } else
        return { _error: error };
};