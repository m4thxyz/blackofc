"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sticker = void 0;

const lib = require('./lib');
const EventEmitter = require('events');
const ops = {
	webp: true,
	edit: false, // './merge/circle.png'
	convert: false,
	transparent: false, // []
	metadata: false // {pack, author, emojis: ['😮'] }
}
const diretory = __dirname;
exports.Sticker = class Sticker {
	constructor(options = {}) {
		Object.assign(this, lib)
		this.dir = diretory
		this.diretory = this.mkDir(this.dir+'/tmp/')
		this.arrayFiles = []
		this.options = Object.assign(ops, options)
		this.ev = new EventEmitter()
	}
	
	addFile(file) {
		this.arrayFiles.push(file)
	};
	
	clear() {
		for (const f of [
			'file', 'ext', 'time', 'width', 'height'
		]) {
			delete this[f]
		}
		this.arrayFiles = []
	};
	
	reloadObject(file, ext) {
		return this.checkfile({ file, ext }).then(res => {
			Object.assign(this, res)
			return Promise.resolve(res)
		})
	};
	
	selectTypeMerge(type) {
		if (this.existsSync(this.dir+'/merge/'+type)) {
			return this.readFileSync(this.dir+'/merge/'+type)
		}
		switch (type) {
			case 'circle':
				return this.readFileSync(this.dir+'/merge/circle.png')
			case 'primas':
				return this.readFileSync(this.dir+'/merge/primas.png')
			case 'borda':
				return this.readFileSync(this.dir+'/merge/borda.png')
			case 'piramide':
				return this.readFileSync(this.dir+'/merge/piramide.png')
			default:
				return type
		}
	};
	
	async start() {
		const type = this.options?.type || null
		const read = this.arrayFiles.map((file, index) => {
			this.ev.emit('st.start', { file, index })
			return this.download(file, this.diretory+Date.now()).then(async (v) => {
				const res = await this.reloadObject(v.file, v.ext)
				this.ev.emit('st.info', { index, ...res })
				this.options.type = type
				try {
					if (
						this.options.transparent &&
						this.options.transparent.length
					) {
						await this.imageTransparent(this.options.transparent)
					} else if (this.options.edit) {
						await this.imageEdit(this.selectTypeMerge(this.options.edit))
						this.options.type = 'readjust'
					}
					if (this.options.webp) {
						await this.webp(this.options)
					}
					if (this.options.metadata) {
						await this.exif(this.options.metadata)
					}
					if (this.options.convert) {
						await this.webpToMedia()
					}
					this.options.type = type
					this.ev.emit('st.data', { index, file: this.file })
					return Promise.resolve(this.file)
				} catch (error) {
					this.ev.emit('st.error', { index, file: this.file, error })
					return Promise.reject(error)
				}
			})
		})
		if (!read.length) return Promise.reject('Não foi adicionado nenhum arquivo/buffer/url no cache.')
		const result = await Promise.allSettled(read)
		return Promise.resolve(result)
	};
}