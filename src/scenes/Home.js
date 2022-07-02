import React from "react"
import Hero from "../components/Hero"
import Main from "../components/Main"
import Footer from "../components/Footer"
import Marquee from "react-fast-marquee"

function HomePage() {
  return (
    <>
      <div className="major-home">
        <Hero />
        <Main />
        <Marquee>
          <Footer />
        </Marquee>

        <span>
          {process.env.NODE_ENV} MODE 
          {/* {process.env.REACT_APP_API_ENDPOINT} */}
        </span>
      </div>
    </>
  )
}
export default HomePage
