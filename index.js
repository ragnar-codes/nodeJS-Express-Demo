import express from 'express';
import joi from 'joi';
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const courses = [
    {id: 1, name: "JavaScript"},
    {id: 2, name: "Java"},
    {id: 3, name: "PHP"},
    {id: 4, name: "laravel"},
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
   if(!course) return res.status(404).send('The course with the given id not found')
   res.send(course);
});

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
 

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(`The ${course.name} course added to the database`);
})

app.put('/api/courses/:id', (req, res) => {
    //look up the course
    //if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id not found');

    
    const {error} = validateCourse(req.body); // result.error
    
    if(error){
        // bad request 400
        res.status(400).send(error.details[0].message);
        return; // we don't want the rest of the function to be executed
    };
    //update course
    course.name = req.body.name; 
    //return the updated course
    res.send(course);
    
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id not found');
        

    const index = courses.indexOf(course);
    courses.splice(index, 1)// remove 1 object from the given index
    res.send(course);
});

const validateCourse = (course) => {
    if(!course) res.status(404).send('course not found');
    //validate
    //if invalid, return 400 - Bad request
    const schema = {
        name: joi.string().min(3).required()
    }; 
    return joi.validate(course, schema);
}

app.listen(port, () => console.log(`server running on the port ${port}`));