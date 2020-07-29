import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import download from "js-file-download";
import axios from "axios";
import { toast } from "react-toastify";
import * as ReactBootStrap from "react-bootstrap";

export default class Allusers extends React.Component {
  constructor() {
    super();
    let loggedIn = false;

    const token = localStorage.getItem("token");
    if (token) loggedIn = true;
    this.logout = this.logout.bind(this);
    this.state = {
      people: [],
      position: [],
      loggedIn,
      search: "",
      post: "",
      selectedPos: [],
    };
  }

  async componentDidMount() {
    const url = `http://localhost:5000/dashboard/getuser`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({ people: data.gigs });
  }

  async getpositions() {
    const url = `http://localhost:5000/auth/getpos`;
    const respnse = await fetch(url);
    const data = await respnse.json();
    console.log(data);
    this.setState({ selectedPos: data.pos });
  }

  deleteUser(id) {
    if (window.confirm("Are Your Sure?")) {
      fetch(`http://localhost:5000/dashboard/deluser/${id}`, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      var newUsers = this.state.people.filter((person) => {
        return person.id != id;
      });
      this.setState({ people: newUsers });
    }
  }
  async handleDownload(id) {
    /*axios({
      url: "http://localhost:5000/dashboard/getdoc/${id}",
      method: "GET",
      responseType: "blob", 
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      link.click();
      window.URL.revokeObjectURL(url);
    });*/

    const res = await fetch(`http://localhost:5000/dashboard/getdoc/${id}`);
    const blob = await res.blob();
    console.log(blob);
    download(blob, "test.pdf");
  }

  logout() {
    this.setState({
      loggedIn: false,
    });
    toast.success("Logged Out Successfully!");
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/logout" />;
    }

    let filteredPeople = this.state.people.filter((person) => {
      return (
        person.position
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    //const peopleJSX = [];

    //this.state.people.forEach((person) => {
    //peopleJSX.push(
    //<div key={person.id}>
    //<div>{person.firstname}</div>
    //<div>{person.lasttname}</div>
    //</div>
    //);
    //});

    return (
      <Fragment>
        {" "}
        <br></br>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
            crossorigin="anonymous"
          />

          <link rel="stylesheet" href="/css/style.css" />
        </head>
        <div class="p-3 mb-2 bg-light text-dark">
          <ReactBootStrap.Navbar
            collapseOnSelect
            expand="lg"
            bg="primary"
            variant="dark"
          >
            <ReactBootStrap.Navbar.Brand href="#home">
              Employee List
            </ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
              <ReactBootStrap.Nav className="mr-auto"></ReactBootStrap.Nav>
              <ReactBootStrap.Nav>
                <ReactBootStrap.Form inline>
                  <ReactBootStrap.Button
                    className="text-light"
                    variant="outline-success"
                    onClick={this.logout}
                  >
                    Logout
                  </ReactBootStrap.Button>
                </ReactBootStrap.Form>
              </ReactBootStrap.Nav>
            </ReactBootStrap.Navbar.Collapse>
          </ReactBootStrap.Navbar>

          <input
            type="text"
            name="firstname"
            label="Search"
            placeholder="Search"
            icon="fas fa-search"
            className="form-control my-3"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
          {/*<label>
          Filter Through Positions
          <select
            value={this.state.post}
            onChange={(e) => this.setState({ position: e.target.value })}
          >
            {this.state.selectedPos.map((h) => (
              <option key={h.roles} value={h.roles}>
                {h.roles}
              </option>
            ))}
          </select>
            </label>*/}
          <table class="table mt-5 text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Position</th>
                <th>Delete</th>
                {/*<th>Download</th>*/}
              </tr>
            </thead>
            <tbody>
              {filteredPeople.map((person) => (
                <tr key={person.id}>
                  <td>{person.id}</td>
                  <td>{person.firstname}</td>
                  <td>{person.lastname}</td>
                  <td>{person.email}</td>
                  <td>{person.position}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteUser(person.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {/*<button
                      className="btn btn-secondary"
                      onClick={() => this.handleDownload(person.files)}
                    >
                      Download File
                    </button>*/}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*<button className="btn btn-primary" onClick={this.logout}>
            Logout
              </button>*/}
        </div>
      </Fragment>
    );
  }
}
