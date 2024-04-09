import ReactStars from "react-rating-stars-component";

function Rate({setRatingValue}) {
    const handleRating = (rate)=>{
        setRatingValue(rate)
    }
    return(

        <div className="container">
            <div className="d-flex flex-column align-items-end py-2 text-white">
                <h3 className="fs-5 mb-0">Filter by rating</h3>
                <ReactStars count={5} onChange={handleRating} size={38} activeColor="#ffc107"/>
            </div>
        </div>
    )
    
}

export default Rate