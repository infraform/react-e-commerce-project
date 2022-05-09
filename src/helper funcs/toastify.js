import { toast } from 'react-toastify';

const triggerToast = (type, message) => {
  switch (type) {
    case 'error':
      toast.error(message, {
        position: 'top-right',
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      break;

    default:
      toast.success(message, {
        position: 'top-right',
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      break;
  }
};

export default triggerToast;
