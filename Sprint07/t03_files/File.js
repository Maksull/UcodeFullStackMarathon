import path from 'path';
import fs from 'fs';

export class File {
	constructor(name) {
		this.name = name;
		this.pathDir = path.join(path.resolve(), './tmp');
	}

	write(text) {
		if (!text) {
			throw new Error('Please provide text to write');
		}

		if (!fs.existsSync(this.pathDir)) {
			fs.mkdirSync(this.pathDir);
		}

		const filePath = path.join(this.pathDir, this.name);

		if (!fs.existsSync(filePath)) {
			fs.writeFileSync(filePath, text, 'utf8');
		} else {
			fs.appendFileSync(filePath, `\n${text}`);
		}
	}

	delete() {
		const filePath = path.join(this.pathDir, this.name);
		try {
			fs.unlinkSync(filePath);
		} catch (err) {
			console.error(`Error deleting file ${this.name}: ${err.message}`);
		}
	}

	read() {
		const filePath = path.join(this.pathDir, this.name);
		try {
			return fs.readFileSync(filePath, 'utf8');
		} catch (err) {
			console.error(`Error reading file ${this.name}: ${err.message}`);
			return '';
		}
	}
}
