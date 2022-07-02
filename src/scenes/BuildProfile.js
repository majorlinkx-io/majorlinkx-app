import React, {useState} from "react"
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap"
import { useHistory } from "react-router-dom"
// import bcrypt from "bcryptjs"
// import jwt_decode from "jwt-decode"
function BuildProfile() {

const [updateUser, setUpdateUser] = useState(null)
const [userName,setUserName] = useState()

const history = useHistory()

const [error, setError] = useState()



function createUserProfile(UserProfile , e) {
  e.preventDefault()
  if(!localStorage.getItem("token")){
    return setError("User Not Authenticated")
  }
  const {role ,description , genre, instagram, soundcloud, applemusic, spotify , twitter, userPhoto} = UserProfile
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/createprofile/${userName.stageName}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile:{
          role: role,
          description: description,
          genre: genre,
          instagram: instagram,
          soundcloud: soundcloud,
          spotify: spotify,
          applemusic: applemusic,
          twitter: twitter,
          userPhoto: userPhoto
        } }),
    },[])
    .then((res) => res.json())
    .then((data) =>{
      if(data.success){
        setError(null)
        return history.push(`/userprofile/${userName.stageName}`)
      }
      return setError(data.message)
    })
    .catch((err) => console.log(err))
  }
  
  
  return (
    <div className ='build-box'>
    <Form className='major-build'>
      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>Stage Name</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
            <InputGroup.Text id=''>@</InputGroup.Text>
            </InputGroup.Prepend>
          <Form.Control placeholder="enter user name"
          onChange={(e) => setUserName({...userName, stageName: e.target.value })} />
          </InputGroup>
          <Form.Text>{!error ? <p></p> : error}</Form.Text>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>Image Link</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
            <InputGroup.Text id=''>Img</InputGroup.Text>
            </InputGroup.Prepend>
          <Form.Control placeholder="enter here"
          onChange={(e) => setUpdateUser({...updateUser, userPhoto: e.target.value })} />
          </InputGroup>
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="">
        <Form.Label>
          <strong>Industry Role</strong>
        </Form.Label>
        <Form.Control
         as="select" defaultValue="Artist" className='industry-role'
         onChange={(e) => setUpdateUser({ ...updateUser, role: e.target.value })}> 
          <option value="Artist">Artist</option>
          <option value="Producer">Producer</option>
          <option value="Engineer">Engineer</option>
          <option value="Musician">Musician</option>
          <option value="Song Writer">Song Writer</option>
          <option value="Manager">Manager</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="">
        
        <Form.Label>
          <strong>Genre</strong>
        </Form.Label>
        <Form.Control
         as="select" defaultValue="Hip-Hop" className='industry-role'
         onChange={(e) => setUpdateUser({ ...updateUser, genre: e.target.value })}> 
          <option value="Hip-Hop">Hip-Hop</option>
          <option value="Soul">Soul</option>
          <option value="Funk">Funk</option>
          <option value="Rock">Rock</option>
          <option value="Latin">Latin</option>
          <option value="Reggea">Reggea</option>
        </Form.Control>
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>Instagram</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
            <InputGroup.Text id=''>@</InputGroup.Text>
            </InputGroup.Prepend>
          <Form.Control 
          placeholder='Enter your Instagram username'
          onChange={(e) => setUpdateUser({...updateUser, instagram: e.target.value })} />
          </InputGroup>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>SoundCloud</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
            <InputGroup.Text id=''>@</InputGroup.Text>
            </InputGroup.Prepend>
          <Form.Control 
          placeholder='Enter your Soundcloud username'
          onChange={(e) => setUpdateUser({...updateUser, soundcloud: e.target.value })} />
          </InputGroup>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>Twitter</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
            <InputGroup.Text id=''>@</InputGroup.Text>
            </InputGroup.Prepend>
          <Form.Control 
          placeholder='Enter your Twitter handle'
          onChange={(e) => setUpdateUser({...updateUser, twitter: e.target.value })} />
          </InputGroup>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>Spotify</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
            <InputGroup.Text id=''>https://</InputGroup.Text>
            </InputGroup.Prepend>
          <Form.Control 
          placeholder='Add your artist link'
          onChange={(e) => setUpdateUser({...updateUser, spotify: e.target.value })} />
          </InputGroup>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>Apple Music</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
            <InputGroup.Text id=''>https://</InputGroup.Text>
            </InputGroup.Prepend>
          <Form.Control 
          placeholder='Add your artist link'
          onChange={(e) => setUpdateUser({...updateUser, applemusic: e.target.value })} />
          </InputGroup>
        </Form.Group>
      </Form.Row>

      <Form.Group className="mb-3" controlId="">
          <Form.Label>
            <strong>Description</strong>
          </Form.Label>
          <Form.Control 
          placeholder='Tell us about yourself '
          as="textarea" rows={3} onChange={(e) => setUpdateUser({ ...updateUser, description: e.target.value })}/>
        </Form.Group>

      <Button className="btn-build" type="submit" onClick={(e) =>{createUserProfile(updateUser, e)}}>
        Create Profile
      </Button>
    </Form>
    </div>
  )
}
export default BuildProfile



