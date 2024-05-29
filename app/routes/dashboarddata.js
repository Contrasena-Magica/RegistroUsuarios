import express from 'express';

const router = express.Router();

//import db from '../utils/database.js';
import { query } from '../utils/database.js';

router.get('/admin', (req,res) => {
    db.query('SELECT * from user_info', (error, results) => {
        if(error) throw error;
        res.json(results[0])
    });
})

export default router;
//module.exports = router;