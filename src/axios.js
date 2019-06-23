import Axios from "axios";

/**
 * file to create axios instance
 */

const Instance = Axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

Instance.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

export default Instance;
