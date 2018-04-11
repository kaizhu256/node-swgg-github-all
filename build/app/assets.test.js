/* istanbul instrument in package swgg_github_all */
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
(function () {
    'use strict';
    var local;



    // run shared js-env code - init-before
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // re-init local
        local = local.global.local = (local.global.utility2 ||
            require('./assets.utility2.rollup.js')).requireReadme();
        // init test
        local.testRunInit(local);
    }());



    // run shared js-env code - function
    (function () {
        /* istanbul-ignore-next */
        local.testCase_buildReadme_default = function (options, onError) {
        /*
         * this function will test buildReadme's default handling-behavior
         */
            var definition,
                descriptionMediaType,
                htmlToDescription,
                operation,
                operationIdDict,
                schemaPMediaType,
                stringUniqueKey,
                swaggerJson,
                tagDict,
                textAll,
                title,
                typeDict,
                tagMain,
                tagSub,
                tmp,
                url;
            htmlToDescription = function (options) {
            /*
             * this function will format options.html to swagger markdown-description
             */
                var text;
                text = options.html
                    // format whitespace
                    .replace((/<pre\b.*?><code>([\S\s]*?)<\/code><\/pre>/g), '<pre>$1</pre>')
                    .replace((/<code>([\S\s]*?)<\/code>/g), '<pre>$1</pre>')
                    .replace((/<pre\b.*?>[\S\s]*?<\/pre>/g), function (match0) {
                        return ('```' + match0
                            .replace((/<[\S\s]*?>/g), '')
                            .trim()
                            .replace((/^"([\S\s]+?)"$/), '$1') + '```')
                            .replace((/^```([\S\s]*?\n[\S\s]*?)```$/g), '\n```\n$1\n```\n')
                            .replace((/\n/g), stringUniqueKey);
                    })
                    .replace((/\n+/g), ' ')
                    .replace((/<(?:dt|li)>(.*?<\/(?:dt|li)>)/g), '\n- $1')
                    .replace((/<\/dt>[\S\s]*?<dd>/g), ' - ')
                    .replace((/<h.>/g), '\n\n#### ')
                    .replace((/<p>/g), '\n\n')
                    .replace((/<(?:br|pre)>/g), '\n')
                    // bug-workaround - format application/vnd.xxx
                    .replace((/```(application\/.*?)```/g), '\n```\n$1\n```\n')
                    // format <a>
                    .replace((/<a href="\//g), '<a href="https://developer.github.com/')
                    .replace((/<a href="#/g), '<a href="' + options.url + '#')
                    .replace((/<a href="(.*?)".*?>(.*?)<\/a>/g), '[$2]($1)')
                    // format <xxx>
                    .replace((/<(?:b|strong)>(.*?)<\/(?:b|strong)>/g), '**$1**')
                    .replace(new RegExp('<\\/?(?:' +
                        'a|dd|div|dl|em|h.|img|li|p|pre|select|span|t\\w*?|ul' +
                        ')\\b[^<>]*?>', 'g'), '')
                    // format whitespace
                    .replace((/^ +/gm), '')
                    .replace((/\n{3,}/g), '\n\n')
                    .replace(new RegExp(stringUniqueKey, 'g'), '\n')
                    .replace((/ +$/gm), '')
                    .trim();
                local.assert(
                    text.indexOf('<') < 0,
                    [url, local.stringTruncate(text.replace((/[\S\s]*?</), '<'), 100)]
                );
                return text.split('\n');
            };
            // init options
            options = options || {};
            textAll = local.tryCatchReadFile('.apidoc.raw.html', 'utf8');
            if (!textAll) {
                onError(null, options);
                return;
            }
            // init stringUniqueKey
            stringUniqueKey = local.stringUniqueKey(textAll);
            // init swaggerJson
            swaggerJson = {};
/* jslint-ignore-begin */
swaggerJson =
{
    "basePath": "/",
    "definitions": {},
    "info": {
        "title": "",
        "version": ""
    },
    "parameters": {
        "github-all.key": {
            "default": "xxxxxxxx",
            "in": "query",
            "name": "access_token",
            "type": "string",
            "x-swgg-apiKey": true,
            "x-swgg-descriptionLineList": [
                "https://developer.github.com/v3/#authentication",
                "",
                "OAuth2 token (sent as a parameter)",
            ]
        },
        "github-all.user-agent": {
            "default": "Awesome-Octocat-App",
            "description": "user-agent header",
            "in": "header",
            "name": "user-agent",
            "required": true,
            "type": "string",
            "x-swgg-descriptionLineList": [
                "https://developer.github.com/v3/index.html#user-agent-required",
                "",
                "All API requests MUST include a valid ```User-Agent``` header. Requests with no ```User-Agent``` header will be rejected. We request that you use your GitHub username, or the name of your application, for the ```User-Agent``` header value. This allows us to contact you if there are problems."
            ]
        }
    },
    "paths": {},
    "schemes": [
        "https"
    ],
    "swagger": "2.0",
    "tags": [],
    "x-swgg-corsForwardProxyHost": "disabled",
    "x-swgg-fixErrorSemanticUniquePath": true,
    "x-swgg-operationIdFromPath": true,
    "x-swgg-tags0-override": {}
}
;
/* jslint-ignore-end */
            operationIdDict = {};
            tagDict = {};
            typeDict = {
                type: 'string',
                url: 'string'
            };
            textAll.split('\n</html>\n').slice(0, -1).forEach(function (textPage, ii) {
                if (ii === 0) {
                    textPage.replace(new RegExp(
                        ' data-proofer-ignore><\\/a><a href="(.*?)">(.*?)<\\/a><\\/h3>\\n' +
                            '([\\S\\s]*?)<\\/ul>',
                        'g'
                    ), function (tag, pathname, title, match2) {
                        if (title === 'Overview') {
                            return;
                        }
                        tag = 'github-' + pathname.split('/')[2];
                        swaggerJson['x-swgg-tags0-override'][tag] = {
                            'x-swgg-descriptionLineList': {}
                        };
                        tagDict[tag] = tag;
                        match2.replace((/href="\/v3\/(.*?)\/"/g), function (match0, match1) {
                            match0 = 'github-' + match1.replace((/\//g), '-');
                            tagDict[match0] = tag;
                        });
                    });
                    // bug-workaround - hard-code tagDict.scim
                    tagDict['github-scim'] = 'github-scim';
                    swaggerJson['x-swgg-tags0-override']['github-scim'] = {
                        'x-swgg-descriptionLineList': {}
                    };
                    return;
                }
                textPage = textPage.trim().replace((/\s+$/gm), '');
                tmp = (/^(developer.github.com\/v3\/(.*?))\/index.html\n/).exec(textPage);
                // init tagMain
                tagSub = 'github-' + tmp[2].replace((/\//g), '-');
                tagMain = tagDict[tagSub];
                if (!tagMain) {
                    return;
                }
                // init schemaPMediaType
                schemaPMediaType = {
                    collectionFormat: 'csv',
                    in: 'header',
                    items: { type: 'string' },
                    name: 'accept',
                    type: 'array',
                    'x-swgg-descriptionLineList': [
                        'https://developer.github.com/v3/media/',
                        ''
                        /* jslint-ignore-next-line */
                        , "Custom media types are used in the API to let consumers choose the format of the data they wish to receive. This is done by adding one or more of the following types to the ```Accept``` header when you make a request. Media types are specific to resources, allowing them to change independently and support formats that other resources don't."
                    ]
                };
                // init schemaPMediaType.enum
                schemaPMediaType.enum = {};
                textPage.replace((/\bapplication\/vnd\.[\w\+\-\.]+/g), function (match0) {
                    match0 = match0.trim().replace('VERSION', 'v3');
                    schemaPMediaType.enum[match0] = true;
                    if (match0.indexOf('preview') >= 0) {
                        schemaPMediaType.default = [match0];
                        schemaPMediaType.required = true;
                    }
                });
                schemaPMediaType.enum['application/vnd.github.v3+json'] = true;
                schemaPMediaType.enum = Object.keys(schemaPMediaType.enum);
                // init descriptionMediaType
                descriptionMediaType = '';
                textPage.replace((/<\/a>Custom media types<[\S\s]*?<\/code>/), function (match0) {
                    descriptionMediaType = '\n<p>' + match0;
                });
                // init title
                title = (/<title>(.*?) \|/).exec(textPage)[1];
                // init url
                url = 'https://' + tmp[1] + '/';
                textPage.split('\n<h2>\n').forEach(function (textOperation, ii) {
                    if (ii === 0) {
                        // init tag.description
                        tmp = '';
                        textOperation.replace((
                            /(\n<p>[\S\s]*?)(?:$|<option |<pre><code>[A-Z]+ \/)/
                        ), function (match0, match1) {
                            match0 = match1;
                            if ((/[^\s<>]<|>[^\s<>]/).test(match0)) {
                                tmp += match0;
                            }
                        });
                        tmp += descriptionMediaType;
                        swaggerJson['x-swgg-tags0-override'][tagMain][
                            'x-swgg-descriptionLineList'
                        ][tagSub] = htmlToDescription({
                            html: '# [' + title + '](' + url + ')\n<p>' +
                                (tmp.trim() || 'no description'),
                            url: url
                        });
                    }
                    tmp = new RegExp('href="(#.*?)" .*?<\\/a>(.*?)<.*?\\n([\\S\\s]*?)' +
                        '<pre><code>([A-Z]+?) +([\\w&\\-.\\/:;=\\?]+?)\\n').exec(textOperation);
                    if (!tmp) {
                        return;
                    }
                    // init options
                    options.method = tmp[4];
                    options.tags = [tagMain];
                    options.url = tmp[5].replace((/:([\w\-]+)/g), '{$1}');
                    if (options.url[0] === '/') {
                        options.url = 'https://api.github.com' + options.url;
                    }
                    options['x-swgg-tags0'] = tagMain;
                    // init options.data
                    options.data = null;
                    textOperation.replace((
                        /<code><span class="p">(\{[\S\s]+?)<\/code>[\S\s]*?<\/a>Response<\/h3>\n/
                    ), function (match0, match1) {
                        match0 = match1;
                        match0 = match0.replace((/<.*?>/g), '').trim().replace((/'$/g), '');
                        options.data = JSON.stringify(JSON.parse(match0));
                    });
                    // init operation
                    operation = {};
                    // init operation.description
                    operation['x-swgg-descriptionLineList'] = htmlToDescription({
                        html: '[' + title + '](' + url + tmp[1] + ') - ' + tmp[2] + '\n<p>' +
                            tmp[3],
                        url: url
                    });
                    // init operation.operationId
                    tmp = 0;
                    while (true) {
                        operation.operationId = local.operationIdFromAjax(options);
                        if (!operationIdDict[operation.operationId]) {
                            break;
                        }
                        tmp += 1;
                        options.url = (options.url + '#').replace((/#.*$/g), '#' + tmp);
                    }
                    operationIdDict[operation.operationId] = true;
                    // init operation from ajax
                    local.swaggerJsonFromAjax(swaggerJson, options);
                    tmp = local.urlParseWithBraket(options.url);
                    operation = local.objectSetDefault(swaggerJson.paths[
                        tmp.pathname + tmp.hash
                    ][
                        options.method.toLowerCase()
                    ], operation);
                    // init operation.parameters
                    operation.parameters = [{
                        "$ref": "#/parameters/github-all.key"
                    }, {
                        "$ref": "#/parameters/github-all.user-agent"
                    }, schemaPMediaType].concat(operation.parameters);
                    operation['x-swgg-sortValue'] = operation['x-swgg-descriptionLineList'][0];
                    // init definition
                    definition = swaggerJson.definitions[operation.operationId + '.body'];
                    textOperation.split('\n</table>\n')[0].replace(new RegExp('<tr>\\n' +
                        '<td><code>(.*?)<\\/code><\\/td>\\n' +
                        '<td><code>(.*?)<\\/code><\\/td>\\n' +
                        '<td>([\\S\\s]*?)<\\/td>\\n' +
                        '<\\/tr>\\n', 'g'), function (schemaP, name, type, description) {
                        type = type.toLowerCase();
                        // init schemaP
                        schemaP = {
                            default: definition &&
                                definition.properties[name] &&
                                definition.properties[name].default,
                            in: 'query',
                            name: name,
                            required: description.indexOf('<strong>Required</strong>') > 0,
                            type: typeDict[type] || type,
                            'x-swgg-descriptionLineList': htmlToDescription({
                                html: description,
                                url: url
                            })
                        };
                        // init default
                        description.replace((
                            / Default:.*?<code>(.*?)<\/code>/
                        ), function (match0, match1) {
                            match0 = match1;
                            schemaP.default = match0.trim().replace((/^"|"$/g), '') ||
                                schemaP.default;
                        });
                        // init enum
                        description.replace((
                            /(Comma-separated list of values)|Can be one of/
                        ), function (match0, match1) {
                            match0 = match1;
                            if (match0) {
                                schemaP.items = { type: 'string' };
                                schemaP.type = 'array';
                            }
                            schemaP.enum = {};
                            description.replace((
                                /<code>([^,]+?)<\/code>/g
                            ), function (match0, match1) {
                                match0 = match1;
                                match0 = match0.trim().replace((/^"|"$/g), '');
                                if (match0.indexOf('&lt;') >= 0) {
                                    schemaP.enum = undefined;
                                }
                                if (schemaP.enum) {
                                    schemaP.enum[match0] = true;
                                }
                            });
                            if (schemaP.enum) {
                                schemaP.enum = Object.keys(schemaP.enum);
                            }
                        });
                        local.tryCatchOnError(function () {
                            schemaP.default = JSON.parse(schemaP.default);
                        }, local.nop);
                        if (schemaP.type === 'array') {
                            schemaP.items = { type: schemaP.default
                                ? typeof schemaP.default[0]
                                : 'string' };
                        }
                        // init parameters
                        if (operation.parameters.some(function (element) {
                                if (element.name === schemaP.name) {
                                    local.objectSetOverride(element, {
                                        default: element.in === 'body'
                                            ? undefined
                                            : schemaP.element,
                                        required: schemaP.required || undefined,
                                        'x-swgg-descriptionLineList':
                                            schemaP['x-swgg-descriptionLineList']
                                    });
                                    return true;
                                }
                            })) {
                            return;
                        }
                        if (!definition) {
                            operation.parameters.push(schemaP);
                            return;
                        }
                        definition.properties[name] = definition.properties[name] || {};
                        local.objectSetOverride(definition.properties[name], {
                            default: schemaP.default,
                            enum: schemaP.enum,
                            items: schemaP.items,
                            type: schemaP.type,
                            'x-swgg-descriptionLineList': schemaP['x-swgg-descriptionLineList']
                        });
                        if (schemaP.required) {
                            definition.required = definition.required || [];
                            definition.required.push(name);
                        }
                    });
                });
            });
            // init tags
            swaggerJson.tags = Object.keys(swaggerJson['x-swgg-tags0-override'])
                .sort(function (aa, bb) {
                    return aa < bb
                        ? -1
                        : 1;
                })
                .map(function (key) {
                    tagDict = swaggerJson['x-swgg-tags0-override'][key];
                    tmp = tagDict['x-swgg-descriptionLineList'];
                    tagDict['x-swgg-descriptionLineList'] = Array.prototype.concat.apply(
                        [],
                        Object.keys(tmp)
                            .sort(function (aa, bb) {
                                return aa === key
                                    ? -1
                                    : bb === key
                                    ? 1
                                    : tmp[aa][0] < tmp[bb][0]
                                    ? -1
                                    : 1;
                            })
                            .map(function (key) {
                                return [''].concat(tmp[key]);
                            })
                    ).slice(1);
                    return {
                        name: key,
                        'x-swgg-descriptionLineList': tagDict['x-swgg-descriptionLineList']
                    };
                });
            // bug-workaround - misc
            [
                '_2Forgs_2F_7Borg_7D_2Fhooks_2F_7Bid_7D_20PATCH.body',
                '_2Forgs_2F_7Borg_7D_2Finvitations_20POST.body',
                '_2Frepos_2F_7Bowner_7D_2F_7Brepo_7D_2Fhooks_2F_7Bid_7D_20PATCH.body'
            ].forEach(function (key) {
                swaggerJson.definitions[key].required = undefined;
            });
            // normalize swaggerJson
            local.normalizeSwaggerJson(swaggerJson);
            // save swaggerJson
            local.fs.writeFileSync(
                'assets.swgg.swagger.json',
                local.jsonStringifyOrdered(swaggerJson, null, 4)
            );
            local.buildReadme({}, onError);
        };
    }());
}());
