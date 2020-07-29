import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";

class Emplogin extends Component {
  constructor() {
    super();
    let loggedIn = false;

    const token = localStorage.getItem("token");
    if (token) loggedIn = true;

    this.state = {
      email: "",
      password: "",
      loggedIn,
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async formSubmit(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    try {
      const token = await Axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      if (token) {
        localStorage.setItem("token", token);
        this.setState({
          loggedIn: true,
        });
        toast.success("Login Successful!");
      }
    } catch (err) {
      this.setState({
        error: err.message,
      });
      toast.error("Email or Password is incorrect!");
    }
  }

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
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
                  href="/register"
                >
                  Employee
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
                <Link to="/register">Employee</Link>
              </li>
            </ul>
          </nav>*/}

          <div className="container">
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={this.formSubmit}>
                  <h1 className="h3 mb-3 font-weight-large text-primary">
                    Please sign in
                  </h1>
                  <div className="form-group">
                    <label className="text-primary" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-primary" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Sign in
                  </button>
                  {this.state.error}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Emplogin;
