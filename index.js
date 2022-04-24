import express from 'express';
import joi from 'joi';
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const courses = [
    {id: 1, name: "JavaScript"},
    {id: 2, name: "Java"},
    {id: 3, name: "PHP"},
]

app.get('/', (req, res) => {
    res.send('Demo App');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
   let course = courses.find(course => course.id === parseInt(req.params.id));
   // validate user input
   if(!course) res.status(404).send('The course with the given id not found')
   res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: joi.string().min(3).required()
    }
    const result = joi.validate(req.body, schema);
    if(result.error){
        // bad request 400
        res.status(400).send(result.error.details[0].message);
        return; // we don't want the rest of the function to be executed
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(`The ${course.name} course added to the database`);
})



app.listen(port, () => console.log(`server running on the port ${port}`));