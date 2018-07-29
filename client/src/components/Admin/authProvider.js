import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const email = username;
    const request = new Request("/api/token", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({ "Content-Type": "application/json" })
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          console.log(response.json);
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(({ token }) => {
        localStorage.setItem("token", token);
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("token");
    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const status = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  }

  if (type === AUTH_CHECK) {
      return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  }
  return Promise.reject('Unkown method');
};
