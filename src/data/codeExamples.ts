export const codeExamples = {
  curl: {
    get: `curl -X GET "https://api.example.com/v1/data" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,

    post: `curl -X POST "https://api.example.com/v1/data" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
  "name": "Example Item",
  "description": "This is an example"
}'`,
  },

  javascript: `const axios = require('axios');

const apiKey = 'YOUR_API_KEY';
const baseURL = 'https://api.example.com/v1';

const client = axios.create({
  baseURL,
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  }
});

// Make a GET request
async function getData() {
  try {
    const response = await client.get('/data');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Make a POST request
async function createData(payload) {
  try {
    const response = await client.post('/data', payload);
    console.log('Created:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

getData();`,

  python: `import requests
import json

API_KEY = "YOUR_API_KEY"
BASE_URL = "https://api.example.com/v1"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Make a GET request
def get_data():
    try:
        response = requests.get(f"{BASE_URL}/data", headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Make a POST request
def create_data(payload):
    try:
        response = requests.post(
            f"{BASE_URL}/data", 
            headers=headers, 
            json=payload
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example usage
data = get_data()
if data:
    print(json.dumps(data, indent=2))`,

  responses: {
    success: `{
  "success": true,
  "data": {
    "id": "123",
    "name": "Example Item",
    "created_at": "2024-01-20T10:30:00Z"
  },
  "message": "Data retrieved successfully"
}`,

    error: `{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid API key provided"
  },
  "message": "Authentication failed"
}`,
  },

  auth: {
    header: 'Authorization: Bearer YOUR_API_KEY',
  },

  install: {
    npm: 'npm install axios',
    pip: 'pip install requests',
  },
}
