// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  itemsUrl: 'api/items', // Url to the web api,
  config: {
    cognito: {
      UserPoolId: 'us-east-1_OKsUqwfph', // something like this
      region: 'us-east-1', // some region
      ClientId: '5cdmkq4kot1j04u6hkuoaoc4du' // client id
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
