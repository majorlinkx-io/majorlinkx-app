import React from 'react'

 function Video() {
  return (
    <div className='my-video'>
      <video loop autoPlay muted id='' >
        <source src={require('./Network_black.mp4')} type="video/mp4" />
      </video>
    </div>
  )
}
export default Video