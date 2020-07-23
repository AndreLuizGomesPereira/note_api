var express = require('express');
var router = express.Router();
const Note = require('../models/note');
const withAuth = require('../middlewares/auth');

// Criar uma nova nota.
router.post('/', withAuth, async (req, res) => {
    const { title, body } = req.body;

    try {
        let note = new Note({ title: title, body: body, author: req.user._id });
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar uma nota.' });
    }
})

// Listar todas as notas criadas pelo usuário
router.get('/', withAuth, async (req, res) => {
    try {
        let notes = await Note.find({ author: req.user._id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Listar uma nota por ID com usuário logado
router.get('/:id', withAuth, async (req, res) => {
    try {
        const { id } = req.params;
        let note = await Note.findById(id);
        if (isOwner(req.user, note))
            res.json(note);
        else
            res.status(403).json({ error: 'Usuário não tem permissão.' });

    } catch (error) {
        res.status(500).json({ error: 'Não foi possível visualizar a nota.' });

    }
})

//Editar uma nota.
router.put('/:id', withAuth, async (req, res) => {
    const { title, body } = req.body;
    const { id } = req.params;

    try {
        let note = await Note.findById(id);
        if (isOwner(req.user, note)) {
            let note = await Note.findByIdAndUpdate(id,
                { $set: { title: title, body: body } },
                { upsert: true, 'new': true })
            res.json(note);
        } else {
            res.status(403).json({ error: 'Usuário não tem permissão para editar.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Problemas para atualizar a nota.' });

    }
});

//Remoção da nota.
router.delete('/:id', withAuth, async (req, res) => {
    const { id } = req.params;

    try {
        let note = await Note.findById(id);
        if (isOwner(req.user, note)) {
            await note.delete();
            res.json({ messsage: 'Nota removida com sucesso!' }).status(204);
        } else {
            res.status(403).json({ error: 'Usuário não tem permissão para remover a nota.' });

        }
    } catch (error) {
        res.status(500).json({ error: 'Problemas para deletar a nota.' });

    }
})



const isOwner = (user, note) => {
    if (JSON.stringify(user._id) == JSON.stringify(note.author._id))
        return true;
    else
        return false;
}

module.exports = router;