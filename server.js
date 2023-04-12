const express = require('express');
const { db } = require('./db');

const app = express();
const port = 3000;

/**
 * We assume that:
 * - query parameters are correct
 * - our user exists  
 */
app.get('/balance/change', async (req, res) => {
    const { userId, amount } = req.query;

    const q = `
        UPDATE user_balance
        SET balance = balance - $1
        WHERE user_id = $2 AND balance >= $3
        RETURNING *;
    `;
    /**
     * Also we can solve the task by check constraint on the table:
     * - balance INT NOT NULL CHECK balance >= 0
     */

    const { rows } = await db.query(q, [amount, userId, amount]);

    if (rows.length) {
        return res.json({ status: 'ok' });
    }

    return res.json({ status: 'failed' });
});

app.listen(port, () => {
    console.log(`Server is on port ${port}`);
});
