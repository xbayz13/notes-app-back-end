/* eslint-disable arrow-parens */
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt
  };

  notes.push(newNote);

  const isSuccess = notes.filter(note => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes
  }
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.find(note => note.id === id);

  if (note) {
    const response = h.response({
      status: 'success',
      data: {
        note
      }
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const note = notes.find(note => note.id === id);

  if (note) {
    const updatedAt = new Date().toISOString();
    const newNote = {
      ...note,
      title,
      tags,
      body,
      updatedAt
    };

    notes.splice(notes.indexOf(note), 1, newNote);

    const response = h.response({
      status: 'success',
      data: {
        note: newNote
      }
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan'
    });
    response.code(404);
    return response;
  }
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.find(note => note.id === id);

  if (note) {
    notes.splice(notes.indexOf(note), 1);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan'
    });
    response.code(404);
    return response;
  }
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
};
