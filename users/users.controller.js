const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/authenticate', getAuthenticate);
router.get('/test',getTest);
router.get('/', getAll);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAuthenticate(req, res, next) {
    userService.getAuthenticate(req.body)
        .then(message => res.json(message))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getTest(req, res,next) {
	userService.getTest(req.body).then(res.status(200).json({ message: 'test' })).catch(err => next(err));
}
