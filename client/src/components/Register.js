import React, { Component, Fragment } from "react";
/*import { register } from "./UserFunctions";
import FileUpload from "./FileUpload";*/
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      position: "",
      files: "",
      file: "",
      filename: "Choose File",
      selectedPos: [],
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  fileSelectHandler = (event) => {
    this.setState({
      file: event.target.files[0],
      filename: event.target.files[0].name,
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    /*const { firstname, lastname, email, position, files } = this.state;

    const body = { firstname, lastname, email, position, files };
    const fd = new FormData();
    fd.append("files", this.state.file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const demo = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return axios
      .post("http://localhost:5000/upload", fd, config, demo, {
        body: JSON.stringify(body),
      })
      .then((response) => {
        console.log("Gig Registered");
      });*/

    /*const {
      firstname,
      lastname,
      email,
      password,
      position,
      files,
    } = this.state;
    const body = { firstname, lastname, email, password, position, files };

    const fd = new FormData();
    fd.append("files", this.state.file);
    return axios.post("http://localhost:5000/upload", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });*/
    /*register(newGig).then((res) => {
      this.props.history.push(`/`);
    });*/

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const fd = new FormData();
    fd.append("files", this.state.file);
    fd.append("firstname", this.state.firstname);
    fd.append("lastname", this.state.lastname);
    fd.append("email", this.state.email);
    fd.append("position", this.state.position);

    axios
      .post("http://localhost:5000/auth/register", fd, config)
      .then((response) => {
        console.log("Gig Registered");
        toast.success("Registration Successful!");
        this.props.history.push(`/`);
      });
  }

  async componentDidMount() {
    const url = `http://localhost:5000/auth/getpos`;
    const respnse = await fetch(url);
    const data = await respnse.json();
    console.log(data);
    this.setState({ selectedPos: data.pos });
  }

  render() {
    return (
      <Fragment>
        <body>
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
              <ReactBootStrap.Navbar.Brand href="/">
                ResumeApp
              </ReactBootStrap.Navbar.Brand>
              <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto"></ReactBootStrap.Nav>
                <ReactBootStrap.Nav>
                  <ReactBootStrap.Nav.Link
                    className="text-light"
                    href="/emplogin"
                  >
                    Employer
                  </ReactBootStrap.Nav.Link>
                </ReactBootStrap.Nav>
              </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>

            {/*<h2>
              <a href="/">
                <i class="fas fa-code"></i>
                ResumeApp
              </a>
            </h2>
            <nav>
              <ul>
                <li>
                  <Link to="/emplogin">Employer</Link>
                </li>
              </ul>
            </nav>*/}

            <h1 className="text-center text-primary my-5">Register</h1>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                name="firstname"
                placeholder="Firstname"
                className="form-control my-3"
                value={this.state.firstname}
                onChange={this.onChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                className="form-control my-3"
                value={this.state.lastname}
                onChange={this.onChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control my-3"
                value={this.state.email}
                onChange={this.onChange}
              />
              <label className="text-primary" for="position">
                Choose a position:
              </label>
              <select
                className="form-control"
                value={this.state.position}
                onChange={(e) => this.setState({ position: e.target.value })}
              >
                <option>Select</option>
                {this.state.selectedPos.map((h) => (
                  <option key={h.roles} value={h.roles}>
                    {h.roles}
                  </option>
                ))}
              </select>
              <br></br>
              <label className="text-primary" for="position">
                Upload Your File:
              </label>
              <div className="custom-file mb-4">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  onChange={this.fileSelectHandler}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {this.state.filename}
                </label>
              </div>

              {/*<FileUpload />*/}
              <button
                className="btn btn-lg btn-primary btn-block"
                onClick={this.onSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </body>
      </Fragment>
    );
  }
}

export default Register;
