import React from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import * as ReactBootStrap from "react-bootstrap";

const Homepage = () => (
  <div>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
        crossorigin="anonymous"
      />

      <link rel="stylesheet" href="/css/style.css" />
      <title>ResumeApp</title>
    </head>
    <body>
      <header class="showcase">
        <ReactBootStrap.Navbar bg="light" expand="lg">
          <ReactBootStrap.Nav className="mr-auto"></ReactBootStrap.Nav>
          <ReactBootStrap.Navbar.Brand
            className="text-primary font-weight-bold font-italic"
            href="/"
          >
            ResumeApp
          </ReactBootStrap.Navbar.Brand>
        </ReactBootStrap.Navbar>

        {/*<h2>
          <a href="/">ResumeApp</a>
        </h2>*/}
        <br />
        <ReactBootStrap.Navbar
          collapseOnSelect
          expand="sm"
          bg="dark"
          variant="dark"
        >
          <ReactBootStrap.Navbar.Brand href="/emplogin">
            Employer
          </ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Nav className="mr-auto">
            <ReactBootStrap.Nav.Link href="#home"></ReactBootStrap.Nav.Link>
            <ReactBootStrap.Navbar.Brand href="/register">
              Employee
            </ReactBootStrap.Navbar.Brand>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar>

        {/*<nav>
          <ul>
            <li>
              <Link to="/emplogin">Employer</Link>
            </li>
            <li>
              <Link to="/register">Employee</Link>
            </li>
          </ul>
        </nav>*/}
        {/*<Link to="/emplogin">Employer</Link> <br></br>
        <Link to="/register">Employee</Link>*/}
      </header>
    </body>
  </div>
);

export default Homepage;
