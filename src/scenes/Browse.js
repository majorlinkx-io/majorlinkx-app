import React, { useState, useEffect } from "react"
import { CardDeck, Card, Button } from "react-bootstrap"
import Image from "react-bootstrap/Image"
import Col from "react-bootstrap/Col"
import Media from "react-bootstrap/Media"
import CardColumns from "react-bootstrap/CardColumns"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { Link } from "react-router-dom"
import whiteLinkx from "../img/major-white.jpeg"

function UserCards({ oneProfile ,index }) {
  return (
    <Col>
      <Card className="explore-cards">
      <Card.Img  className="card-img img-fluid"  variant="top" src={!oneProfile.profile ? (whiteLinkx) : !oneProfile.profile.userPhoto ? (whiteLinkx) : oneProfile.profile.userPhoto} width={250} height={250}/>  
        <Card.Body>
          <Card.Title>
            <strong>@</strong>
            {oneProfile.stageName}
          </Card.Title>
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
        <Link
          className="btn btn-custom-explore"
          to={`/userprofile/${oneProfile.stageName}`}
          variant="outline-success"
          onClick={() => {
            console.log(oneProfile.stageName)
          }}
        >
          See More
        </Link>
      </Card>
    </Col>
  )
}

function Browse() {
  const [allProfiles, setAllProfiles] = useState()
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/allusers`)
      .then((response) => response.json())
      .then((data) => setAllProfiles(data))
      .catch((err) => console.log(err))
  }, [])
  
  return (
    <>
      <Row className="explore">
      <h2 className="explore-heading"> Explore </h2>
      <div className="killer-bg"></div>
        {!allProfiles ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading....</span>
          </Spinner>
        ) : (
          allProfiles.map((oneProfile , index) => {
            return <UserCards oneProfile={oneProfile} key={oneProfile._id} index={index} />
          })
        )}
        
      </Row>
      
    </>
  )
}
export default Browse
