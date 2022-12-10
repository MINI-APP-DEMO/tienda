/// <reference types="vite/client" />

type MyGlobalFunctionType = (name: string) => void;
type ConsoleLog = (...e: any) => void;
type AppHistory = (route: string) => void;
type GlobalParams = { [key: string]: any };
type IndexedDBTables = { [key: string]: string };
// probando branch
interface Window {
  appId: string;
  // indexedDBTables: IndexedDBTables
  google: any;
  renderGoogleMapOnDOM: (e?: any) => void;
  onStartCapture: () => void;
  onEndCapture: (e?: any) => void;
  appHistory: AppHistory;
  DexieDB: any;
  DexieDB2: any;
  _pendingRequests: any[];
  _fechaHelper: any;
  _isProd: boolean;
  _buildInfo: any;
  _modules: any[];
  _cache: { [key: string]: any };
  _cacheTiles: { [key: string]: string };
  _params: GlobalParams;
  _throttleTimer: any;
  _fecha0: Date;
  _zoneOffset: number;
  API_ROUTES: { MAIN: string; EXTR: string; GO: string };
  S3_URL: string;
  cnlog: ConsoleLog;
  idiomas: any[];
  baseUrlAPI:string
  traducciones: Map<string, string>;
}
declare const appId: string;
