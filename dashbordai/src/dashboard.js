import React, { useState } from 'react';

const EmployeeDashboard = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        });
        const data = await response.json();
        if (data.error) {
            setError(data.error);
            setResults([]);
        } else {
            setError('');
            setResults(data);
        }
    };

    const generateTable = (data) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Position</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.salary}</td>
                            <td>{row.position}</td>
                            <td>{row.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <h1>Employee Dashboard</h1>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Enter your query" 
            />
            <button onClick={fetchData}>Submit</button>
            <div id="results">
                {error && <p>{error}</p>}
                {results.length > 0 && generateTable(results)}
            </div>
        </div>
    );
};

export default EmployeeDashboard;
