import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Demo App');
});


app.listen(3000, () => console.log(`server running on the port ${PORT}`));