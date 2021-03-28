import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = ({ imageInfo }) => {
  const { alt = '', childImageSharp, image } = imageInfo

  if (!!image && !!image.childImageSharp) {
    return (
      <Img className="post__image" fluid={image.childImageSharp.fluid} alt={alt} />
    )
  }

  if (!!childImageSharp) {
    return <Img className="post__image" fluid={childImageSharp.fluid} alt={alt} />
  }

  if (!!image && typeof image === 'string')
    return <img className="post__image" src={image} alt={alt} />

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
}

export default PreviewCompatibleImage
