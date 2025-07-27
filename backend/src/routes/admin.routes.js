import express from 'express'
const router = express.Router();
import {createGroup,
registerUser,
addUserToGroup,
registerDevice,
approveDevice,
addDeviceToGroup} from '../controllers/admin.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Protect all routes with admin auth

// Device Management
router.post('/devices/register',verifyJWT, registerDevice);
router.post('/devices/approve',verifyJWT, approveDevice);
// router.delete('/devices/:deviceId', deleteDevice);

// Group Management
router.post('/groups',verifyJWT, createGroup);
router.post('/groups/add-device',verifyJWT, addDeviceToGroup);
// router.get('/groups/:groupId', getGroupDevices);

export default  router;