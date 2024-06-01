# rehype-id

[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

**[rehype][]** plugin to add `id`s to all elements based on their content, assigning each a unique id.

## Contents

- [rehype-id](#rehype-id)
  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [When should I use this?](#when-should-i-use-this)
  - [Install](#install)
  - [Use](#use)
  - [Documentation](#documentation)
    - [Returns](#returns)
    - [`Options`](#options)
  - [Security](#security)
  - [Related](#related)
  - [License](#license)

## What is this?

This package is a [unified][] ([rehype][]) plugin to add `id`s to all elements.
It looks for all elements (`<h1>`, `<p>`, `<span>`, etc.) that do not yet have `id`s
and adds `id` attributes to them based on the text they contain.
The algorithm that does this is [`uuid-by-string`](https://github.com/Danakt/uuid-by-string).

## When should I use this?

This plugin is useful for creating anchor links for every element in your document. For example, it enables adding comments or annotations to specific parts of a document. Additionally, it is helpful for generating a table of contents, as it allows linking to every section in the document.

A different plugin, [`rehype-slug`][rehype-slug], adds `id`s to headings. It looks for headings (so `<h1>` through `<h6>`) that do not yet have ids and adds id attributes to them based on the text they contain.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install rehype-id
```

## Use

Say we have the following file `example.html`:

```html
<h1 id="some-id">Lorem ipsum</h1>
<h2>Dolor sit amet 😪</h2>
<p>Hello world!</p>
<span>Hello world!</span>
```

…and our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {rehype} from 'rehype'
import rehypeId from 'rehype-ud'

const file = await rehype()
  .data('settings', {fragment: true})
  .use(rehypeId)
  .process(await read('example.html'))

console.log(String(file))
```

…then running `node example.js` yields:

```html
<h1 id="some-id">Lorem ipsum</h1>
<h2 id="h2-2e3b53f0">Dolor sit amet 😪</h2>
<p id="p-d3486ae9">Hello world!</p>
<span id="span-d3486ae9">Hello world!</span>
```

## Documentation

### Returns

Transform ([`Transformer`][unified-transformer]).

### `Options`

- `prefix` (`string`, default: `''`)
    — prefix to add in front of `id`s

- `skipHeadings` (`boolean`, default: `true`)
    — skip adding id to headings

## Security

Use of `rehype-id` can open you up to a [cross-site scripting (XSS)][xss]
attack as it sets `id` attributes on headings, which causes what is known
as “DOM clobbering”.
Please use [`rehype-sanitize`][rehype-sanitize] and see its
[Example: headings (DOM clobbering)][rehype-sanitize-example] for information on
how to properly solve it.

## Related

- [`rehype-slug`][rehype-slug]
    — add `id`s to headings based on their content

- [`rehype-autolink-headings`][rehype-autolink-headings]
    — add links to headings with IDs back to themselves

## License

[MIT][license] © [Daniel Castillo][author] strongly based on [`rehype-slug`][rehype-slug].

<!-- Definitions -->

[downloads-badge]: https://img.shields.io/npm/dm/rehype-slug.svg

[downloads]: https://www.npmjs.com/package/rehype-slug

[size-badge]: https://img.shields.io/bundlejs/size/rehype-slug

[size]: https://bundlejs.com/?q=rehype-slug

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[rehype-slug]: https://github.com/rehypejs/rehype-slug

[license]: license

[author]: https://dcastillogi.com

[rehype]: https://github.com/rehypejs/rehype

[rehype-autolink-headings]: https://github.com/rehypejs/rehype-autolink-headings

[rehype-sanitize]: https://github.com/rehypejs/rehype-sanitize

[rehype-sanitize-example]: https://github.com/rehypejs/rehype-sanitize#example-headings-dom-clobbering

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting