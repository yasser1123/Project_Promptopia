import { useState, useEffect } from "react";

const usePosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/prompt", {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-store', // Prevent client-side caching
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  // Provide a way to manually trigger a refetch
  const refetchPosts = () => {
    fetchPosts();
  };

  return { allPosts, loading, error, refetchPosts };
};

export default usePosts;
