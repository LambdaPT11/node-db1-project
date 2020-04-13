const express = require('express')
const router = express.Router()

const db = require('../data/dbConfig')

router.get('/', (req, res) => {
    db('accounts')
        .then(rows => {
            res.status(200).json({ data: rows })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
});

router.get('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(act => {
            if(act) {
                res.status(200).json({ data: act })
            } else {
                res.status(404).json({ msg: 'check the id, Record not found' })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "get with the id went wrong" })
        })
});

router.post('/', (req, res) => {
    db("accounts")
        .insert(req.body, "id")
        .then(ids => {
            res.status(201).json({ results: ids });
        })
        .catch(error => {
            res.status(500).json({ error: "post went wrong" });
        });
});

router.put('/:id', (req, res) => {
    const info = req.body;

    db("accounts")
    .where({id: req.params.id})
    .update(info)
    .then(act => {
        if(act > 0) {
            res.status(200).json({ message: `Record ${act} updated` });
        } else {
            res.status(404).json({ message: "Account not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ error: "put went wrong" });
    });
});

router.delete('/:id', (req, res) => {
    db("accounts")
    .where({id: req.params.id})
    .del()
    .then(act => {
        if(act > 0) {
            res.status(200).json({ message: `Record ${act} deleted` });
        } else {
            res.status(404).json({ message: "Account not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ error: "delete went wrong" });
    });
});

module.exports = router;
