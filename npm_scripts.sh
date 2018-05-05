#!/bin/sh
# jslint-utility2

shNpmScriptApidocRawCreate () {(set -e
# this function will create the raw apidoc
    cd tmp/apidoc.raw
    find developer.github.com/v3 -name index.html -type f | \
        sed -e "s/\/index.html//" | \
        sort | \
        sed -e "s/\(developer.github.com\/.*\)/\1\/index.html/" | \
        xargs -I @ -n 1 sh -c "printf '\\n@\\n' && cat @" | \
        sed -e "s| *\$||" > .apidoc.raw.html
    cp .apidoc.raw.html ../..
)}

shNpmScriptApidocRawFetch () {(set -e
# this function will fetch the raw apidoc
    export npm_config_npm_package_name="${npm_config_npm_package_name:-$npm_package_name}"
    mkdir -p tmp/apidoc.raw && cd tmp/apidoc.raw
    rm -f "apidocRawFetch.$npm_config_npm_package_name.log"
    rm -fr developer.github.com && mkdir -p developer.github.com/v3
    curl -Lfs -o developer.github.com/v3/index.html https://developer.github.com/v3/index.html
    node -e '
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
var local, options;
local = require("../../assets.utility2.rollup.js");
local.dict = {};
switch (process.env.npm_config_npm_package_name) {
case "swgg-google-maps":
    options = { urlList: ["https://developers.google.com/maps/documentation/"] };
    break;
default:
    options = { urlList: [] };
}
local.ajaxCrawl(local.objectSetDefault({
    dict: local.dict,
    dir: ".",
    filter: function (options) {
        return (/\b(?:rest)\b/).test(options.url) || !new RegExp("\\b(?:" +
/* jslint-ignore-begin */
"\
android|\
apps-script|\
dotnet|\
go|\
ios|\
java|\
javascript|\
js|\
nodejs|\
php|\
python|\
ruby|\
sdk" +
/* jslint-ignore-end */
            ")\\b|\\bc\\+\\+").test(options.url);
    },
    postProcess: function (data) {
        return data
            .replace((/<[^>]*? name="xsrf_token"[^>]*?>/g), "")
            .replace((/ data-request-elapsed="[^"]*?"/g), "");
    }
}, options), local.onErrorDefault);
// </script>
' 2>&1 | tee -a "apidocRawFetch.$npm_config_npm_package_name.log"
    find . -path ./.git -prune -o -type f | \
        xargs -I % -n 1 sh -c "[ ! -s % ] && printf 'empty-file %\\n' 1>&2" | \
        tee -a "apidocRawFetch.$npm_config_npm_package_name.log"
)}

shNpmScriptPostinstall () {
# this function will do nothing
    return
}

# run command
"$@"
