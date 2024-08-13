const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 5000;

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyDJlRBrIs62m8Lx-m-8Z3rt0DYSllFKo_o");
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Configure your database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Endpoint for handling queries
app.post('/query', async (req, res) => {
    const userQuery = req.body.query;
    try {
        const sqlQuery = await convertToSQL(userQuery);
        console.log('Generated SQL Query:', sqlQuery);  // Log generated SQL query

        if (sqlQuery && isValidSQL(sqlQuery)) {
            db.query(sqlQuery, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).json({ error: 'Error executing query' });
                } else {
                    res.json(results);
                }
            });
        } else {
            res.status(400).json({ error: 'Invalid SQL query' });
        }
    } catch (error) {
        console.error('Error in /query route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to convert natural language to SQL using Gemini API
async function convertToSQL(userQuery) {
    try {
        // Generate content using the model
        const result = await model.generateContent(userQuery);
        const response = await result.response;
        let sqlQuery = await response.text();

        // Extract only the SQL query from the response
        // Assuming the query is enclosed within ```sql and ```, adjust if necessary
        sqlQuery = sqlQuery.split('```sql')[1]?.split('```')[0]?.trim();

        if (!sqlQuery) {
            throw new Error('No SQL query found in the response');
        }

        // Log the extracted SQL query for debugging
        console.log('Extracted SQL Query:', sqlQuery);

        return sqlQuery;
    } catch (error) {
        console.error('Error generating SQL:', error);
        return '';
    }
}

// Simple SQL validation function (basic check)
function isValidSQL(query) {
    // Basic check for SQL syntax; adjust as needed
    const validCommands = ['select', 'insert', 'update', 'delete'];
    return validCommands.some(command => query.toLowerCase().includes(command));
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
