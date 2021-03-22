export default {
    apiUrl: process.env.NODE_ENV === 'production'
      ? 'https://pm-app-bend.herokuapp.com' : 'http://localhost:4000',
    options: { headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }}
};
  