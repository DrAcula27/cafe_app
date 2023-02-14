import axios from "axios";

export const signUp = async (formData) => {
  let serverResponse = await axios({
    method: "POST",
    url: "api/users/signup", // signup route
    data: formData,
  });

  return serverResponse;
};
