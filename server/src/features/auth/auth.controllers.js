import express, { Router } from 'express';
import authenticateToken from '../../middlewares/auth.middleware';

const router = Router();


router.post('/register', authenticateToken, async (req, res) => {
    const { email, name, role } = req.body;

    if (!email || !name || !role) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // In production, insert user into Neon DB here
        res.json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to register" });
    }
});

export default router;