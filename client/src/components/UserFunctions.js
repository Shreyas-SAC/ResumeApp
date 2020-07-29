import axios from "axios";

export const register = (newGig) => {
  return axios
    .post("http://localhost:5000/auth/register", {
      firstname: newGig.firstname,
      lastname: newGig.lastname,
      email: newGig.email,
      position: newGig.position,
      files: newGig.files,
    })
    .then((response) => {
      console.log("Gig Registered");
    });
};

export const empregister = (newUser) => {
  return axios
    .post("http://localhost:5000/auth/empregister", {
      email: newUser.email,
      password: newUser.password,
      roles: newUser.roles,
    })
    .then((response) => {
      console.log("Registered");
    });
};

export const login = (user) => {
  return axios
    .post("http://localhost:5000/auth/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
