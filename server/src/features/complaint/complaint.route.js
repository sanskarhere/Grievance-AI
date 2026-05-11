import express, { Router } from 'express';
import * as controller from './complaint.controller.js';

const complaintRouter = Router();

const notImpl = (req, res) => res.status(501).json({ error: 'Not implemented' });

complaintRouter.post('/create', controller.createComplaint ?? notImpl);
complaintRouter.put('/update/:id', controller.updateComplaint ?? notImpl);
complaintRouter.get('/get-all', controller.getAllComplaints ?? notImpl);
complaintRouter.get('/get/:id', controller.getComplaintById ?? notImpl);

export default complaintRouter;