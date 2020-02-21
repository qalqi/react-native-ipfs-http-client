
var URL = require('url-parse');
import fetch, { Headers } from 'node-fetch'

global.URL = URL;
global.fetch = fetch
global.Headers = Headers