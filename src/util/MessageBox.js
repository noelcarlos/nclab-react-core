import Swal from 'sweetalert2';

export default class MessageBox {

    static showDelete = (onAccept,onCancel) => {
        Swal.fire({
            title: '¿Desea archivar este registro?',
            text: 'El registro podrá ser recuperado posteriormente!',
            //type: 'warning',
            animation: false,
            showCancelButton: true,
            confirmButtonText: 'Si, archivalo!',
            cancelButtonText: 'No',
            confirmButtonColor: '#2bc550',
            cancelButtonColor: '#6c757d'
          }).then((result) => {
            if (result.value) {
              if (onAccept) { 
                const promiseAccept = new Promise(async (resolve, reject) => {
                    await onAccept();
                    resolve();
                });
                
                Promise.resolve(promiseAccept).then(function(onAcceptFunction) {
                    //onAcceptFunction();
                    Swal.fire({
                        title: 'Archivado!',
                        text: 'El registro ha sido archivado.',
                        animation: false,
                        //type: 'success',
                        confirmButtonColor: '#2bc550',
                        cancelButtonColor: '#6c757d'
                    });
                })
              }
              
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (onCancel) {
                    Promise.resolve(onCancel).then(function(value) {
                        Swal.fire({
                            //type: 'error',
                            title: 'Cancelado',
                            animation: false,
                            text: 'El registro se ha conservado',
                            confirmButtonColor: '#2bc550',
                            cancelButtonColor: '#6c757d'
                        });
                    });
                }
            }
          });
    }

    static showRecover = (onAccept,onCancel) => {
        Swal.fire({
            title: '¿Desea recuperar este registro?',
            text: 'El registro será activado definitivamente!',
            //type: 'warning',
            animation: false,
            showCancelButton: true,
            confirmButtonText: 'Si, archivalo!',
            cancelButtonText: 'No',
            confirmButtonColor: '#2bc550',
            cancelButtonColor: '#6c757d'
          }).then((result) => {
            if (result.value) {
              if (onAccept) { 
                const promiseAccept = new Promise(async (resolve, reject) => {
                    await onAccept();
                    resolve();
                });

                Promise.resolve(promiseAccept).then(function(onAcceptFunction) {
                    //onAcceptFunction();
                    Swal.fire({
                        title: 'Recuperado!',
                        text: 'El registro ha sido recuperado.',
                        animation: false,
                        //type: 'success',
                        confirmButtonColor: '#2bc550',
                        cancelButtonColor: '#6c757d'
                    });
                })
              }
              
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (onCancel) {
                    Promise.resolve(onCancel).then(function(value) {
                        Swal.fire({
                            //type: 'error',
                            title: 'Cancelado',
                            animation: false,
                            text: 'El registro se mantiene archivado',
                            confirmButtonColor: '#2bc550',
                            cancelButtonColor: '#6c757d'
                        });
                    });
                }
            }
          });
    }

} 