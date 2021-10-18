import Swal from 'sweetalert2';

/**
 *
 * @param {*} options : object
 * @returns boolean
 * return an alert to confirm or cancel an action
 */
export const showAlertOptions = async (options) => {
  const { title, text, icon } = options;

  let { isConfirmed } = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#66A593',
    cancelButtonColor: '#FF9DA1',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  });

  return isConfirmed;
};
