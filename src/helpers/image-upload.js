import Swal from 'sweetalert2';

export const imageUpload = (
  { title, image },
  setImageAction
) => {
  console.log(setImageAction);
  Swal.fire({
    title,
    input: 'text',
    inputLabel: 'agrega la URL de tu anime',
    inputValue: image,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Tienes que agregar una url';
      } else {
        setImageAction(value);
      }
    },
  });
};
