import { apiClient } from './apiClient';

const reviewService = {
    /**
     * Get reviews and stats for a specific court
     * @param {string|number} courtId 
     * @returns {Promise<{reviews: Array, stats: {average_rating: string, total_reviews: number}}>}
     */
    async getCourtReviews(courtId) {
        return await apiClient.get(`/reviews/courts/${courtId}`);
    },

    /**
     * Submit or update a review for a court
     * @param {string|number} courtId 
     * @param {number} rating 1-5
     * @param {string} comment Optional comment
     * @returns {Promise<{message: string}>}
     */
    async submitReview(courtId, rating, comment = '') {
        return await apiClient.post(`/reviews/courts/${courtId}`, { rating, comment });
    }
};

export default reviewService;
