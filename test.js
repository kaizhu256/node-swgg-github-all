/* istanbul instrument in package swgg_github_all */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
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
        local.testCase_buildReadme_default = function (options, onError) {
        /*
         * this function will test buildReadme's default handling-behavior
         */
            var definition,
                definitionName,
                headerAccept,
                headerAcceptDict,
                htmlToDescription,
                method,
                operation,
                operationIdDict,
                parametersPathDict,
                path,
                pathDict,
                swaggerJson,
                tagDict,
                textAll,
                title,
                typeDict,
                tag,
                tmp,
                url,
                urlParsed;
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            htmlToDescription = function (options) {
            /*
             * this function will format options.html to swagger markdown-description
             */
                return options.html
                    // format \n
                    .replace((/\n\n+/g), '\n')
                    .replace((/\n<li>/g), '\n\n<li>')
                    .replace((/\n<(?:p|pre)>/g), '\n\n')
                    .replace((/\n([^\n])/g), ' $1')
                    .replace((/\n /g), '\n')
                    // format header accept
                    .replace((/( header:)<\/p>\n(<code>)/g), '$1 $2')
                    // format <a>
                    .replace((/<a href="\//g), '<a href="https://developer.github.com/')
                    .replace((/<a href="#/g), '<a href="' + options.url + '#')
                    .replace((/<a href="(.*?)".*?>(.*?)<\/a>/g), '[$2]($1)')
                    // format <xxx>
                    .replace((/<code>(.*?)<\/code>/g), '```$1```')
                    .replace((/<li>(.*?)<\/li>/g), '  - $1')
                    .replace((/<strong>(.*?)<\/strong>/g), '**$1**')
                    .replace((/<[^<>]*?>/g), '')
                    // format whitespace
                    .replace((/ {1,}/g), ' ')
                    .split('\n')
                    .map(function (element) {
                        return element.trim();
                    })
                    .filter(local.echo)
                    .map(function (element) {
                        return element + '\n';
                    });
            };
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
                "OAuth2 token (sent as a parameter)\n",
                "https://developer.github.com/v3/#authentication\n"
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
                "All API requests MUST include a valid User-Agent header. Requests with no User-Agent header will be rejected. We request that you use your GitHub username, or the name of your application, for the User-Agent header value. This allows us to contact you if there are problems.\n",
                "https://developer.github.com/v3/index.html#user-agent-required\n"
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
    "x-swgg-operationIdFromPath": true,
    "x-swgg-tags0-override": {}
}
;
/* jslint-ignore-end */
            headerAcceptDict = {
                'application/vnd.github.eye-scream-preview+json': 1,
                'application/vnd.github.valkyrie-preview+json': 1
            };
            operationIdDict = {};
            parametersPathDict = {};
            tagDict = {};
            typeDict = {
                type: 'string',
                url: 'string'
            };
            textAll = local.fs.readFileSync('.apidoc.raw.html', 'utf8');
            textAll.replace((
                /\n<p><strong>Custom media type:<\/strong> <code>(.*)<\/code>/g
            ), function (match0, match1) {
                match0 = match1;
                if (match0 === 'jean-grey-preview') {
                    return;
                }
                headerAcceptDict['application/vnd.github.' + match0 + '+json'] = 1;
            });
            textAll.split('\n</html>\n').slice(0, -1).forEach(function (text, ii) {
                if (ii === 0) {
                    text.replace(new RegExp(
                        ' data-proofer-ignore><\\/a><a href="(.*?)">(.*?)<\\/a><\\/h3>\\n' +
                            '([\\S\\s]*?)<\\/ul>',
                        'g'
                    ), function (tag, pathname, title, match2) {
                        if (title === 'Overview') {
                            return;
                        }
                        tag = 'github-' + pathname.split('/')[2];
                        swaggerJson['x-swgg-tags0-override'][tag] = {
                            externalDocs: { url: 'https://developer.github.com' + pathname },
                            name: tag
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
                        externalDocs: { url: 'https://developer.github.com/v3/scim/' },
                        name: 'github-scim'
                    };
                    return;
                }
                text = text.trim().replace((/\s+$/gm), '');
                tmp = (/^tmp\/(developer.github.com\/v3\/(.*?))\/index.html\n/).exec(text);
                // init tag
                tmp[2] = 'github-' + tmp[2].replace((/\//g), '-');
                tag = tagDict[tmp[2]];
                if (!tag) {
                    return;
                }
                // init headerAccept
                headerAccept = null;
                text.replace((
                    /\n<pre><code> *?(application\/vnd\..*?)\n/g
                ), function (match0, match1) {
                    match0 = (match1 + '+json').replace((/\+json\b.*?$/), '+json');
                    headerAcceptDict[match0] = headerAcceptDict[match0] || 0;
                    if (headerAcceptDict[match0]) {
                        headerAcceptDict[match0] += 1;
                        headerAccept = match0;
                    }
                });
                // init title
                title = (/<title>(.*?) \|/).exec(text)[1];
                // init url
                url = 'https://' + tmp[1] + '/';
                // init tag.description
                if (swaggerJson['x-swgg-tags0-override'][tmp[2]]) {
                    swaggerJson['x-swgg-tags0-override'][tag]
                        .externalDocs['x-swgg-descriptionLineList'] = htmlToDescription({
                            html: title + '.' +
                                (/(\n<p>[\S\s]*?)(?:\n<h2>|<option )/).exec(text)[1],
                            url: url
                        }).concat([ '[' + url + '](' + url + ')\n' ]);
                }
                text.split('\n<h2>\n').forEach(function (text) {
                    tmp = new RegExp('href="(#.*?)" .*?<\\/a>(.*?)<.*?\\n' +
                        '([\\S\\s]*?)<pre><code>([A-Z]+?) +([\\w&\\-.\\/:;=\\?]+?)\\n').exec(text);
                    if (!tmp) {
                        return;
                    }
                    // init definition
                    definition = { properties: {}, 'x-swgg-tags0': tag };
                    // init operation
                    operation = {
                        parameters: [{
                            "$ref": "#/parameters/github-all.key"
                        }, {
                            "$ref": "#/parameters/github-all.user-agent"
                        }, {
                            default: headerAccept || 'application/vnd.github+json',
                            description: 'accept header\n\n' +
                                '[https://developer.github.com/v3/media]' +
                                '(https://developer.github.com/v3/media)',
                            in: 'header',
                            name: 'accept',
                            required: !!headerAccept,
                            type: 'string'
                        }],
                        responses: { default: { description: 'default response' } },
                        tags: [tag],
                        'x-swgg-host': 'api.github.com',
                        'x-swgg-tags0': tag
                    };
                    // init description
                    operation['x-swgg-descriptionLineList'] = htmlToDescription({
                        html: title + ' - ' + tmp[2] + '.\n<p>' +
                            tmp[3] + '\n<p>' +
                            url + tmp[1],
                        url: url
                    });
                    // init sortValue
                    operation['x-swgg-sortValue'] = operation['x-swgg-descriptionLineList'][0];
                    // init method
                    method = tmp[4].toLowerCase();
                    // init path
                    urlParsed = local.urlParse(tmp[5]);
                    path = urlParsed.pathname
                        .replace((/&gt;|&lt;/g), '')
                        .replace((/:[\w\-]+/g), function (name) {
                            name = name.slice(1);
                            tmp = {
                                in: 'path',
                                name: name,
                                required: true,
                                type: 'string'
                            };
                            operation.parameters.push(tmp);
                            parametersPathDict[name] = tmp;
                            return '{' + name + '}';
                        });
                    Object.keys(urlParsed.query).forEach(function (key) {
                        tmp = {
                            default: urlParsed.query[key],
                            in: 'query',
                            name: key,
                            type: 'string'
                        };
                        operation.parameters.push(tmp);
                        parametersPathDict[key] = tmp;
                    });
                    for (tmp = 0; operationIdDict[operation.operationId]; tmp += 1) {
                        operation.operationId = encodeURIComponent(path + (tmp
                            ? '#' + tmp
                            : '') + ' ' + method.toUpperCase())
                            .replace((/[^\w\-.]/g), '_');
                    }
                    if (tmp > 1) {
                        path += '#' + tmp;
                    }
                    operationIdDict[operation.operationId] = true;
                    // init definitionName
                    definitionName = tag +
                        '.' + path.slice(1).replace((/\//g), '-') +
                        '.' + method +
                        '.body';
                    text.split('\n</table>\n')[0].replace(new RegExp('<tr>\\n' +
                        '<td><code>(.*?)<\\/code><\\/td>\\n' +
                        '<td><code>(.*?)<\\/code><\\/td>\\n' +
                        '<td>(\n{0,1}.*?)<\\/td>\\n' +
                        '<\\/tr>\\n', 'g'), function (schemaP, name, type, description) {
                        type = type.toLowerCase();
                        // init schemaP
                        schemaP = {
                            default: (/ Default: [^.]*<code>(.*?)<\/code>/).exec(description) ||
                                undefined,
                            in: 'query',
                            name: name,
                            required: description.indexOf('<strong>Required</strong>') > 0,
                            type: typeDict[type] || type,
                            'x-swgg-descriptionLineList': htmlToDescription({
                                html: description,
                                url: url
                            })
                        };
                        if (schemaP.default) {
                            schemaP.default = schemaP.default[1];
                        }
                        if (schemaP.type === 'array') {
                            schemaP.items = { type: 'string' };
                            schemaP.default = [schemaP.default];
                        }
                        if (schemaP.type !== 'string' && typeof schemaP.default === 'string') {
                            schemaP.default = JSON.parse(schemaP.default);
                        }
                        if (parametersPathDict[name]) {
                            local.objectSetDefault(parametersPathDict[name], schemaP);
                            return;
                        }
                        switch (method) {
                        case 'patch':
                        case 'post':
                        case 'put':
                            // init definition
                            definition.properties[name] = {
                                default: schemaP.default,
                                items: schemaP.items,
                                type: schemaP.type,
                                'x-swgg-descriptionLineList': schemaP['x-swgg-descriptionLineList']
                            };
                            if (schemaP.required) {
                                definition.required = definition.required || [];
                                definition.required.push(name);
                            }
                            break;
                        default:
                            operation.parameters.push(schemaP);
                        }
                    });
                    // init definition.default
                    text.replace((
                        /<\/span><\/a>Example Input<\/h3>\n([\S\s]+?\n<\/span><\/code><\/pre>\n)/
                    ), function (defaultDict, match1) {
                        defaultDict = JSON.parse(match1.replace((/<.*?>/g), ''));
                        Object.keys(defaultDict).forEach(function (key) {
                            if (definition.properties[key]) {
                                definition.properties[key].default = defaultDict[key];
                            }
                        });
                    });
                    // update swaggerJson with definition
                    switch (method) {
                    case 'patch':
                    case 'post':
                    case 'put':
                        tmp = {
                            in: 'body',
                            name: 'body',
                            required: true,
                            schema: { type: 'string' }
                        };
                        if (Object.keys(definition.properties).length) {
                            swaggerJson.definitions[definitionName] = definition;
                            tmp.schema = { $ref: '#/definitions/' + definitionName };
                            operation.parameters.push(tmp);
                        }
                        break;
                    }
                    // update swaggerJson with operation
                    swaggerJson.paths[path] = swaggerJson.paths[path] || {};
                    swaggerJson.paths[path][method] = operation;
                });
            });
            // fix validation - semanticUniquePath
            pathDict = {};
            Object.keys(swaggerJson.paths).forEach(function (path) {
                tmp = path.replace((/\{.*?\}/g), '{}');
                pathDict[tmp] = pathDict[tmp] || {};
                pathDict[tmp][path] = true;
            });
            Object.keys(pathDict).forEach(function (key) {
                tmp = Object.keys(pathDict[key]).sort();
                if (tmp.length === 1) {
                    return;
                }
                tmp.forEach(function (path, ii) {
                    swaggerJson.paths[path + '#' + ii] = swaggerJson.paths[path];
                    delete swaggerJson.paths[path];
                });
            });
            // init tags
            swaggerJson.tags = Object.keys(swaggerJson['x-swgg-tags0-override'])
                .map(function (key) {
                    return swaggerJson['x-swgg-tags0-override'][key];
                })
                .sort(function (aa, bb) {
                    return aa.name < bb.name
                        ? -1
                        : 1;
                })
                .map(function (element) {
                    return {
                        name: element.name,
                        'x-swgg-descriptionLineList':
                            element.externalDocs['x-swgg-descriptionLineList']
                    };
                });
            // validate headerAcceptDict
            console.error(Object.keys(headerAcceptDict).sort().filter(function (key) {
                return headerAcceptDict[key] < 2;
            }));
            // save swaggerJson
            local.fs.writeFileSync(
                'assets.swgg.swagger.json',
                local.jsonStringifyOrdered(swaggerJson, null, 4)
            );
            local.buildReadme({}, onError);
        };
    }());
}());
