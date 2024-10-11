import { DBManager } from '../services/dbmanager.js';

function handleSaveNote() {
    const date = document.getElementById('date-input').value;
    const content = document.getElementById('note-content').value;
    DBManager.saveItem('dailyNotes', { date, content });
    updateNotesList();
    clearInputs();
}

async function displayNote(date) {
    const note = await DBManager.getItem('dailyNotes', date);
    if (note) {
        document.getElementById('note-display').textContent = note.content;
    } else {
        document.getElementById('note-display').textContent = 'No note found for this date.';
    }
}

async function updateNotesList() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    const notes = await DBManager.getAllItems('dailyNotes');
    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = `${note.date}: ${note.content.substring(0, 20)}...`;
        li.onclick = () => displayNote(note.date);
        notesList.appendChild(li);
    });
}

function clearInputs() {
    document.getElementById('date-input').value = '';
    document.getElementById('note-content').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('save-note').addEventListener('click', handleSaveNote);
    updateNotesList();
});

