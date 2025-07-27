import {Group} from '../models/group.model.js';
import {User} from '../models/user.model.js'
import {Device} from '../models/device.model.js';

// Admin creates a new group
const createGroup = async (req, res) => {
  try {

    console.log(req.body);
    
    const { name } = req.body;
    const adminId = req.user._id; // From JWT middleware

    // Verify admin role
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Only admins can create groups' });
    // }

    const group = new Group({
      name,
      createdBy: adminId
    });

    await group.save();
    res.status(201).json({ success: true, group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin registers a new user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can register users' });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin adds user to a group
const addUserToGroup = async (req, res) => {
  try {
    const { userId, groupId } = req.body;

    // Verify admin permissions
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const group = await Group.findById(groupId);
    const user = await User.findById(userId);

    if (!group || !user) {
      return res.status(404).json({ error: 'Group or user not found' });
    }

    // Add user to group if not already a member
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    res.json({ success: true, message: 'User added to group' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





const registerDevice = async (req, res) => {

  // console.log(req);
  
  try {
    const { deviceId, name, groupName } = req.body;
    const device = new Device({ deviceId, name, groupsName:groupName });


    await device.save();
    res.status(201).json({ success: true, device });
  } catch (err) {
    res.status(500).json({ error: 'Device registration failed' });
  }
};

// Approve/Reject a device
const approveDevice = async (req, res) => {
  try {
    const { deviceId, approve } = req.body;
    const device = await Device.findOneAndUpdate(
      { deviceId },
      { approved: approve },
      { new: true }
    );
    res.json({ success: true, device });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
};

// Add device to group
const addDeviceToGroup = async (req, res) => {
  try {
    const { deviceId, groupId } = req.body;
    const group = await Group.findById(groupId);
    const device = await Device.findOne({ deviceId });

    if (!group || !device) {
      return res.status(404).json({ error: 'Group/Device not found' });
    }

    if (!group.allowedDevices.includes(device._id)) {
      group.allowedDevices.push(device._id);
      await group.save();
    }

    res.json({ success: true, message: 'Device added to group' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add device' });
  }
};

export {
    createGroup,
registerUser,
addUserToGroup,
registerDevice,
approveDevice,
addDeviceToGroup,
}