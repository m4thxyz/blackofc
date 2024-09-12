"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataBlocksLength = exports.deleteFile = exports.checkfile = exports.isAnimated = exports.isUrl = void 0;

exports.getDataBlocksLength = (buffer, offset) => {
	var length = 0
	while (buffer[offset + length]) {
		length += buffer[offset + length] + 1
	}
	return length + 1
}

exports.deleteFile = function (file) {
	return this.existsSync(file) && this.unlinkSync(file)
}

exports.isGIF = function (buffer) {
	var header = buffer.slice(0, 3).toString('ascii')
	return (header === 'GIF')
}

exports.isAnimated = async function (filePath) {
	const buffer = this.readFileSync(filePath)
	const type = (await this.fromBuffer(buffer)).ext
	switch (type) {
		case 'webp':
			var ANIM = [0x41, 0x4E, 0x49, 0x4D]
			for (var i = 0; i < buffer.length; i++) {
				for (var j = 0; j < ANIM.length; j++) {
					if (buffer[i + j] !== ANIM[j]) {
						break
					}
				}
				if (j === ANIM.length) return true
			}
			return false
		case 'gif': case 'mp4':
			return true
		case 'png':
			const Jimp = require('jimp');
			const image = await Jimp.read(filePath);
			return image.hasAlpha()
		break
	}
}

exports.checkfile = function ({ file, ext }) {
	return new Promise((resolve, reject) => {
		this.exec(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of csv=p=0:s=x ${file}`, (err, stdout) => {
			if (err) return reject(err)
			
			const [width, height, time] = stdout.split("x")
			resolve({
				file,
				ext,
				time: `${time.trim().includes('.') ? time.trim().split('.')[0] : time.trim()}`,
				width: Number(width.trim()),
				height: Number(height.trim())
			})
		})
	})
}

exports.isUrl = function (url) {
	const Url = /http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/
	return Url.test(url) ? url.match(Url) : []
}

exports.promise = async function (array, type = 'settled') {
	if (!Array.isArray(array)) return Promise.reject("Isso não é uma Array.")
	if (!array.length) return Promise.reject("Necessário ter algo dentro da array.")
		
	switch (type) {
		case 'settled':
			let results = await Promise.allSettled(array)
			results = results.find(i => i.status === 'fulfilled')
			return results ? Promise.resolve(results.value) : Promise.reject('Nenhuma data foi encontrada.')
		case 'any':
			return Promise.any(array)
		case 'race':
			return Promise.race(array)
		default:
			return Promise.reject("")
	}
}