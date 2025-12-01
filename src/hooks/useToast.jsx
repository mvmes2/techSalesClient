import { ToastContainer, toast } from 'react-toastify';

export function useToast() {
   
  const notifySuccess = (string, autoCloseOption) => toast.success(string, { theme: 'dark', autoClose: autoCloseOption ?? 2000 });
   /**
   * Envia um e-mail utilizando o serviço configurado.
   * @param string Error String to be diplayed.
   * @param autoCloseOption AutoClose Time in Ms (Optional, default is 2000ms).
   * @returns Toast Notification.
   */
  const notifyError = (string, autoCloseOption = 2000) => toast.error(string, { theme: 'dark', autoClose: autoCloseOption ?? 2000 });
  const notifyPromise = (fn, paramFn, string) =>
    toast.promise(fn(paramFn), {
      error: string,
      success: string,
      loading: string,
    });

  return {
    notifyError,
    notifyPromise,
    notifySuccess,
  };
}
