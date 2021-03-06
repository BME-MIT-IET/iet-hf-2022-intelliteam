'use strict';

const assert = require('assert');
const fs = require('fs');
const p = require('path');
const Url = require('../url.js');

function sanitizeURL(url) {
    const u = new Url(url, true);

    if (u.query.reload) {
        delete u.query.reload;
    }

    if (u.query.forceReload) {
        delete u.query.forceReload;
    }

    if (u.query.device) {
        delete u.query.device;
    }

    if (u.query.testwebid) {
        delete u.query.testwebid;
    }

    if (u.query.testWebId) {
        delete u.query.testWebId;
    }

    if (u.query.testWebID) {
        delete u.query.testWebID;
    }

    if (u.query.timetravel) {
        delete u.query.timetravel;
    }

    return u.toString();
}

describe('Url()', function () {
    it('should construct an object', function () {
        const u = new Url();
        assert.equal(u instanceof Url, true);
    });
    it('should match current dir when construct with no argument', function () {
        const u = new Url();
        let dir = u.path.replace(/\//g, p.sep);
        process.platform.match(/^win/) && (dir = dir.substring(1));
        assert.equal(dir, fs.realpathSync('.').replace(' ', '%20'));
    });
    it('should keep URL without transformations if requested', function () {
        assert.equal(
            sanitizeURL('/SearchResults?search=new&make=Buick&year=2016&forceReload=true'),
            '/SearchResults?search=new&make=Buick&year=2016'
        );
    });
    it('should test absolutize url', function () {
        const absoluteUrl = new Url('/foo');
        assert.equal(absoluteUrl.toString(), 'file:///foo');

        const noTransform = new Url('/foo', true);
        assert.equal(noTransform.toString(), '/foo');
    });
});

describe('Url.clearQuery()', function () {
    it('should remove all vars from query string', function () {
        const url = new Url('http://example.com/?a&a=&b=&c=&d=&e=&f=&g=&h#foo');
        url.clearQuery();
        assert.equal('http://example.com/#foo', url.toString());
    });
});

describe('Url.encode(), Url.decode()', function () {
    it('should correctly encode and decode query string params', function () {
        const url1 = new Url('http://localhost/?a=%3F').toString();
        const url2 = new Url('http://localhost/?a=%3f').toString();
        assert.equal(url1.toLowerCase(), url2.toLowerCase());
    });
    it('should correctly handle special characters and invalid encodings', function () {
        let u = new Url('http://localhost/alexa/%E0%80%80');
        assert.equal(u.toString(), 'http://localhost/alexa/%25E0%2580%2580');

        u = new Url('http://localhost/alexa/???');
        assert.equal(u.toString(), 'http://localhost/alexa/%E1%80%80');

        u = new Url('http://localhost/alexa/%ff%bf%bf');
        assert.equal(u.toString(), 'http://localhost/alexa/%25ff%25bf%25bf');

        u = new Url('http://localhost/alexa/%C0%80');
        assert.equal(u.toString(), 'http://localhost/alexa/%25C0%2580');

        u = new Url('http://localhost/alexa/??');
        assert.equal(u.toString(), 'http://localhost/alexa/%C2%A3');
    });
});

describe('Url.queryLength()', function () {
    it('should correctly return correct query lengths', function () {
        let url = new Url('http://localhost/?a=%3F');
        let queryLength = url.queryLength();
        assert.equal(queryLength, 1);

        url = new Url('http://localhost/');
        queryLength = url.queryLength();
        assert.equal(queryLength, 0);

        url = new Url('http://localhost/?a=%3F&test=this&hello=world');
        queryLength = url.queryLength();
        assert.equal(queryLength, 3);
    });
});

describe('Url.query.toString()', function () {
    it('should maintain name for null values, and drop them for undefined values', function () {
        const originalStr = 'http://localhost/path?alice=123&bob=&carol';
        const u = new Url(originalStr);
        assert.equal(u.query.alice, '123');
        assert.equal(u.query.bob, '');
        assert.equal(u.query.carol, null);
        assert.equal(u.query.dave, undefined);
        assert.equal(u.toString(), originalStr);

        u.query.eve = null;
        assert.equal(u.toString(), originalStr + '&eve');
        u.query.eve = undefined;
        assert.equal(u.toString(), originalStr);

        u.query.frank = 'foo';
        assert.equal(u.toString(), originalStr + '&frank=foo');
        delete u.query.frank;
        assert.equal(u.toString(), originalStr);

        let url = new Url("http://localhost/alexa?a=10");
        assert.equal(url.path, '/alexa');

        url = new Url("http://localhost/alexa?a=");
        assert.equal(url.path, '/alexa');

        url = new Url("http://localhost/alexa?=10");
        assert.equal(url.path, '/alexa');

        url = new Url("http://localhost/alexa?=");
        assert.equal(url.path, '/alexa');

        url = new Url("http://localhost/alexa?a=10&a&10&& = ");
        assert.equal(url.path, '/alexa');
    });

    it('should maintain name for null values in arrays, and skip undefined values', function () {
        const originalStr = 'http://localhost/?a&a&a';
        const u = new Url(originalStr);
        assert.equal(u.query.toString(), 'a&a&a');
        assert.equal(u.query.a instanceof Array, true);
        assert.equal(u.query.a[0], null);
        assert.equal(u.query.a[1], null);
        assert.equal(u.query.a[2], null);
        assert.equal(u.queryLength(), 1);
        assert.equal(u.toString(), originalStr);

        u.query.a[1] = undefined;
        assert.equal(u.toString(), 'http://localhost/?a&a');

        u.query.a[1] = 'foo';
        assert.equal(u.toString(), 'http://localhost/?a&a=foo&a');

        u.query.a[1] = undefined;
        assert.equal(u.toString(), 'http://localhost/?a&a');

        u.query.a[1] = null;
        assert.equal(u.toString(), originalStr);
    });
});

describe('Url props interface', function () {
    it('should parse all URL parts correctly', function () {
        const str = 'wss://user:pass@example.com:9999/some/path.html?foo=bar#anchor';
        const u = new Url(str);
        assert.equal(u.protocol, 'wss');
        assert.equal(u.user, 'user');
        assert.equal(u.pass, 'pass');
        assert.equal(u.host, 'example.com');
        assert.equal(u.port, '9999');
        assert.equal(u.path, '/some/path.html');
        assert.equal(u.query, 'foo=bar');
        assert.equal(u.query.foo, 'bar');
        assert.equal(u.hash, 'anchor');
        assert.equal(str, u.toString());

        let url = new Url(p.resolve('../alexa'));
        assert.equal(url.path, p.resolve('../alexa'));
    });
});

describe('Path url encoding', function () {
    it('should correctly encode whitespace as %20', function () {
        const u = new Url('http://localhost/path with space');
        assert.equal(u.toString(), 'http://localhost/path%20with%20space');
    });
    // TODO: Fix https://github.com/Mikhus/domurl/issues/49
    xit('should correctly encode Plus Sign (+) to %2b in path.', function () {
        const u = new Url('http://localhost/path+with+plus');
        assert.equal(u.toString(), 'http://localhost/path%2bwith%2bplus');
    });
    xit('should preserve Plus Sign (+) in path.', function () {
        const u = new Url('http://localhost/path+with+plus');
        assert.equal(u.toString(), 'http://localhost/path%2bwith%2bplus');
    });
});

describe('Empty query', function () {
    it('should give empty query for empty array', function () {
        const url = new Url("http://localhost/goma?a=10");

        url.query.a = []

        assert.equal(url.toString(), "http://localhost/goma?a=");
    });
    it('should give true when query is empty', function () {
        const url = new Url("http://localhost/goma");

        assert.equal(url.isEmptyQuery(), true);
    });
});

describe('Url.urlConfig()', function () {
    it('should configure given url options', function () {
        let url = new Url('');
        assert.equal(url.path, new Url('').path);
        assert.equal(url.query, '');
        assert.equal(url.hash, '');

        url = new Url(null);
        assert.equal(url.path, new Url('').path);
        assert.equal(url.query, '');
        assert.equal(url.hash, '');

        url = new Url('http://localhost:8080');
        assert.equal(url.port, '8080');

        url = new Url('http://user:passw@example.com');
        assert.equal(url.user, 'user');
        assert.equal(url.pass, 'passw');
    });
});
