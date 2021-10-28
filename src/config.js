import {store} from '@/stores';
const AppConfig = {
  apiBaseUrl: 'http://localhost:3000',
  apiToken: store.state.auth.token
};
// alert(AppConfig.apiBaseUrl);
// console.log("apiBaseUrl", AppConfig.apiBaseUrl)
// console.log("Store token :",store.state.auth.token);
export default AppConfig;