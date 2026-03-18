const { pool } = require('../db');

const CourtController = {
    /**
     * Get all courts (Browse/Search functionality)
     * This endpoint allows users (even unauthenticated ones if route is public) 
     * to browse courts and apply filters such as search term or location.
     */
    async getAllCourts(req, res) {
        try {
            const { search, location } = req.query;
            
            // Base query joins the courts table with users to fetch owner's name
            let query = 'SELECT c.*, u.name as owner_name FROM courts c JOIN users u ON c.owner_id = u.id WHERE 1=1';
            const params = [];

            // Dynamically append search condition if a query exists
            if (search) {
                query += ' AND (c.name LIKE ? OR c.description LIKE ?)';
                params.push(`%${search}%`, `%${search}%`);
            }
            // Dynamically append location condition if a query exists
            if (location) {
                query += ' AND c.location LIKE ?';
                params.push(`%${location}%`);
            }

            // Execute query and fetch results from database
            const [courts] = await pool.query(query, params);
            res.json(courts);
        } catch (err) {
            console.error('Error fetching courts:', err);
            // Catch unexpected errors and return a clean 500 status to the client
            res.status(500).json({ message: 'Error fetching courts, please try again later.', error: err.message });
        }
    },

    /**
     * Get single court details by ID
     * Typically used for the 'Court Details' page when a user selects a specific court.
     */
    async getCourtById(req, res) {
        try {
            // Retrieve court details including owner name
            const [courts] = await pool.query('SELECT c.*, u.name as owner_name FROM courts c JOIN users u ON c.owner_id = u.id WHERE c.id = ?', [req.params.id]);
            
            // If the court is not found, return 404 cleanly
            if (courts.length === 0) {
                return res.status(404).json({ message: 'Court not found. It may have been deleted.' });
            }
            
            res.json(courts[0]);
        } catch (err) {
            console.error('Error fetching court details:', err);
            res.status(500).json({ message: 'Internal Server Error while fetching court details.', error: err.message });
        }
    },

    /**
     * Add a new Court (Owner/Admin only)
     * Handles the creation of a new futsal court. Validates required fields
     * and ensures only authorized roles can perform this action.
     */
    async addCourt(req, res) {
        try {
            // Verify user role
            if (req.user.role !== 'owner' && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Must be an owner or admin to create a court.' });
            }

            const { name, location, price_per_hour, description, images, video_url } = req.body;
            
            // Validate required fields
            if (!name || !location || !price_per_hour) {
                return res.status(400).json({ message: 'Validation Error: Name, location, and price_per_hour are required fields.' });
            }

            // Insert into database. Images are stored as a JSON string.
            const [result] = await pool.query(
                'INSERT INTO courts (owner_id, name, location, price_per_hour, description, images, video_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [req.user.id, name, location, price_per_hour, description, JSON.stringify(images || []), video_url]
            );

            res.status(201).json({ message: 'Court added successfully', courtId: result.insertId });
        } catch (err) {
            console.error('Error adding court:', err);
            // Catch database errors like constraint violations
            res.status(500).json({ message: 'Failed to add court. Please verify the input data.', error: err.message });
        }
    },

    /**
     * Update an existing Court
     * Verifies that the user requesting the update is either the court's owner or an admin.
     */
    async updateCourt(req, res) {
        try {
            const courtId = req.params.id;
            
            // Fetch court to check ownership
            const [courts] = await pool.query('SELECT owner_id FROM courts WHERE id = ?', [courtId]);
            if (courts.length === 0) return res.status(404).json({ message: 'Court not found. Cannot proceed with update.' });
            
            // Check authorization: Must be the owner or an admin
            if (courts[0].owner_id !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden: You are not authorized to update this court.' });
            }

            const { name, location, price_per_hour, description, images, video_url } = req.body;

            // Update court details
            await pool.query(
                'UPDATE courts SET name = ?, location = ?, price_per_hour = ?, description = ?, images = ?, video_url = ? WHERE id = ?',
                [name, location, price_per_hour, description, JSON.stringify(images || []), video_url, courtId]
            );

            res.json({ message: 'Court updated successfully' });
        } catch (err) {
            console.error('Error updating court:', err);
            res.status(500).json({ message: 'Error updating court. Please try again.', error: err.message });
        }
    },

    /**
     * Delete a Court
     * Completely removes a court from the database. Requires owner or admin privileges.
     */
    async deleteCourt(req, res) {
        try {
            const courtId = req.params.id;
            
            // Need to verify ownership before deleting
            const [courts] = await pool.query('SELECT owner_id FROM courts WHERE id = ?', [courtId]);
            if (courts.length === 0) return res.status(404).json({ message: 'Court not found. It may have already been deleted.' });
            
            // Check authorization
            if (courts[0].owner_id !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden: You are not authorized to delete this court.' });
            }

            // Perform deletion
            await pool.query('DELETE FROM courts WHERE id = ?', [courtId]);
            res.json({ message: 'Court deleted successfully' });
        } catch (err) {
            console.error('Error deleting court:', err);
            res.status(500).json({ message: 'Error deleting court. Please try again.', error: err.message });
        }
    }
};

module.exports = CourtController;
