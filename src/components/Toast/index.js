import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// function toastSuccess() {
export const showToastMessage = () => {
  toast.success("Status Updated SuccessFully...", {
    position: toast.POSITION.TOP_RIGHT
  });
};
// return showToastMessage
// }
// export default toastSuccess;