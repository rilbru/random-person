import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import asyncHandler from 'express-async-handler';

const PORT = process.env.PORT
const app = express();

app.use(express.static('public'));

// Note: Don't add or change anything above this line.
/* Add your code here */

// counter to keep track of each time random-person is clicked
let count = 0;

// log every 10 requests for random-person
const printStats = (req, res, next) => {
    count += 1;
    if (count % 10 === 0) {
        console.log(`Total requests for random-person: ${count}`);
    }
    next();
}

// route handler for random-person
// throws error if status is not 200 
app.get("/random-person", printStats, async (req, res) => {
    try {
        const response = await fetch("https://randomuser.me/api/");
        if (response.status !== 200) {
            throw new Error(`Unsuccessful: ${error}`);
        }
        const data = await response.json();    
        res.send(data);
    } catch (error) {
        console.error(error);
        res.send('500 - server error');
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.log(`Unhandled error ${error}`)
    res.send('500 - server error');
});

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});