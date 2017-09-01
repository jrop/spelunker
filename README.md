# Spelunker

[![Greenkeeper badge](https://badges.greenkeeper.io/jrop/spelunker.svg)](https://greenkeeper.io/)

require('child_process').spawn on steroids

## Installation

```sh
$ npm install --save spelunker
```

## Usage

### `spelunker(cmd[, args][, options]): ChildProcess`

This is the only function exported by the module, and it mirrors `require('child_process').spawn`.  It returns the same ChildProcess, with a few extra methods tacked on:

`proc.then(successHandler, errorHandler): Promise<void>`

`proc.io(): Promise<{ stdout: Buffer, stderr: Buffer }>`

`proc.out(encoding): Promise<String>` - Resolves stdout content, where `encoding` follows [Buffer encoding](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings)

`proc.err(encoding): Promise<String>` - Resolves stderr content, where `encoding` follows [Buffer encoding](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings)

## License (ISC)

ISC License

Copyright (c) 2016, Jonathan Apodaca <jrapodaca@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
