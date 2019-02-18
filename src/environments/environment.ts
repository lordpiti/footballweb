// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //api_url: 'http://localhost:57544/api/',
  api_url: 'https://footballsandbox.azurewebsites.net/api/',
  FACEBOOK_APP_ID: '2050633918500176',
  GOOGLE_CLIENT_ID: '357813264391-bc51b2u0ohaeb6v78k2b2tpr5pdi6c09.apps.googleusercontent.com',
  home_url: 'http://localhost:4200',
  //hubUrl: 'http://localhost:57544',
  hubUrl: 'https://footballsandbox.azurewebsites.net',
  home_rss_feed_url: 'http://newsrss.bbc.co.uk/rss/sportonline_uk_edition/football/rss.xml',
  rss2json_base_url: 'https://cors-anywhere.herokuapp.com/https://api.rss2json.com/v1/api.json?rss_url='
};
