import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Navbar from './Components/Navbar/Navbar.jsx';
import Search from './Components/Search-Input/Search.jsx';
import Main from './Components/MainContainer/Main.jsx';
import Footer from './Components/Footer/Footer.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All'); // State to store selected filter
  const [selectedSort, setSelectedSort] = useState('views'); // State to store selected sort option

  const API_KEY = 'AIzaSyB9gLacQK2p84og3Rx1dcE8cctXdeZ2hEw'
  const GOOGLE_CUSTOM_SEARCH_API_KEY = 'AIzaSyAGi7ow1Ntq5YAX3ZYbC013f6iO3QiE28Y';
  console.log(API_KEY)
  console.log(GOOGLE_CUSTOM_SEARCH_API_KEY)
  // Fetch YouTube Video Data with Statistics (likes, views)
  const fetchYouTubeVideoStats = async (videoIds) => {
    const videoStatsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(',')}&key=${API_KEY}`;
    const response = await fetch(videoStatsUrl);
    const data = await response.json();
    return data.items;
  };


  const handleSearch = async () => {
    try {
      // Fetch data from the server
      const response = await fetch(`http://localhost:5000/search?query=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();

      // Filter the data based on the selected filter
      const filteredResults = data.filter(item =>
        selectedFilter === 'All' || item.type === selectedFilter
      );

      // For YouTube results, fetch additional video stats (likes, views)
      const youtubeResults = filteredResults.filter(item => item.type === 'YouTube');
      const articleResults = filteredResults.filter(item => item.type === 'Article');

      if (youtubeResults.length > 0) {
        const videoIds = youtubeResults.map(item => item.link.split('v=')[1]); // Extract video IDs from YouTube links
        const videoStats = await fetchYouTubeVideoStats(videoIds);

        // Add views and likes to each YouTube result
        const enrichedYouTubeResults = youtubeResults.map((result, index) => ({
          ...result,
          views: videoStats[index]?.statistics?.viewCount || 'N/A',
          likes: videoStats[index]?.statistics?.likeCount || 'N/A'
        }));

        // Sort the enriched YouTube results based on the selected sorting option
        enrichedYouTubeResults.sort((a, b) => {
          if (selectedSort === 'views') {
            return b.views - a.views; // Sort by views in descending order
          } else if (selectedSort === 'likes') {
            return b.likes - a.likes; // Sort by likes in descending order
          }
          return 0;
        });

        // Combine YouTube and Article results
        setResults([...enrichedYouTubeResults, ...articleResults]);
      } else {
        // If no YouTube results, set articles directly
        setResults(filteredResults);
      }

      console.log(filteredResults);
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <>
      <Navbar />
      <div className="App">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          selectedFilter={selectedFilter} // Pass selected filter to Search component
          setSelectedFilter={setSelectedFilter} // Handle filter selection
        />
        <Main results={results} />
      </div>
      <Footer id="footer" />
    </>
  );
}

export default App;
