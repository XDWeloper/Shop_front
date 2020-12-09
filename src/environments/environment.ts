// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_KEY: 'AIzaSyDAd6leD77cnlkrAgGE1YI1P3yupWW7XOA',
  fbDbUrl: 'https://online-shop-f6200.firebaseio.com/',
  BASE_URL: 'http://localhost:8080',
  AUTH_URL: '/auth',

  PRODUCT_URL: '/products',
  FINDALL_URL: '/all',
  CREATE_URL: '/create',
  UPDATE_URL: '/update',
  FINDBYID_URL: '/find',
  DELETE_URL: 'delete',

  CATEGORY_URL: '/category',
  SUBCATEGORY_URL: '/subCategory'


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
