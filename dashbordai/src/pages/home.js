import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');

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

  // Extract headers from the first item if available
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

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
        {data.length > 0 ? (
          <table className="min-w-full bg-white border text-black border-gray-200">
            <thead>
              <tr className="bg-black text-white">
                {headers.map(header => (
                  <th key={header} className="p-4 border-b text-black">
                    {header.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {headers.map(header => (
                    <td key={header} className="p-4 border-b">
                      {item[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-center text-red-600 text-lg'>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
