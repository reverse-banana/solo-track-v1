// Import storage functions (adjust the path as needed)
import { saveNote, getNote, getAllNotes } from '../js/tempStorage.js';

function handleSaveNote() {
    const date = document.getElementById('date-input').value;
    const content = document.getElementById('note-content').value;
    saveNote(date, content);
    updateNotesList();
    clearInputs();
}

function displayNote(date) {
    const note = getNote(date);
    if (note) {
        document.getElementById('note-display').textContent = note;
    } else {
        document.getElementById('note-display').textContent = 'No note found for this date.';
    }
}

function updateNotesList() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    getAllNotes().forEach(note => {
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