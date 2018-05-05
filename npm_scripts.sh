#!/bin/sh
# jslint-utility2

# run command
case "$1" in
apidocRawCreate)
    utility2 shNpmRunApidocRawFetchAndCreate "$npm_lifecycle_event"
    ;;
apidocRawFetch)
    utility2 shNpmRunApidocRawFetchAndCreate "$npm_lifecycle_event" '
// <script>
/* jslint-utility2 */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
"use strict";
var local;
local = require("../../assets.utility2.rollup.js");
local.ajaxCrawl({
    depthMax: 1,
    urlList: ["https://developer.github.com/v3/index.html"]
}, local.onErrorThrow);
// </script>
'
    ;;
esac
