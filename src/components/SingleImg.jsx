import React from 'react'
import { useParams } from 'react-router-dom'

const SingleImg = () => {

 const {imageId} = useParams()

  return (
    <div>SingleImg {imageId}</div>
  )
}

export default SingleImg