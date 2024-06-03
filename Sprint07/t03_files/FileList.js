import path from 'path';
import fs from 'fs';

export class FileList {
	constructor() {
		this.pathDir = path.join(path.resolve(), './tmp');
	}

	getList() {
		const fileData = [];
		try {
			const files = fs.readdirSync(this.pathDir);
			files.forEach((file) => {
				const text = fs.readFileSync(path.join(this.pathDir, file), 'utf-8');
				fileData.push({ fileName: file, text });
			});
		} catch (err) {
			console.error(`Error reading files: ${err.message}`);
		}
		return fileData;
	}

	hasFiles() {
		try {
			if (!fs.existsSync(this.pathDir)) {
				fs.mkdirSync(this.pathDir);
			}
			const isEmpty = fs.readdirSync(this.pathDir).length === 0;
			return !isEmpty;
		} catch (err) {
			console.error(`Error checking for files: ${err.message}`);
			return false;
		}
	}

	getHTMLList() {
		let buf = '';
		try {
			const files = fs.readdirSync(this.pathDir);
			files.forEach((fileName) => {
				buf += `<li><a href="/select-file?file=${fileName}">${fileName}</a></li>`;
			});
		} catch (err) {
			console.error(`Error creating HTML list: ${err.message}`);
		}
		return `<ul>${buf}</ul>`;
	}
}
