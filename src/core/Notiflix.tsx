import Notiflix, { Loading, Notify } from 'notiflix';
export const SpinnerLoading = {
 loading: (text?:string) => { 
  Loading.circle(text?text:'Loading...')
  // Loading.standard('Loading...')
 },
 remove: () => {
  Loading.remove()
 }
}




export const Notificacion = {
 error: (text?: string) => {
  Notify.failure(text || 'Error');
 },
 info: (text?: string) => {
  Notify.info(text || 'Info');
 },
 success: (text?: string) => {
  Notify.success(text || 'Success');
 }
}