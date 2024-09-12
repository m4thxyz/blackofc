"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageTransparent = exports.webpToMedia = exports.imageEdit = exports.webp = void 0;

const ffmpeg = require('fluent-ffmpeg') // ^2.1.2
exports.webp = function (config) {
	const { fps, type } = Object.assign({ fps: 15, type: null }, config || {})
	return new Promise(async (resolve, reject) => {
		if (!this.file) return reject('Sem arquivo para continuar.')
		if (!/png|jpeg|jpg|gif|mp4|webm/.test(this.ext)) {
			return resolve(this.file)
		}
		
		const dateWebp = this.diretory+`${Date.now()}_result.webp`
		const tag = this.optionCutFfmpeg(type, fps, this.width, this.height)
		ffmpeg(this.file).on('error', (err) => {
			this.unlinkSync(this.file)
			reject(err)
		}).on('end', async (end) => {
			this.unlinkSync(this.file)
			await this.reloadObject(dateWebp, 'webp')
			resolve(this.file)
		}).addOutputOptions(tag).toFormat('webp').save(dateWebp)
	})
}

exports.imageTransparent = function (keybg = []) {
	const keyRandom = this.randomSelect(keybg)
	return new Promise(async (resolve, reject) => {
		if (!this.file) return reject('Sem arquivo para continuar.')
		if (/png/.test(this.ext)) return resolve(this.file)
		
		const { removeBackgroundFromImageFile } = require('remove.bg')
		if (keyRandom) {
			await removeBackgroundFromImageFile({
				path: this.file,
				apiKey: keyRandom,
				size: 'auto',
				type: 'auto'
			}).then(async ({ base64img }) => {
				this.unlinkSync(this.file)
				this.ext = 'png'
				this.file = this.diretory+'edit-'+Date.now()+'.'+this.ext
				const buffer = new Buffer.from(base64img, 'base64')
				this.writeFileSync(this.file, buffer)
				await this.reloadObject(this.file, this.ext)
				resolve(this.file)
			}).catch((error) => reject(error))
		}
		resolve(this.file)
	})
}

exports.webpToMedia = function () {
	return new Promise(async (resolve, reject) => {
		if (!this.file) return reject('Sem arquivo para continuar.')
		if (!/webp/.test(this.ext)) return resolve(this.file)
		
		const img = this.diretory+Date.now()+'.png'
		this.exec(`convert ${this.file} -trim +repage -background transparent -flatten ${img}`, async (err, stdout, stderr) => {
			if (err) return reject(err)
			
			this.unlinkSync(this.file)
			await this.reloadObject(img, 'png')
			resolve(this.file)
		})
	})
}

exports.imageEdit = function (file) {
	return this.download(file, this.diretory+'merge_'+Date.now()).then((res) => {
		return new Promise(async (resolve, reject) => {
			if (!this.file) return reject('Sem arquivo para continuar.')
			if (res.ext !== 'png') {
				this.deleteFile(res.file)
				return resolve(this.file)
			}
		
			const cropImg = this.diretory+`${Date.now()}_crop.png`
			const dateImg = this.diretory+`${Date.now()}_result.png`
			const tag = this.optionCutFfmpeg('crop', 15, this.width, this.height)
			ffmpeg(this.file).on('error', (err) => {
				this.unlinkSync(this.file)
				reject(err)
			}).on('end', (end) => {
				this.deleteFile(this.file)
				this.exec(`ffmpeg -hide_banner -i ${cropImg} -i ${res.file} -filter_complex "[0]scale=400:400[ava];[1]alphaextract[alfa];[ava][alfa]alphamerge" ${dateImg}`, async (err, stdout, stderr) => {
					this.deleteFile(res.file);
					this.deleteFile(cropImg);
					if (err) return reject(err)
					
					await this.reloadObject(dateImg, 'png')
					resolve(this.file)
				})
			}).addOutputOptions(tag).save(cropImg)
		})
	})
}