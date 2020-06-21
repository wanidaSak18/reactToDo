import React, { Component } from "react";
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
// import Modal from 'reactjs-modal-dialog'
import { Input, Label, TextArea } from 'react-input-component';
import '../css/login.css';
import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import Moment from 'react-moment';
import * as API from '../functions/API';


const todo = [
    {
        title: "",
        description: "",
        createdAt: null,
        modifyDate: null
    }
];

const todos = [];

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todolist: todo,
            todolists: todos,
            isDialogOpen: false,
            isDialogEdit: false,
            isDialogDelete: false
        };
    }

    openDialogCreate = () => this.setState({ isDialogOpen: true });
    openDialogUpdate = () => this.setState({ isDialogEdit: true });
    openDialogDelete = () => this.setState({ isDialogDelete: true });

    handleClose = () => this.setState({
        todolist: [todo],
        isDialogOpen: false,
        isDialogEdit: false,
        isDialogDelete: false
    });

    componentDidMount() {
        this.getToDo();
    }

    /* API */
    getToDo = async () => {
        let todoLists = await API.connect("get", "/todos");
        debugger;
        if (todoLists) {
            this.setState({ todolists: [...todoLists] });
        }
        console.log("TODO: ", todoLists);
        return true;
    };

    addNewToDo = async () => {
        console.log("Add To Do List: ", this.state.todolist)
        const data = this.state.todolist[0]
        //API Send to create To do
        await API.connect(
            "post",
            "/todos",
            data
        );
        await this.getToDo();
        this.setState({
            todolist: [...todo],
            todolists: [data],
            isDialogOpen: false
        })
    };

    updateToDo = async () => {
        console.log("Edit To Do List: ", this.state.todolists)
        const data = this.state.todolists[0]
        //API Send to update To do
        await API.connect(
            "post",
            "/todos",
            data
        );
        await this.getToDo();
        this.setState({
            todolist: [...todo],
            todolists: [data],
            isDialogEdit: false
        })
    };

    deleteToDo = async () => {
        console.log("Delete To Do List: ", this.state.todolists)
        const data = this.state.todolists[0]
        //API Send to create To do
        this.setState({
            todolist: [...todo],
            todolists: [],
            isDialogDelete: false
        })
    };

    onChangeTodoTitle = async (event) => {
        const todoData = {
            title: event.target.value,
            description: this.state.todolist[0].description,
            createdAt: new Date().toLocaleDateString(),
            modifyDate: new Date().toLocaleDateString()
        };
        this.setState({ todolist: [todoData] });
    };

    onChangeTodoDescription = async (event) => {
        const todoData = {
            title: this.state.todolist[0].title,
            description: event.target.value,
            createdAt: new Date().toLocaleDateString(),
            modifyDate: new Date().toLocaleDateString()
        };
        this.setState({ todolist: [todoData] });
    };

    onChangeUpdateTodoTitle = async (event) => {
        const todoData = {
            title: event.target.value,
            description: this.state.todolists[0].description,
            createdAt: this.state.todolists[0].createdAt,
            modifyDate: new Date().toLocaleDateString()
        };
        this.setState({ todolists: [todoData] });
    };

    onChangeUpdateTodoDescription = async (event) => {
        const todoData = {
            title: this.state.todolists[0].title,
            description: event.target.value,
            createdAt: this.state.todolists[0].createdAt,
            modifyDate: new Date().toLocaleDateString()
        };
        this.setState({ todolists: [todoData] });
    };

    render() {
        console.log("List: ", this.state.todolists.length)
        const todolistData = this.state.todolists;
        console.log("TODO LIST: ", todolistData)
        const listTodo = todolistData.map((item, inex) => {
            console.log("TODO Data: ", item)
            return <label>{item}</label>
        })
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    {/* <h1 className="headerForm">TO DO</h1> */}
                    {/* <h1>
                        TO DO
                    </h1> */}
                </section>
                <section className="content">
                    <div className="container">
                        <br />
                        <button type="button" className="btn btn-block btn-success" onClick={this.openDialogCreate}>Create ToDo</button>
                        <Modal isOpen={this.state.isDialogOpen}>
                            <div className="box-header with-border">
                                <h3 className="box-title">To Do</h3>
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <textarea value={this.state.todolist[0].title}
                                    onChange={this.onChangeTodoTitle}
                                    className="form-control" rows="3" placeholder="Enter ..."></textarea>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea onChange={this.onChangeTodoDescription}
                                    value={this.state.todolist[0].description} className="form-control" rows="3" placeholder="Enter ..."></textarea>
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-default" onClick={this.handleClose}>Cancel</button>
                                <button type="submit" className="btn btn-info pull-right" onClick={this.addNewToDo}>Create</button>
                            </div>
                        </Modal>
                        <br />
                        {/* {this.state.todolists.length > 0 ?
                            todos.map((item) => {
                                <Card style={{ fontSize: "initial", width: "100%" }}>
                                    <CardHeader style={{ color: "blue" }}>{item.title}</CardHeader>
                                    <CardBody>
                                        <div className="comment-text" style={{ color: "gray" }}>
                                            <div className="col-md-4" style={{ float: "right" }}>
                                                <Moment format="DD-MM-YYYY">{item.createdAt}</Moment>
                                            </div>
                                            <div className="col-md-8">
                                                {item.description}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <button type="submit" className="btn btn-primary" onClick={this.openDialogUpdate}>Update</button>
                                            <button type="submit" className="btn btn-danger" onClick={this.openDialogDelete}>Delete</button>
                                        </div>
                                    </CardBody>
                                </Card>
                            })
                            : ""} */}
                        {/* {todolistData.map((item, index) => {
                            return
                            <Card style={{ fontSize: "initial", width: "100%" }}>
                                <CardHeader style={{ color: "blue" }}>{item[index].title}</CardHeader>
                                <CardBody>
                                    <div className="comment-text" style={{ color: "gray" }}>
                                        <div className="col-md-4" style={{ float: "right" }}>
                                            <Moment format="DD-MM-YYYY">{item[index].createdAt}</Moment>
                                        </div>
                                        <div className="col-md-8">
                                            {item[index].description}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <button type="submit" className="btn btn-primary" onClick={this.openDialogUpdate}>Update</button>
                                        <button type="submit" className="btn btn-danger" onClick={this.openDialogDelete}>Delete</button>
                                    </div>
                                </CardBody>
                            </Card>
                        })} */}
                        {this.state.todolists.length > 0 ?
                            <div>
                                <Card style={{ fontSize: "initial", width: "100%" }}>
                                    <CardHeader style={{ color: "blue" }}>{this.state.todolists[0].title}</CardHeader>
                                    <CardBody>
                                        <div className="comment-text" style={{ color: "gray" }}>
                                            <div className="col-md-4" style={{ float: "right" }}>
                                                <Moment format="DD-MM-YYYY">{this.state.todolists[0].createdAt}</Moment>
                                            </div>
                                            <div className="col-md-8">
                                                {this.state.todolists[0].description}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <button type="submit" className="btn btn-primary" onClick={this.openDialogUpdate}>Update</button>
                                            <button type="submit" className="btn btn-danger" onClick={this.openDialogDelete}>Delete</button>
                                        </div>
                                    </CardBody>
                                </Card>
                                <br />
                                <Card style={{ fontSize: "initial", width: "100%" }}>
                                    <CardHeader style={{ color: "blue" }}>{this.state.todolists[1].title}</CardHeader>
                                    <CardBody>
                                        <div className="comment-text" style={{ color: "gray" }}>
                                            <div className="col-md-4" style={{ float: "right" }}>
                                                <Moment format="DD-MM-YYYY">{this.state.todolists[1].createdAt}</Moment>
                                            </div>
                                            <div className="col-md-8">
                                                {this.state.todolists[1].description}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <button type="submit" className="btn btn-primary" onClick={this.openDialogUpdate}>Update</button>
                                            <button type="submit" className="btn btn-danger" onClick={this.openDialogDelete}>Delete</button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                            : ""}
                        {/* Edit ToDo */}
                        {this.state.todolists.length > 0 ?
                            <Modal isOpen={this.state.isDialogEdit}>
                                <div className="box-header with-border">
                                    <h3 className="box-title">To Do</h3>
                                </div>
                                <div className="form-group">
                                    <label>Title</label>
                                    <textarea value={this.state.todolists[0].title}
                                        onChange={this.onChangeUpdateTodoTitle.bind(this)}
                                        className="form-control"
                                        rows="3"
                                        placeholder="Enter ..."></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea onChange={this.onChangeUpdateTodoDescription.bind(this)}
                                        value={this.state.todolists[0].description}
                                        className="form-control"
                                        rows="3"
                                        placeholder="Enter ..."></textarea>
                                </div>
                                <div className="box-footer">
                                    <button type="submit" className="btn btn-default" onClick={this.handleClose}>Cancel</button>
                                    <button type="submit" className="btn btn-info pull-right" onClick={this.updateToDo}>Update</button>
                                </div>
                            </Modal>
                            : ""}
                        {this.state.todolists.length > 0 ?
                            <Modal isOpen={this.state.isDialogDelete}>
                                <div className="box-header with-border">
                                    <h3 className="box-title">To Do Delete</h3>
                                </div>
                                <div className="form-group">
                                    Want to Delete <label>{this.state.todolists[0].title}</label>?
                            </div>
                                <div className="box-footer">
                                    <button type="submit" className="btn btn-default" onClick={this.handleClose}>Cancel</button>
                                    <button type="submit" className="btn btn-info pull-right" onClick={this.deleteToDo}>Confirm</button>
                                </div>
                            </Modal> : ""}
                    </div>
                </section>
            </div>
        );
    }
}
export default ToDo;