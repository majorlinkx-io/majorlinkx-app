import React, { useEffect, useState } from "react"
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import bcrypt from 'bcryptjs'
import { useHistory } from "react-router-dom"
import jwt_decode from "jwt-decode"
function Signup() {
  const [newUser, setNewUser] = useState() // useState

  const [error, setError] = useState()
  
  const history = useHistory()

  function createNewUser(User) {
    const { firstName, lastName, email, password, birthday, stageName } = User
    const hash = bcrypt.hashSync(password, "$2b$08$OPsu8D.AW1uzL984zxDLru");
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
        birthday: birthday,
        stageName: stageName,
      }),
    })
      .then((res) => res.json())
      .then(data => {
        if(data.success){
          setError(null)
          localStorage.setItem("token", data.data)
          const userDecode = jwt_decode(data.data)
          const stageName = userDecode.stageName 
          history.push(`/userprofile/${stageName}`)
        } 
        setError(data.message)
         return
      })

      .catch((err) => console.log(err))
  }
  console.log({newUser})
  return (
    <div className ="signup-box">    
        {/* userName */}
      <Form className='major-signup'>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Username</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            onChange={(e) => setNewUser({ ...newUser, stageName: e.target.value })}
            type="text"
            placeholder="Enter Your Stage Name "
          />
        </InputGroup>
      </Form.Group>

      <Row className="mb-3">
        {/* firstName */}
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            type="text"
            className='major-Name'
            placeholder="Enter First Name"
          />
        </Form.Group>
        {/* lastName */}
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
            type="text"
            className='major-Name'
            placeholder="Enter Last Name"
          />
        </Form.Group>
      </Row>
          {/*Email */}
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>
       {/*Password */}
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      {/* Birthday */}
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          onChange={(e) => setNewUser({ ...newUser, birthday: e.target.value })}
          type="date"
          placeholder="Enter Your Birthday"
        />
      </Form.Group>
      
      <Link
        className="btn btn-signup"
        // to="/buildprofile"
        variant="outline-success"
        onClick={() => createNewUser(newUser)}
      >
        Next
      </Link>
    </Form>
    </div>

  )
}
export default Signup
