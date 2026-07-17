import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import Tile from "../components/Tile.jsx";
import SaveToCollectionModal from "../components/SaveToCollectionModal.jsx";

async function fetchPage(pageNumber, searchTerm) {
  const trimmed = searchTerm.trim();
  const url = trimmed
    ? `/api/search?q=${encodeURIComponent(trimmed)}&page=${pageNumber}`
    : `/api/objects?page=${pageNumber}`;


    console.error("Fetching URL:", url);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Backend responded with status ${res.status}`);
  }
  return await res.json();
}

export default function IndexPage() {
  const [objects, setObjects] = useState([]);
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // prevents two overlapping "load next page" requests
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [modalItem, setModalItem] = useState(null);
  const [userCollections, setUserCollections] = useState([]);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const navigate = useNavigate();

  // scrollable tile container
  const containerRef = useRef(null);
  // invisible marker element AFTER last tile
  const sentinelRef = useRef(null);

  // throws away whatever was loaded before and starts fresh from page 1
  const resetAndLoadFirstPage = useCallback(async () => {
    try {
      const { items, hasMore: more } = await fetchPage(1, query);
      setObjects(items);
      setPage(1);
      setHasMore(more);
      setHasLoadedOnce(true);
    } catch (err) {
      console.error("Failed to fetch objects:", err);
    }
  }, [query]);

  const [prevQuery, setPrevQuery] = useState(query);

  if (query !== prevQuery) {
    setPrevQuery(query);
    setHasLoadedOnce(false);
  }

  useEffect(() => {
    const timeout = setTimeout(resetAndLoadFirstPage, 300);
    return () => clearTimeout(timeout);
  }, [resetAndLoadFirstPage]);

  // called by IntersectionObserver below once the
  // sentinel scrolls into view.
  const loadMore = useCallback(async () => {
    // ends early if we're already mid-fetch
    if (!hasLoadedOnce || isLoadingMore || !hasMore) {
      return;
    }
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const { items, hasMore: more } = await fetchPage(nextPage, query);
      setObjects((prev) => [...prev, ...items]);
      setPage(nextPage);
      setHasMore(more);
    } catch (err) {
      console.error("Failed to load more objects:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasLoadedOnce, isLoadingMore, hasMore, page, query]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const container = containerRef.current;
    // Guard against either ref not being attached yet
    if (!sentinel || !container) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root: container,
        // loadMore() fires a little BEFORE the user physically reaches
        // the last tile
        rootMargin: "0px 300px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadMore]);

  // called by tile's onAction prop when save button is clicked
  async function handleSaveClick(item) {
    try {
      const res = await fetch("/api/collections");
      // res auto checks for login bc route is protected by auth
      // if fails sends to login bc likely not logged in
      if (res.status === 401) {
        navigate("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch collections (status ${res.status})`);
      }

      const collections = await res.json();
      setUserCollections(collections);
      setModalItem(item);
    } catch (err) {
      console.error("Failed to open save dialog:", err);
    }
  }

  function closeModal() {
    setModalItem(null);
  }

  return (
    <>
      <h3>Welcome to...</h3>
      <h1> LCS003 </h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="tile-container">
        {objects.map((object) => (
          <Tile key={object.id} {...object} onAction={handleSaveClick} />
        ))}
        <div ref={sentinelRef} className="scroll-sentinel" />
      </div>
      {isLoadingMore && <p>Loading more...</p>}
      {modalItem && (
        <SaveToCollectionModal
          item={modalItem}
          collections={userCollections}
          onClose={closeModal}
        />
      )}
    </>
  );
}
