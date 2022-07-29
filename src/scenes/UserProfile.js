import React, { useState, useEffect, Link } from "react"
import { Jumbotron, Button } from "react-bootstrap"
import { useHistory, useParams } from "react-router-dom"
import {
  FaSpotify,
  FaInstagram,
  FaApple,
  FaSoundcloud,
  FaTwitter,
} from "react-icons/fa"
import majorBlack from '../img/major-black.jpeg'

function UserProfile() {
  const [user, setUser] = useState()
  const { stageName } = useParams()

  const history = useHistory()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/singleuser/${stageName}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="user-profile">
      <div className="user-heading">
        {!user ? <h2></h2> : <h2> @{user.stageName}</h2>}
      </div>
      <div className="box">
        <Jumbotron fluid>
          {!user || !user.profile || !user.profile.userPhoto ? <img src={majorBlack} width={250} height={250}/> : <img src={user.profile.userPhoto } width={250} height={250}/>}
          {!user ? <h2></h2> : <h2>{user.firstName}</h2>}
          <p>
            {!user ? (
              <span></span>
            ) : !user.profile ? (
              <p>Build Your Profile</p>
            ) : (
              <p>{user.profile.role}</p>
            )}
            <FaSpotify /> <FaInstagram /> <FaApple /> <FaSoundcloud />
          </p>
          <p>
            <Button
              className="btn btn-user"
              onClick={() => history.push(`/signup`)}
            >
              Join Us
            </Button>
          </p>
        </Jumbotron>
      </div>
      <div className="profile-description">
        <h2>Description</h2>
        <p>
          {!user ? (
            <h2></h2>
          ) : !user.profile ? (
            <p>Build Your Profile</p>
          ) : (
            user.profile.description
          )}
        </p>
      </div>
      <div className="box-footer">
        <h2>My Music</h2>
        {!user ? (
          <p></p>
        ) : !user.profile ? (
          <p>Add linkx to your profile</p>
        ) : (
          <p>Your linkx are ready !</p>
        )}

        <div className="profile-footer">
          {!user ? (
            <p></p>
          ) : !user.profile ? (
            <p></p>
          ) : !user.profile.spotify ? (
            <p></p>
          ) : (
            <a
              href={`https://${user.profile.spotify}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaSpotify size={60} />
            </a>
          )}

          {!user ? (
            <p></p>
          ) : !user.profile ? (
            <p></p>
          ) : !user.profile.twitter ? (
            <p></p>
          ) : (
            <a
              href={`https://www.twitter.com/${user.profile.twitter}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter size={60} />
            </a>
          )}

          {!user ? (
            <p></p>
          ) : !user.profile ? (
            <p></p>
          ) : !user.profile.instagram ? (
            <p></p>
          ) : (
            <a
              href={`https://www.instagram.com/${user.profile.instagram}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={60} />
            </a>
          )}

          {!user ? (
            <p></p>
          ) : !user.profile ? (
            <p></p>
          ) : !user.profile.soundcloud ? (
            <p></p>
          ) : (
            <a
              href={`https://soundcloud.com/${user.profile.soundcloud}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaSoundcloud size={60} />
            </a>
          )}

          {!user ? (
            <p></p>
          ) : !user.profile ? (
            <p></p>
          ) : !user.profile.applemusic ? (
            <p></p>
          ) : (
            <a
              href={`https://${user.profile.applemusic}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaApple size={60} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
export default UserProfile
