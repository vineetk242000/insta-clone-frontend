import axios from "axios";
import { base_url } from "./baseUri";

const request = async (uri, token) => {
  if (token) {
    //applying token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    //deleting the token from header
    delete axios.defaults.headers.common["Authorization"];
  }
  const config = {
    url: `${base_url + uri}`,
    method: "GET",
    timeout: "1000",
  };

  try {
    const response = await axios(config);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    const object = {
      status: null,
      data: null,
    };
    if (err.response !== undefined) {
      object.status = err.response.status;
      object.data = err.response.data.msg;
    } else {
      object.status = 500;
      object.data = "Something went wrong";
    }

    return object;
  }
};

export default request;
