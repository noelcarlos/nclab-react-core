import Swal from 'sweetalert2';

export default class MessageBox {

    static showDelete = async (onAccept,onCancel) => {
        const result = await Swal.fire({
            title: '¿Desea archivar este registro?',
            text: 'El registro podrá ser recuperado posteriormente!',
            //type: 'warning',
            animation: false,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            confirmButtonColor: '#2bc550',
            cancelButtonColor: '#6c757d'
        });
          
        if (result.value) {
            await onAccept();

            await Swal.fire({
                title: 'Archivado!',
                text: 'El registro ha sido archivado.',
                animation: false,
                //type: 'success',
                confirmButtonColor: '#2bc550',
                cancelButtonColor: '#6c757d'
            });
        }
        
    }

    static showRecover = async (onAccept) => {
        const result = await Swal.fire({
            title: '¿Desea recuperar este registro?',
            text: 'El registro será activado definitivamente!',
            //type: 'warning',
            animation: false,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            confirmButtonColor: '#2bc550',
            cancelButtonColor: '#6c757d'
        });
          
        if (result.value) {
            await onAccept();

            await Swal.fire({
                title: 'Recuperado!',
                text: 'El registro ha sido recuperado.',
                animation: false,
                //type: 'success',
                confirmButtonColor: '#2bc550',
                cancelButtonColor: '#6c757d'
            });
        }
    }

    static showConfirmation = async (title, message) => {
        await Swal.fire({
            title: title,
            text: message,
            animation: false,
            //type: 'success',
            confirmButtonColor: '#2bc550',
            cancelButtonColor: '#6c757d'
        });
    }

} 