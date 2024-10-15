const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.render('index', { users });
});

// Create a user
router.post('/add', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.redirect('/');
});

// Edit a user
router.get('/edit/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('edit', { user });
});

// Update a user
router.post('/update/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

// Delete a user
router.get('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;

