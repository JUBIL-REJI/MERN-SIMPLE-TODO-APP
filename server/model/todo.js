const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  task:String,
  dueDate:Date
 
})


const TodoModel = mongoose.model("todos",TodoSchema);

module.exports = TodoModel;