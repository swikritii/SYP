/**
 * Calculate the total price for a court booking.
 * @param {number} pricePerHour - Price per hour
 * @param {number} durationHours - Duration in hours
 * @param {number} discount - Discount percentage (0-100)
 * @returns {object} - { subtotal, discountAmount, total }
 */
export function calculatePrice(pricePerHour, durationHours = 1, discount = 0) {
  const subtotal = pricePerHour * durationHours;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

/**
 * Format a price number into a currency string.
 * @param {number} price
 * @param {string} currency
 * @returns {string}
 */
export function formatPrice(price, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
}
