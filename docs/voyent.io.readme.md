# Voyent Services Client

## Getting Started

The Voyent Services Client (voyent.io.js) is an easy-to-use JavaScript API for Voyent Services. To take advantage of it, include both the voyent.io.js library and it's parent, voyent.js:

```html
<script src="voyent.js"></script>
<script src="voyent.io.js"></script>
```

## ES6 Promise Support

The Voyent Services Client API is written with ECMAScript 6 Promise/A+ support. All API functions that use asynchronous network io will return a Promise. If your application already supports ES6 Promises, you can continue using those. ES6 Promises are supported in all modern browsers except IE11 (http://caniuse.com/#search=promise). To support older browsers, you can use a shim, such as `es6-promises`, like so:

```html
<script src="https://es6-promises.s3.amazonaws.com/es6-promise-2.0.1.js"></script>
<script>
    if( !("Promise" in window)){
        window.Promise = ES6Promise.Promise;
    }
</script>
<script src="voyent.js"></script>
<script src="voyent.io.js"></script>
```

## Tests

The Voyent JS API Mocha integration tests can be run from the test directory either through the HTML files or with PhantomJS.

```
mocha-phantomjs all-tests.html
```

Mocha and PhantomJS are both required.
