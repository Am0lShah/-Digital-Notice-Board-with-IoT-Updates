import { useState, useEffect } from 'react';
import { 
  registerDevice, 
  approveDevice, 
  deleteDevice 
} from '../../services/api.js';
import { CheckIcon, XIcon, TrashIcon } from '@heroicons/react/outline';

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ deviceId: '', name: '',groupName:'' });
  const [status,SetStatus]=useState('');

  const fetchDevices = async () => {
    // Implement API call to fetch devices
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res= await registerDevice(newDevice);
    
    console.log(res);

    if(res.status==201){
      alert(`Device ${res.data.name} is successfully registered`);
      
    }
    



    setNewDevice({ deviceId: '', name: '',groupName:'' });
    fetchDevices();
  };

  const handleApprove = async (deviceId, approve) => {
    await approveDevice(deviceId, approve);
    fetchDevices();
  };

  const handleDelete = async (deviceId) => {
    await deleteDevice(deviceId);
    fetchDevices();
  };

  useEffect(() => { fetchDevices(); }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Device Management</h1>
      
      {/* Register New Device */}
      <form onSubmit={handleRegister} className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Register New Device</h2>
        <div className="flex flex-col space-4  py-2 ">
          <input
            type="text"
            placeholder="Device ID"
            className="p-2 border rounded flex-1 my-2"
            value={newDevice.deviceId}
            onChange={(e) => setNewDevice({...newDevice, deviceId: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Device Name"
            className="p-2 border rounded flex-1 my-2"
            value={newDevice.name}
            onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Device Group"
            className="p-2 border rounded flex-1 my-2"
            value={newDevice.groupName}
            onChange={(e) => setNewDevice({...newDevice, groupName: e.target.value})}
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-1/2 "
          >
            Register
          </button>
        </div>
      </form>

      {/* Devices List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Device ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{device.deviceId}</td>
                <td className="py-2 px-4 border">{device.name}</td>
                <td className="py-2 px-4 border">
                  {device.approved ? (
                    <span className="text-green-500">Approved</span>
                  ) : (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </td>
                <td className="py-2 px-4 border flex space-x-2">
                  {!device.approved && (
                    <button
                      onClick={() => handleApprove(device.deviceId, true)}
                      className="text-green-500 hover:text-green-700"
                      title="Approve"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(device.deviceId)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}