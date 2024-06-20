const connectToMongo=require('./db');
const cors=require('cors');

const express = require('express')
const app = express()
const port=5000
connectToMongo();

app.use(cors());
app.use(express.json());

// Available routes
app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/notes',require('./routes/notes.js'));

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port,()=>{
    console.log(`iNotebook backend listening at http://localhost:${port}`);
})