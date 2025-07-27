import { useState, useEffect } from 'react';
import { 
  createGroup, 
  addDeviceToGroup, 
  getGroupDevices 
} from '../../services/api.js';
import { PlusIcon } from '@heroicons/react/outline';
import axios from 'axios';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [devices, setDevices] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
const token = localStorage.getItem('token');
  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try {
        const res=await axios.post('http://localhost:8000/api/v1/admin/groups',{ name: newGroup },{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        console.log(res);
        

    } catch (error) {
        console.log(error);
        
    }

    // await createGroup(newGroup);
    setNewGroup('');



    // fetchGroups();
  };

  const handleAddDevice = async (groupId, deviceId) => {
    await addDeviceToGroup(deviceId, groupId);
    fetchGroupDevices(groupId);
  };

  const fetchGroupDevices = async (groupId) => {
    const res = await getGroupDevices(groupId);
    setSelectedGroup(res.data);
  };

//   useEffect(() => { fetchGroups(); }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Group Management</h1>

      {/* Create Group Form */}
      <form onSubmit={handleCreateGroup} className="mb-8 p-4 bg-gray-100 rounded-lg">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="New Group Name"
            className="p-2 border rounded flex-1"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <PlusIcon className="h-5 w-5 inline mr-1" />
            Create Group
          </button>
        </div>
      </form>

      {/* Groups and Devices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Groups List */}
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Groups</h2>
          <div className="space-y-2">
            {groups.map((group) => (
              <div 
                key={group._id} 
                className={`p-3 border rounded cursor-pointer hover:bg-blue-50 ${selectedGroup?._id === group._id ? 'bg-blue-100' : ''}`}
                onClick={() => fetchGroupDevices(group._id)}
              >
                {group.name}
              </div>
            ))}
          </div>
        </div>

        {/* Group Devices */}
        {selectedGroup && (
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-4">Devices in {selectedGroup.name}</h2>
            <div className="space-y-4">
              {/* Add Device to Group */}
              <select 
                onChange={(e) => handleAddDevice(selectedGroup._id, e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">Select device to add</option>
                {devices.map(device => (
                  <option key={device._id} value={device._id}>
                    {device.name} ({device.deviceId})
                  </option>
                ))}
              </select>

              {/* Devices List */}
              <div className="border rounded">
                {selectedGroup.allowedDevices.map(device => (
                  <div key={device._id} className="p-3 border-b hover:bg-gray-50">
                    {device.name} ({device.deviceId})
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}