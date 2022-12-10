export const prod = false;
export const url = window.location.href
  .split("//")[1]
  .split("/")
  .filter((x) => x !== "");
export const isLocal = url[0].includes("localhost") || url[0].includes("127.0.0.1");
export const modules = [
 
];

const PROD_HOSTS = ['sanidad.hortifrut.pe']
const QAS2_HOST = 'd2d8wsp2s5of2w.cloudfront.net'

export const APIs = {
  PRODUCTION: {
    MAIN: "",
    EXTR: "",
  },
  LOCAL: {
    MAIN: "http://localhost:3064/api/",
    EXTR: "http://localhost:3064/api/",
    // GO   : 'https://0lmwujuvnj.execute-api.us-east-1.amazonaws.com/api/'
  },
};
window._cache = window._cache || {}
window._params = { fetchID: 1000, fetchProcesses: new Map() }

if (localStorage.getItem('devM') === '1') {
  window.cnlog = window.console.log.bind(window.console)
} else window.cnlog = () => { }

const dexieVersion = 69
const indexedDBTables = {
  
}
