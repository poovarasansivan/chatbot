import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch data from the backend (initially empty, so no need for an endpoint here)
    // Set up only when there is a response with data
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/query', { query: textInput });
      if (response.data.error) {
        setError(response.data.error);
        setData([]);
      } else {
        setError('');
        setData(response.data);
      }
      setTextInput('');
    } catch (error) {
      console.error('Error sending data:', error);
      setError('Error sending data');
      setData([]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Home Page</h2>

      <div className="mb-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Type your query..."
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Send
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        {error && <p className="text-red-500">{error}</p>}
        <table className="min-w-full bg-white border text-black border-gray-200">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-4 border-b text-black">ID</th>
              <th className="p-4 border-b text-black">Name</th>
              <th className="p-4 border-b text-black">Salary</th>
              <th className="p-4 border-b text-black">Position</th>
              <th className="p-4 border-b text-black">Department</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td className="p-4 border-b">{item.id}</td>
                <td className="p-4 border-b">{item.name}</td>
                <td className="p-4 border-b">{item.salary}</td>
                <td className="p-4 border-b">{item.position}</td>
                <td className="p-4 border-b">{item.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
