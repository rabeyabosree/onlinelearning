import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Importing React Icons for star

function ReviewsForm({ courseId, studentId }) {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0); // Initial rating is 0 (no stars selected)

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || review === "") {
            alert("Please select a rating and write a review.");
            return;
        }

        const reviewData = { studentId, rating, review };
        await addReviews(courseId, reviewData);
        alert("Review added successfully!");
    }

    // Handle star click
    const handleStarClick = (starIndex) => {
        setRating(starIndex);
    };

    // Render the stars
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    onClick={() => handleStarClick(i)} // Set rating on star click
                    style={{ cursor: 'pointer', fontSize: '2rem' }}
                >
                    {i <= rating ? (
                        <FaStar style={{ color: '#FFD700' }} /> // Filled star (gold)
                    ) : (
                        <FaRegStar style={{ color: '#ccc' }} /> // Empty star (gray)
                    )}
                </span>
            );
        }
        return stars;
    };

    return (
        <div>
            <h1>Rate your experience</h1>

            {/* Render the stars here */}
            <div className="rating-stars">
                {renderStars()}
            </div>

            <div>
                <textarea
                    name="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    cols={3}
                    rows={1}
                    placeholder="Write your review here..."
                ></textarea>
            </div>

            <button onClick={handleSubmit}>Submit Review</button>
        </div>
    );
}

export default ReviewsForm;
