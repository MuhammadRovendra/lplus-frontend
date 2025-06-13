/* eslint-disable react/prop-types */
const RatingDisplay = ({ rating, max}) => {
  // console.log(rating)s
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0)

  const stars = []

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className="text-yellow-400 text-xl">★</span>)
  }

  if (hasHalfStar) {
    stars.push(<span key="half" className="text-yellow-400 text-xl">☆</span>)
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className="text-gray-300 text-xl">★</span>)
  }

  return (
    <div className="flex items-center gap-2">
      {stars}
    </div>
  )
}

export default RatingDisplay
