const baseUrl = "http://localhost:3000";
const signinUrl = baseUrl + "/signin";
const signupUrl = baseUrl + "/signup";

export function signin(username, password) {
  return fetch(signinUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  }).then(resp => resp.json());
}

export function signup(username, password) {
  return fetch(signupUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  }).then(resp => resp.json());
}

export default { signin, signup };
