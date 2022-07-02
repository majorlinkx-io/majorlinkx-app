import React, { useEffect, useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import bcrypt from "bcryptjs"
import jwt_decode from "jwt-decode"
import { UserContext } from "../App"

function Login() {
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const { globalUser, setGlobalUser } = useContext(UserContext)
  const history = useHistory()

  function getData() {
    const { email, password } = user
    const hash = bcrypt.hashSync(password, "$2b$08$OPsu8D.AW1uzL984zxDLru")
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: hash,
        }),
      },
      []
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setError(data.message)
          console.log(data.message)
          return
        }
        setError(null)
        localStorage.setItem("token", data.token)
        setGlobalUser(data.token)
        const userDecode = jwt_decode(data.token)
        const stageName = userDecode.stageName
        history.push(`/userprofile/${stageName}`)
      })
      .catch((err) => setError(err))
  }
  return (
    <div className="login-box">
      <Form
        className="login-form custom-form"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            className="login"
            placeholder="Enter email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className="login"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <Form.Text>{!error ? <p></p> : error}</Form.Text>
        </Form.Group>

        <Button
          className="login-submit"
          type="submit"
          onClick={(e) => {
            getData()
            e.preventDefault()
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}
export default Login
