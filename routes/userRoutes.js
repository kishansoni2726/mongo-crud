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
    const { name, email } = req.body;

    try {
        const newUser = new User({ name, email });
        console.log(newUser);
        await newUser.save();
        res.redirect('/'); // Redirect after successful addition
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("Error adding user");
    }
});

// Edit a user
router.get('/edit/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('edit', { user });
});

// Update a user
router.post('/update/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }  // 'new' returns the updated document, 'runValidators' ensures validation
        );
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.redirect('/');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Server error');
    }
});
// Delete a user
router.get('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;

