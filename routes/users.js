const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	res.send('User List');
})

router.get("/new", (req, res) => {
	res.send("User New Form");
})

router.post('/', (req, res) => {
	res.send('Create User');
})

router.get('/:id', (req, res) => {
	req.params.id;
	res.send('Get User with ID ${req.params.id}')
})

module.exports = router;