export function saveNote(date, content) {
    localStorage.setItem(`note_${date}`, content);
  }
  
  export function getNote(date) {
    return localStorage.getItem(`note_${date}`);
  }
  
  export function getAllNotes() {
    return Object.keys(localStorage)
      .filter(key => key.startsWith('note_'))
      .map(key => ({
        date: key.replace('note_', ''),
        content: localStorage.getItem(key)
      }));
  }
  
  export function exportToJSON() {
    return JSON.stringify(getAllNotes());
  }
  
  export function importFromJSON(jsonString) {
    const notes = JSON.parse(jsonString);
    notes.forEach(note => saveNote(note.date, note.content));
  }