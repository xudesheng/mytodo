import React from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import {v4 as uuidv4 } from "uuid";
import axios from "axios";

// class TodoContainer extends React.Component {

//     handleChange = (id)=>{
//         this.setState({
//             todos: this.state.todos.map(
//                 todo => {
//                     if(todo.id === id){
//                         todo.completed = !todo.completed;
//                     }
//                     return todo;
//                 }
//             ),
//             show: !this.state.show,
//         })
//     };

//     delTodo = (id) => {
//         // this.setState({
//         //     todos: [
//         //         ...this.state.todos.filter(todo => {
//         //         return todo.id !== id;
//         //     })]
//         // });
//         axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
//         .then(response=>this.setState({
//             todos: [...this.state.todos.filter(todo=>{
//                 return todo.id !== id;
//             })]
//         }));
//     };

//     addTodoItem = (title)=>{
//         // const newTodo = {
//         //     id: uuidv4(),
//         //     title: title,
//         //     completed: false
//         // };
//         // this.setState({
//         //     todos:[...this.state.todos,newTodo]
//         // });
//         axios.post("https://jsonplaceholder.typicode.com/todos",{
//             title: title,
//             completed: false,
//         })
//         .then(response => this.setState({
//             todos:[...this.state.todos,response.data],
//         }));
//     };

//     state = {
//         todos: [
//             // {
//             //     id: uuidv4(),
//             //     title: "Setup development environment",
//             //     completed: true
//             // },{
//             //     id: uuidv4(),
//             //     title: "Develop website and add content",
//             //     completed: false
//             // },{
//             //     id: uuidv4(),
//             //     title: "Deploy to live server",
//             //     completed: false
//             // }
//         ],
//         show: false
//     };

//     componentDidMount() {
//         axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
//             .then(response => this.setState({todos:response.data}));
//     }

//     render() {
//         return (
//             <div className="container">
//                 <Header headerSpan={this.state.show}/>
//                 <InputTodo addTodoProps={this.addTodoItem}/>
//                 <TodosList 
//                     todos = {this.state.todos }
//                     handleChangeProps = {this.handleChange}
//                     delTodoProps = {this.delTodo}
//                 ></TodosList>
//             </div>
//         )
//     }
// }

import {useState, useEffect} from "react";

const TodoContainer=(props)=>{
    const [todos, setTodos] = useState([]);
    const [show, setShow] = useState(false);

    const handleChange = (id)=>{
        setTodos(
            todos.map(todo=>{
                if(todo.id===id){
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        );
        setShow(!show);
    }

    const delTodo = (id)=>{
        setTodos([
            ...todos.filter(todo=>{
                return todo.id !== id;
            }),
        ]);
    };

    const addTodoItem = (title)=>{
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    useEffect(()=>{
        console.log("test run");
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
            .then(response=>setTodos(response.data));
    },[]);

    return (
        <div className="container">
            <Header headerSpan={show}/>
            <InputTodo addTodoProps={addTodoItem}/>
            <TodosList todos={todos} handleChangeProps={handleChange} deleteTodoProps={delTodo} />
        </div>
    )
}

export default TodoContainer
