"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import usePosts from "../hooks/usePosts"; // Import your custom hook

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { allPosts, loading, error, refetchPosts } = usePosts(); // Use the hook
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // Filter prompts based on search text
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // Handle tag click for filtering
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  // Simulate post creation and trigger refetch
  const handleCreatePost = async () => {
    // Simulate creating a post
    await fetch("/api/prompt", { method: "POST", body: JSON.stringify({ prompt: "New Post" }) });
    refetchPosts(); // Refetch posts after creating a new one
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* Display all or filtered prompts */}
      {searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}

      {/* Button to simulate post creation and trigger refetch */}
      <button onClick={handleCreatePost}>Create Post</button>
    </section>
  );
};

export default Feed;

export const dynamic = 'force-dynamic';
