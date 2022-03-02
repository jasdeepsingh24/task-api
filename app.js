const express=require('express');
const app=express();
const tasks=require('./routes/tasks');
const connectDB=require('./db/connect');
const notFound=require('./middleware/not-found');
const port=3000;
require('dotenv').config()
const start= async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is listening ${port}...`))
    }catch(error)
    {
        console.log(error);
    }
}


// middleware
app.use(express.json())

// routes
app.use('/api/v1/tasks',tasks)
app.use(notFound);

// -------------------------------------------------------------------------
// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')        - create new task
// app.get('/api/v1/tasks/:id')     - get single task
// app.patch('/api/v1/tasks/:id')   - update task   - put/patch
// app.delete('/api/v1/tasks/:id')  - delete task
// -------------------------------------------------------------------------

start()