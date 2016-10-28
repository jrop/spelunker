'use strict'

require('loud-rejection')()
require('mocha-generators').install()
const assert = require('assert')
const {ChildProcess} = require('child_process')
const spelunker = require('./index')

describe('spelunker', function () {
	it('should return a ChildProcess', function * () {
		const proc = spelunker('echo', [ 'Hey' ], { stdio: 'pipe' })
		assert(proc instanceof ChildProcess)
		yield proc
	})
	it('should be thenable', function * () {
		const proc = spelunker('echo', [ 'Hey' ], { stdio: 'pipe' })
		assert(typeof proc.then == 'function')
		assert(!(yield proc))
	})
	it('should support errors', function * () {
		let err = null
		try {
			const proc = yield spelunker('ls', [ 'asdf' ], { stdio: 'pipe' })
		} catch (e) {
			err = e
		}
		assert(err !== null && err.message.includes('exit code'))
	})
	it('.io()', function * () {
		const { stdout, stderr } = yield spelunker('echo', [ 'Hey' ], { stdio: 'pipe' }).io()
		assert(stdout instanceof Buffer)
		assert(stderr instanceof Buffer)
	})
	it('.out()', function * () {
		const out = yield spelunker('echo', [ 'Hey' ], { stdio: 'pipe' }).out()
		assert.equal(out, 'Hey\n')
	})
	it('.err()', function * () {
		const err = yield spelunker('echo', [ 'Hey' ], { stdio: 'pipe' }).err()
		assert.equal(err, '')
	})
})
