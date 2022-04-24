import express from 'express';

const app = express();
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
   if(!course) res.status(404).send('The course with the given id not found')
   res.send(course);
})


app.listen(port, () => console.log(`server running on the port ${port}`));