/*!
 * Lightweight URL manipulation with JavaScript
 * This library is independent of any other libraries and has pretty simple
 * interface and lightweight code-base.
 * Some ideas of query string parsing had been taken from Jan Wolter
 * @see http://unixpapa.com/js/querystring.html
 *
 * @license MIT
 * @author Mykhailo Stadnyk <mikhus@gmail.com> and contributors
 * @see https://github.com/Mikhus/domurl/graphs/contributors
 */
(function (ns) {
    'use strict';

    const RX_PROTOCOL = /^[a-z]+:/;
    const RX_PORT = /[-a-z0-9]+(\.[-a-z0-9])*:\d+/i;
    const RX_CREDS = /\/\/(.*?)(?::(.*?))?@/;
    const RX_WIN = /^win/i;
    const RX_PROTOCOL_REPL = /:$/;
    const RX_QUERY_REPL = /^\?/;
    const RX_HASH_REPL = /^#/;
    const RX_PATH = /(.*\/)/;
    const RX_PATH_FIX = /^\/{2,}/;
    // https://news.ycombinator.com/item?id=3939454
    const RX_PATH_IE_FIX = /(^\/?)/;
    const RX_SINGLE_QUOTE = /'/g;
    const RX_DECODE_1 = /%([ef][0-9a-f])%([89ab][0-9a-f])%([89ab][0-9a-f])/gi;
    const RX_DECODE_2 = /%([cd][0-9a-f])%([89ab][0-9a-f])/gi;
    const RX_DECODE_3 = /%([0-7][0-9a-f])/gi;
    const RX_PLUS = /\+/g;
    const RX_PATH_SEMI = /^\w:$/;
    const RX_URL_TEST = /[^/#?]/;

    // configure given url options
    function urlConfig(url) {
        const config = {
            path: true,
            query: true,
            hash: true
        };

        if (!url) {
            return config;
        }

        if (RX_PROTOCOL.test(url)) {
            config.protocol = true;
            config.host = true;

            if (RX_PORT.test(url)) {
                config.port = true;
            }

            if (RX_CREDS.test(url)) {
                config.user = true;
                config.pass = true;
            }
        }

        return config;
    }

    const isNode = typeof window === 'undefined' &&
        typeof global !== 'undefined' &&
        typeof require === 'function';
    const isIe = !isNode && ns.navigator && ns.navigator.userAgent &&
        ~ns.navigator.userAgent.indexOf('MSIE');

    // Trick to bypass Webpack's require at compile time
    const nodeRequire = isNode ? ns.require : null;

    // mapping between what we want and <a> element properties
    const map = {
        protocol: 'protocol',
        host: 'hostname',
        port: 'port',
        path: 'pathname',
        query: 'search',
        hash: 'hash'
    };

    // jscs: disable
    /**
     * default ports as defined by http://url.spec.whatwg.org/#default-port
     * We need them to fix IE behavior,
     * @see https://github.com/Mikhus/jsurl/issues/2
     */
    const defaultPorts = {
        ftp: 21,
        gopher: 70,
        http: 80,
        https: 443,
        ws: 80,
        wss: 443
    };

    let _currNodeUrl;
    function getCurrUrl() {
        if (isNode) {
            if (!_currNodeUrl) {
                _currNodeUrl = ('file://' +
                    (process.platform.match(RX_WIN) ? '/' : '') +
                    nodeRequire('fs').realpathSync('.')
                );
            }
            return _currNodeUrl;
        } else if (document.location.href === 'about:srcdoc') {
            return window.self.parent.document.location.href;
        } else {
            return document.location.href;
        }
    }

    function parse(self, url, absolutize) {
        let link, i, auth;

        if (!url) {
            url = getCurrUrl();
        }

        if (isNode) {
            link = nodeRequire('url').parse(url);
        }

        else {
            link = document.createElement('a');
            link.href = url;
        }

        const config = urlConfig(url);

        auth = url.match(RX_CREDS) || [];

        for (i in map) {
            if (config[i]) {
                self[i] = link[map[i]] || '';
            } else {
                self[i] = '';
            }
        }

        // fix-up some parts
        self.protocol = self.protocol.replace(RX_PROTOCOL_REPL, '');
        self.query = self.query.replace(RX_QUERY_REPL, '');
        self.hash = decode(self.hash.replace(RX_HASH_REPL, ''));
        self.user = decode(auth[1] || '');
        self.pass = decode(auth[2] || '');
        self.port = (
            // loosely compare because port can be a string
            defaultPorts[self.protocol] == self.port || self.port == 0  // jshint ignore:line
        ) ? '' : self.port; // IE fix, Android browser fix

        if (!config.protocol && RX_URL_TEST.test(url.charAt(0))) {
            self.path = url.split('?')[0].split('#')[0];
        }

        if (!config.protocol && absolutize) {
            // is IE and path is relative
            const base = new Url(getCurrUrl().match(RX_PATH)[0]);
            const basePath = base.path.split('/');
            const selfPath = self.path.split('/');
            const props = ['protocol', 'user', 'pass', 'host', 'port'];

            basePath.pop();

            for (let prop of props) {
                self[prop] = base[prop];
            }

            while (selfPath[0] === '..') { // skip all "../
                basePath.pop();
                selfPath.shift();
            }

            self.path =
                (url.charAt(0) !== '/' ? basePath.join('/') : '') +
                '/' + selfPath.join('/')
                ;
        }

        self.path = self.path.replace(RX_PATH_FIX, '/');
        isIe && (self.path = self.path.replace(RX_PATH_IE_FIX, '/'));

        self.paths(self.paths());

        self.query = new QueryString(self.query);
    }

    function encode(s) {
        return encodeURIComponent(s).replace(RX_SINGLE_QUOTE, '%27');
    }

    function decode(s) {
        s = s.replace(RX_PLUS, ' ');
        s = s.replace(RX_DECODE_1, function (code, hex1, hex2, hex3) {
            const n1 = parseInt(hex1, 16) - 0xE0;
            const n2 = parseInt(hex2, 16) - 0x80;

            if (n1 === 0 && n2 < 32) {
                return code;
            }

            const n3 = parseInt(hex3, 16) - 0x80;
            const n = (n1 << 12) + (n2 << 6) + n3;

            if (n > 0xFFFF) {
                return code;
            }

            return String.fromCharCode(n);
        });
        s = s.replace(RX_DECODE_2, function (code, hex1, hex2) {
            const n1 = parseInt(hex1, 16) - 0xC0;

            if (n1 < 2) {
                return code;
            }

            const n2 = parseInt(hex2, 16) - 0x80;

            return String.fromCharCode((n1 << 6) + n2);
        });

        return s.replace(RX_DECODE_3, (code, hex) =>
            String.fromCharCode(parseInt(hex, 16))
        );
    }

    /**
     * Class QueryString
     *
     * @param {string} qs - string representation of QueryString
     * @constructor
     */
    function QueryString(qs) {
        const parts = qs.split('&');

        for (let i = 0, s = parts.length; i < s; i++) {
            const keyVal = parts[i].split('=');
            const key = decodeURIComponent(keyVal[0].replace(RX_PLUS, ' '));

            if (!key) {
                continue;
            }

            const value = keyVal[1] !== undefined ? decode(keyVal[1]) : null;

            if (this[key] === undefined) {
                this[key] = value;
            } else {
                if (!(this[key] instanceof Array)) {
                    this[key] = [this[key]];
                }

                this[key].push(value);
            }
        }
    }

    /**
     * Converts QueryString object back to string representation
     *
     * @returns {string}
     */
    QueryString.prototype.toString = function () {
        let s = '';
        const e = encode;
        let i, ii;

        for (i in this) {
            const w = this[i];

            if (w instanceof Function || w === undefined) {
                continue;
            }

            if (w instanceof Array) {
                const len = w.length;

                if (!len) {
                    // Parameter is an empty array, so treat as
                    // an empty argument
                    s += (s ? '&' : '') + e(i) + '=';
                    continue;
                }

                for (ii = 0; ii < len; ii++) {
                    const v = w[ii];
                    if (v === undefined) {
                        continue;
                    }
                    s += s ? '&' : '';
                    s += e(i) + (v === null ? ''
                        : '=' + e(v));
                }
                continue;
            }

            // Plain value
            s += s ? '&' : '';
            s += e(i) + (w === null ? '' : '=' + e(w));
        }

        return s;
    };

    /**
     * Class Url
     *
     * @param {string} [url] - string URL representation
     * @param {boolean} [noTransform] - do not transform to absolute URL
     * @constructor
     */
    function Url(url, noTransform) {
        parse(this, url, !noTransform);
    }

    /**
     * Clears QueryString, making it contain no params at all
     *
     * @returns {Url}
     */
    Url.prototype.clearQuery = function () {
        for (const key in this.query) {
            if (!(this.query[key] instanceof Function)) {
                delete this.query[key];
            }
        }

        return this;
    };

    /**
     * Returns total number of parameters in QueryString
     *
     * @returns {number}
     */
    Url.prototype.queryLength = function () {
        let count = 0;

        for (const key in this.query) {
            if (!(this.query[key] instanceof Function)) {
                count++;
            }
        }

        return count;
    };

    /**
     * Returns true if QueryString contains no parameters, false otherwise
     *
     * @returns {boolean}
     */
    Url.prototype.isEmptyQuery = function () {
        return this.queryLength() === 0;
    };

    /**
     *
     * @param {Array} [paths] - an array pf path parts (if given will modify
     *                          Url.path property
     * @returns {Array} - an array representation of the Url.path property
     */
    Url.prototype.paths = function (paths) {
        let prefix = '';
        let i = 0;
        let s;

        if (paths && paths.length && paths + '' !== paths) {
            if (this.isAbsolute()) {
                prefix = '/';
            }

            for (s = paths.length; i < s; i++) {
                paths[i] = !i && RX_PATH_SEMI.test(paths[i]) ? paths[i]
                    : encode(paths[i]);
            }

            this.path = prefix + paths.join('/');
        }

        paths = (this.path.charAt(0) === '/' ?
            this.path.slice(1) : this.path).split('/');

        for (i = 0, s = paths.length; i < s; i++) {
            paths[i] = decode(paths[i]);
        }

        return paths;
    };

    /**
     * Performs URL-specific encoding of the given string
     *
     * @method Url#encode
     * @param {string} s - string to encode
     * @returns {string}
     */
    Url.prototype.encode = encode;

    /**
     * Performs URL-specific decoding of the given encoded string
     *
     * @method Url#decode
     * @param {string} s - string to decode
     * @returns {string}
     */
    Url.prototype.decode = decode;

    /**
     * Checks if current URL is an absolute resource locator (globally absolute
     * or absolute path to current server)
     *
     * @returns {boolean}
     */
    Url.prototype.isAbsolute = function () {
        return this.protocol || this.path.charAt(0) === '/';
    };

    /**
     * Returns string representation of current Url object
     *
     * @returns {string}
     */
    Url.prototype.toString = function () {
        return (
            (this.protocol && (this.protocol + '://')) +
            (this.user && (
                encode(this.user) + (this.pass && (':' + encode(this.pass))
                ) + '@')) +
            (this.host) +
            (this.port && (':' + this.port)) +
            (this.path) +
            (this.query.toString() && ('?' + this.query)) +
            (this.hash && ('#' + encode(this.hash)))
        );
    };

    ns[ns.exports ? 'exports' : 'Url'] = Url;
}(typeof module !== 'undefined' && module.exports ? module : window));
