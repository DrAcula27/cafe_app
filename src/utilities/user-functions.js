import axios from "axios";

export const signUp = async (formData) => {
  let serverResponse = await axios({
    method: "POST",
    url: "/users/signup", // signup route
    data: formData,
  });

  return serverResponse;
};

export const logIn = async (formData) => {
  let serverResponse = await axios({
    method: "PUT",
    url: "/users/login", // signup route
    data: formData,
  });

  return serverResponse;
};
