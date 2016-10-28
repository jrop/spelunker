'use strict'

const {spawn} = require('child_process')

function _spawn(cmd, args, opts) {
	const proc = spawn(cmd, args, opts)

	const stdout = [], stderr = []
	if (proc.stdout && proc.stderr) {
		proc.stdout.on('data', d => stdout.push(d))
		proc.stderr.on('data', d => stderr.push(d))
	}
	const promise = new Promise((yes, no) => {
		proc.on('error', e => no(e))
		proc.on('close', (code, signal) => typeof code == 'number' && code == 0 ? yes() : no(new Error(`Non-zero exit code returned: ${code || signal}`)))
	})

	//
	// Promisified extras:
	//
	proc.then = (t, e) => promise.then(t, e)
	proc.io = () => new Promise(yes => {
		if (!proc.stdout || !proc.stderr) throw new Error('Cannot call proc.text() on a process that inherits its parents IO')
		return proc.then(() => yes({
			stdout: Buffer.concat(stdout),
			stderr: Buffer.concat(stderr),
		}))
	})
	proc.out = (enc) => proc.io().then(result => result.stdout.toString(enc))
	proc.err = (enc) => proc.io().then(result => result.stderr.toString(enc))
	return proc
}
module.exports = _spawn
