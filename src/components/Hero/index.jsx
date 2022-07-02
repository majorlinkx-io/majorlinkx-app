import React from "react"
import {Carousel} from 'react-bootstrap'
import ReactPlayer from 'react-player'
function Hero() {
  return (
    <div className="hero">
      <section className="hero-slider">
        <Carousel className="hero" fade>
          <Carousel.Item>
            <ReactPlayer width='auto' height='560px' controls={false} url='https://youtu.be/_VYKHZnCil8'/>
          </Carousel.Item>
        </Carousel>
      </section>
    </div>
  )
}

export default Hero
