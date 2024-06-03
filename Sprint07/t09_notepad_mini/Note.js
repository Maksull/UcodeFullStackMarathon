import fs from 'fs';
import { FormatDate } from './dateFormated.js';

export class Note {
	constructor() {
		this.note = this.loadNotes();
		this.list = this.buildList();
	}

	loadNotes() {
		try {
			const data = fs.readFileSync('noteData.json', 'utf-8');
			return JSON.parse(data || '{}');
		} catch (error) {
			console.error('Error reading notes:', error);
			return {};
		}
	}

	buildList() {
		return Object.entries(this.note);
	}

	saveNotes() {
		try {
			fs.writeFileSync('noteData.json', JSON.stringify(this.note));
		} catch (error) {
			console.error('Error writing notes:', error);
		}
	}

	add(note) {
		const id = Date.now();
		this.note[id] = {
			date: new FormatDate(id).getDate(),
			name: note.filename,
			importance: note.importance,
			text: note.content,
		};
		this.saveNotes();
	}

	getList() {
		return this.list;
	}

	get(id) {
		return this.note[id];
	}

	delete(id) {
		delete this.note[id];
		this.saveNotes();
	}

	getDetail(id) {
		const item = this.get(id);
		return item
			? `<h2>Detail of "${item.name}"</h2>
      <ul>
        <li>date: <b>${new FormatDate(item.date).getDate()}</b></li>
        <li>name: <b>${item.name}</b></li>
        <li>importance: <b>${item.importance}</b></li>
        <li>text: <b>${item.text}</b></li>
      </ul>`
			: 'Note not found';
	}
}
