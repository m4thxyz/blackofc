"use strict";
Object.defineProperty(module.exports, "__esModule", { value: true });
module.exports = void 0;

const FileType = require('file-type'); // 16.5.3
module.exports = {
	...console,
	...require('fs'),
	...require("child_process"),
	removeExtFile(file) {
		if (!file?.startsWith('./')) return { pasta: './', file, newFile: file }
		
		const arr = file.split('/')
		file = arr.pop()
		const pasta = arr.filter(i => i !== file).join('/').trim()+'/'
		file = file.split('.').filter(i => !FileType.extensions.has(i)).join('.')
		return { pasta, file, newFile: pasta+file }
	},	
	renameFile(directory) {
		const { pasta, file } = this.removeExtFile(directory)
		return pasta+(Number(file) ? file : file?.replace(/á|â|ã|à|ä/g, 'a').replace(/Á|Â|Ã|À|Ä/g, 'A').replace(/ć|ç|č/g, 'c').replace(/Ć|Ç|Č/g, 'C').replace(/é|ê|è|ë/g, 'e').replace(/É|Ê|È|Ë/g, 'E').replace(/í|î|ì|ï/g, 'i').replace(/Í|Î|Ì|Ï/g, 'I').replace(/ó|õ|ô|ò|ö/g, 'o').replace(/Ó|Õ|Ô|Ò|Ö/g, 'O').replace(/ú|û|ù|ü/g, 'u').replace(/Ú|Û|Ù|Ü/g, 'U').replace(/[^a-zA-Z0-9-_().\s]+/g, '-').trim())
	},
	read(filename) {
		return new Promise((resolve, reject) => {
			this.readFile(filename, (err, data) => {
				if (Buffer.isBuffer(data)) {
					resolve(data)
				} else {
					resolve(this.readFileSync(this.write(filename)))
				}
			});
		});
	},
	write(filename, buffer = Buffer.alloc(1)) {
		const path = require("path");
		const tempFilename = path.join(path.dirname(filename), `.${path.basename(filename)}.tmp`);
		buffer = new Buffer.from(buffer, 'base64')
		this.writeFileSync(tempFilename, buffer)
		this.renameSync(tempFilename, filename)
		return filename
	},
	mkDir(paste) {
		const folderInfo = this.existsSync(paste) && this.statSync(paste)
		if (folderInfo) {
			if (!folderInfo?.isDirectory()) {
				throw new Error(`Encontrou algo que não é um diretório em ${paste}, exclua-o ou especifique um local diferente.`);
			}
		} else {
			this.mkdirSync(paste, { recursive: true });
		}
		return paste
	},
	fromBuffer: async (buffer) => {
		if (!Buffer.isBuffer(buffer)) buffer = Buffer.alloc(1)
			
		const ext = await FileType.fromBuffer(buffer) || { mime: 'application/octet-stream', ext: 'bin' }
		return ext
	},
	randomSelect(array) {
		if (!(Array.isArray(array) && array.length)) return null
		return array[Math.floor(Math.random() * array.length)]
	},
	downloadFileFromUrl(url, destinationPath) {
		return new Promise((resolve, reject) => {
			const https = require('https'); http = require('http');
			(url.startsWith('https://') ? https.get : http.get)(url, (response) => {
				if (response.statusCode !== 200) {
					reject(`Falha na requisição. Código de status: ${response.statusCode}`);
					return
				};
				
				const fileStream = this.createWriteStream(destinationPath);
				response.pipe(fileStream);
				fileStream.on('finish', () => {
					fileStream.close();
					resolve(destinationPath);
				});
				fileStream.on('error', (err) => {
					this.unlinkSync(destinationPath);
					reject(`Erro ao salvar o arquivo: ${err.message}`);
				});
			}).on('error', (err) => {
				reject(`Erro na requisição: ${err.message}`);
			});
		});
	},
	async fetchBuffer(url, options = {}) {
		const fetch = require('node-fetch'); // 2.6.1
		return fetch(url, typeof options == 'object' ? options : {}).then(async (res) => {
			if (!(res && 'ok' in res)) return Promise.reject("Sem data.");
				
			let buffer = null
			try {
				buffer = await res.buffer()
				buffer = new Buffer.from(buffer.toString('base64'), 'base64');
			} catch {
				try {
					buffer = await res.arrayBuffer()
					buffer = new Buffer.from(buffer, 'base64');
				} catch { };
			};
			if (!Buffer.isBuffer(buffer)) return Promise.reject("Sem resultado de Buffer.");
			
			return Promise.resolve(buffer);
		}).catch(() => Promise.reject("Não foi encontrado resultado!"));
	},
	getBuffer(url, options = []) {
		if (!/^https?:\/\//.test(url)) return Promise.reject('No url!');
		
		const https = require('https');
		const httpsAgent = new https.Agent({
			rejectUnauthorized: false
		});
		Object.assign(options, [
			{
				method: "GET",
				url,
				agent: httpsAgent,
				headers: { 'DNT': 1, 'Upgrade-Insecure-Request': 1 },
				responseType: 'arraybuffer'
			}, {
				method: 'GET',
				headers: { pragma: 'no-cache', range: 'bytes=0-' },
    			body: undefined
			}, {
				method: 'GET',
				agent: httpsAgent,
				headers: { 'User-Agent': 'okhttp/4.5.0' }
			}
		])
		return this.promise(options.filter(i => i).map(config => this.fetchBuffer(url, config)), 'any')
	},
	async download(file, fileName) {
		if (!fileName) fileName = this.mkDir('./tmp/')+'download-'+Date.now()
		fileName = this.renameFile(fileName)
		if (this.existsSync(file)) {
			const read = this.readFileSync(file)
			this.unlinkSync(file)
			return this.download(read, file)
		} else if (Buffer.isBuffer(file)) {
			const type = await this.fromBuffer(file);
			fileName = fileName+"."+type.ext
			this.writeFileSync(fileName, file)
			return Promise.resolve({
				file: fileName,
				buffer: () => {
					const b = this.readFileSync(fileName)
					this.unlinkSync(fileName)
					return b
				},
				...type,
				sizeBytes: () => this.statSync(fileName).size
			})
		} else if (/^data:.*?\/.*?;base64,/i.test(file)) {
			const buffer = new Buffer.from(file.split(",")[1], 'base64')
			return this.download(buffer, fileName)
		} else if (/^https?:\/\//.test(file)) {
			file = this.isUrl(file)[0]
			return this.promise([
				this.getBuffer(file).then((buffer) => {
					return this.download(buffer, fileName)
				}),
				this.downloadFileFromUrl(file, fileName).then((tempFile) => {
					return this.download(tempFile)
				})
			], 'any')
		} else {
			return Promise.reject("Não foi detectado nenhum tipo de arquivo conhecido.");
		}
	}
}