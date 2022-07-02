import React from "react"
import { CardDeck, Card } from "react-bootstrap"
import ourTeam from "./team.json"

function Team() {
  console.log(ourTeam.team)
  return (
    <>
      <h2 className="team-heading">Our Team</h2>
      <CardDeck>
        {ourTeam.team.map((team, index) => {
          return (
            <Card>
              <Card.Img variant="top" src="./img/holder.jpeg" />
              <Card.Body>
                <Card.Title>{team.name}</Card.Title>
                <Card.Text> {team.role} </Card.Text>
                <Card.Text> {team.desc} </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{team.active}</small>
              </Card.Footer>
            </Card>
          )
        })}
      </CardDeck>
    </>
  )
}
export default Team
