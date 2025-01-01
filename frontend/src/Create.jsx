import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../src/style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import TodoContext from "./context/Createcontect";

const Create = () => {
  const { todos, setTodos } = useContext(TodoContext); // Context for todos
  const [show, setShow] = useState(false); // Modal state
  const [task, setTask] = useState(""); // Task input state
  

  // Modal control functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ADD TODO
  const handleAdd = () => {
    if (!task.trim()) {
      alert("Task cannot be empty");
      return;
    }

    axios
      .post("http://localhost:3001/add", { task: task })
      .then((result) => {
        setTodos((prev) => [...prev, result.data]); // Update local state
        setTask("");
        setShow(false);
        window.location.reload();
      })

      .catch((err) => console.error("Error adding todo:", err));
  };

  // DELETE TODO
  const handleDelete = (id) => {
    if (!id) {
      console.error("Todo ID is undefined");
      return;
    }

    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        // Update state after successful deletion
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  // FETCH TODO
  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, [setTodos]);

  //to check the todo is done

  const handleCheck = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, isDone: !todo.isDone } : todo

      )
    );
  };
  
 console.log(todos)
  return (
    <section className="main container ">
      <Form className="formgroup">
        <Form.Group className="mb-3 " controlId="formBasicTask">
          <Form.Label className="title">Add Your Task</Form.Label>
          <Form.Control
            className="inputbar"
            type="text"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </Form.Group>
        <Button className="btn-submit" onClick={handleShow}>
          Submit
        </Button>
      </Form>

      {/* TODOS Display */}
      {todos.length > 0 && (
        <div className="card-container row ">
          {todos.map((todo) => (
            <Card
              key={todo._id}
              style={{ width: "15rem", height:'220px', margin: "1rem" }}
              className="col-3 cards"
            >
              <Card.Body>
                <Card.Title className="task-title">To do</Card.Title>
                <Card.Text className="task">{todo.task}</Card.Text>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={() => handleCheck(todo._id)}
                  />
                  <label className="form-check-label text-label">Done</label>
                </div>
                {todo.isDone ? (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(todo._id)}
                  >
                    DELETE
                  </Button>
                ) : (
                  <></>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Create;
