/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(bodyParser.json());

// 200 OK with an array of todo items in JSON format.
app.get("/todos", (req, res) => {
  const filepath = path.join(__dirname, "./todos.json");
  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("file not found");
    }
    res.status(200).json({ todos: data });
  });
});

/**
   * 2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
   */

app.get("/todos/:id", (req, res) => {
  const filepath = path.join(__dirname, "./todos.json");
  fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      return res.status(404).send("file not found");
    }
    let todo;
    try {
      // Parse the existing JSON data
      const todosArray = JSON.parse(data);
      todo = todosArray.find((t) => t.id === parseInt(req.params.id));
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send("Something went wrong");
    }
    if (!todo) {
      res.status(404).send();
    } else {
      res.status(200).json(todo);
    }
  });
});

/**
   * 3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
   */

app.post("/todos", (req, res) => {
  const todo = {
    id: Math.floor(Math.random() * 100000),
    ...req.body,
  };
  const filepath = path.join(__dirname, "./todos.json");

  // Read existing data from the file
  fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Something went wrong");
    }

    let todosArray = [];
    try {
      // Parse the existing JSON data
      todosArray = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send("Something went wrong");
    }

    // Push the new todo into the existing array
    todosArray.push(todo);

    // Write the updated array back to the file
    fs.writeFile(filepath, JSON.stringify(todosArray), "utf-8", (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).send("Something went wrong");
      }

      res.status(201).send("Todo added successfully");
    });
  });
});

/**
   * 4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
   */

app.put("/todos/:id", (req, res) => {
  const filepath = path.join(__dirname, "./todos.json");

  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("file not found");
    }
    let todos = [];
    try {
      // Parse the existing JSON data
      todos = JSON.parse(data);
      
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send("Something went wrong");
    }
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send("todo not found");
    } else {
      todos[todoIndex].title = req.body.title;
      todos[todoIndex].completed = req.body.completed;
      
      fs.writeFile(filepath, JSON.stringify(todos),'utf-8',(writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          return res.status(500).send("Something went wrong");
        }
  
        res.status(200).json(todos[todoIndex]);
      });
    }
  });
});

/**
 *  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123
 */

app.delete('/todos/:id', (req, res)=>{
  const todoIndex = -1
  const filepath = path.join(__dirname, './todos.json');

  fs.readFile(filepath, 'utf8', (err, data)=>{
    if (err) {
      console.error(err);
      return res.status(500).send('Something went wrong');
    }
    
    let todos = [];
    try {
      // Parse the existing JSON data
      todos = JSON.parse(data);
      
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send("Something went wrong");
    }

    const todoIndex = todos.findIndex(t=>t.id === parseInt(req.params.id));
    if(todoIndex === -1){
      res.status(404).send('todo Not found');
    } else {
      // delete todo
      todos.splice(todoIndex, 1);
      fs.writeFile(filepath, JSON.stringify(todos), 'utf8', (err)=>{
        if (err) {
          console.error(err);
          return res.status(500).send("Something went wrong");
        }
  
        res.status(200).send();
      });
    }

  })
  
})

app.get("*", (req, res) => {
  res.status(404).send("Route not found");
});

// app.listen(3000, () => {
//   console.log(`Server is running at http://localhost:3000`);
// });
module.exports = app;
