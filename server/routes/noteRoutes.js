const express = require('express');
const router = express.Router();
const {fetchNotes, createNote, getNotebyid, updateNote, DeleteNote} = require('../controllers/noteController')
const {protect} = require('../middlewares/authmiddleware')

router.route('/').get(protect, fetchNotes)
router.route('/create').post(protect, createNote)
router.route('/:id').get(getNotebyid).put(protect, updateNote).delete(protect, DeleteNote)

module.exports = router;