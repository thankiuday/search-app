import  express  from 'express';
import  fetch  from 'node-fetch'; // Import node-fetch for server-side fetch
import  cors  from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // This loads environment variables from .env
const app = express();
const port = 5000;

// Use CORS to allow cross-origin requests
app.use(cors(
    origin : ["https://search-app-frontend-two.vercel.app/"],
    methods : ["POST","GET"],
    credentials : true
));

const YOUTUBE_API_KEY =  process.env.VITE_YOUTUBE_API_KEY;
const GOOGLE_CUSTOM_SEARCH_API_KEY =  process.env.VITE_GOOGLE_CUSTOM_SEARCH_API_KEY; 
const GOOGLE_CUSTOM_SEARCH_ENGINE_ID = '32df8e72bf01046b3'; 
// Endpoint to handle search requests
app.get('/search', async (req, res) => {
    const searchTerm = req.query.query;

    if (!searchTerm) {
        return res.status(400).json({ error: 'No search term provided' });
    }

    try {
        // Fetch YouTube videos
        const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${YOUTUBE_API_KEY}&maxResults=5`;
        const youtubeResponse = await fetch(youtubeUrl);
        const youtubeData = await youtubeResponse.json();
        const youtubeResults = youtubeData.items.map(item => ({
            title: item.snippet.title,
            link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            type: 'YouTube'
        }));

        // Fetch articles using Google Custom Search API
        const googleSearchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_CUSTOM_SEARCH_API_KEY}&cx=${GOOGLE_CUSTOM_SEARCH_ENGINE_ID}&q=${searchTerm}&num=5`;
        const googleSearchResponse = await fetch(googleSearchUrl);
        const googleSearchData = await googleSearchResponse.json();
        const articleResults = googleSearchData.items.map(item => ({
            title: item.title,
            link: item.link,
            type: 'Article'
        }));

        // Combine YouTube and article results
        const combinedResults = [...youtubeResults, ...articleResults];

        res.json(combinedResults);
    } catch (error) {
        console.error('Error fetching search data:', error);
        res.status(500).json({ error: 'Failed to fetch search data' });
    }
});

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const HOST = '0.0.0.0';  // Add this line
app.listen(port, HOST, () => {
  console.log(`Server running on http://${HOST}:${port}`);
});

