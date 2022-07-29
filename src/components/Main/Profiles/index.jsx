import React, { useState, useEffect } from "react"
import { CardDeck, Card, Button } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"
import whiteLinkx from "../../../img/major-white.jpeg"

function Profiles() {
  const [topProfiles, setTopProfiles] = useState()
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/allusers`)
      .then((response) => response.json())
      .then((data) => setTopProfiles(data))
      .catch((err) => console.log(err))
  }, [])
  
  return (
    <>
      <Row className="home-row">
        {!topProfiles ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading....</span>
          </Spinner>
        ) : (
          topProfiles.slice(topProfiles.length - 4, topProfiles.length).map((oneProfile ,index ) => {
            return (
              <Col>
                <Card>
                <Card.Img  className="card-img img-fluid"  variant="top" src={!oneProfile.profile ? (whiteLinkx) : !oneProfile.profile.userPhoto ? (whiteLinkx) : oneProfile.profile.userPhoto} width={250} height={250}/>  
                <Card.Body>
                <Card.Title><strong>@</strong>{!oneProfile ? (<p>Loading...</p>) : (oneProfile.stageName) }</Card.Title>
                <Card.Text>
                   {
                    !oneProfile
                      ? <p></p>
                      : !oneProfile.profile
                      ? <p>Build Profile</p>
                      : !oneProfile.profile.role
                      ?<p>Add Role</p>
                      : <p>{oneProfile.profile.role}</p>
                  }
                  </Card.Text>
                </Card.Body>
                <Link className="btn btn-custom" to={`/userprofile/${oneProfile.stageName}`} variant="outline-success" onClick={() => {console.log(oneProfile.stageName)}}>See More</Link>
                </Card>
              </Col>
            )
          })
        )}
      </Row>
    </>
  )
}

export default Profiles
