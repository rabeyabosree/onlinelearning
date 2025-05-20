import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import React Icons for stars
import { getReviews } from '../../../../backend/controllers/reviewsControl';

function Reviews({ courseId }) {
    const [reviews, setReviews] = useState([]);

    // Fetch reviews when courseId changes
    useEffect(() => {
        const fetchReviews = async () => {
            const data = await getReviews(courseId);
            setReviews(data);
        };
        fetchReviews();
    }, [courseId]);

    // Function to render the stars based on rating
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i}>
                    {i <= rating ? (
                        <FaStar style={{ color: '#FFD700' }} /> // Filled star
                    ) : (
                        <FaRegStar style={{ color: '#ccc' }} /> // Empty star
                    )}
                </span>
            );
        }
        return stars;
    };

    return (
        <div>
            <h1>Reviews</h1>
            {reviews.length ? (
                reviews.map((review, index) => (
                    <div key={index}>
                        {/* Display student name */}
                        <p>{review.studentId.name}</p>
                        {/* Display the rating stars */}
                        <div>{renderStars(review.rating)}</div>
                        {/* Display the review text */}
                        <p>{review.review}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet</p>
            )}
        </div>
    );
}

export default Reviews;
