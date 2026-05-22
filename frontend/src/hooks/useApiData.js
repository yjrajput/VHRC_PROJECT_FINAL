import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for fetching API data with Stale-While-Revalidate (SWR) caching.
 * Loads cached data instantly from localStorage, fetches fresh data in the background,
 * and updates the state and cache once the fresh data is loaded.
 * 
 * @param {string} cacheKey - Unique key for localStorage
 * @param {Function} fetchFn - The API fetch function returning a promise
 * @param {*} defaultValue - Fallback value if no cache exists
 */
export const useApiData = (cacheKey, fetchFn, defaultValue = []) => {
  // Get initial data from cache if it exists
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      return cached ? JSON.parse(cached) : defaultValue;
    } catch (e) {
      console.warn(`Error reading localStorage for key "${cacheKey}":`, e);
      return defaultValue;
    }
  });

  // If we have cached data, we don't need to show a blocking loading state!
  const [loading, setLoading] = useState(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      return !cached; // false if cached exists, true otherwise
    } catch {
      return true;
    }
  });

  const [error, setError] = useState(null);
  
  // Use a ref for fetchFn to avoid trigger effect on reference changes of fetchFn
  const fetchFnRef = useRef(fetchFn);
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const freshData = await fetchFnRef.current();
        if (isMounted) {
          setData(freshData);
          setLoading(false);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(freshData));
          } catch (e) {
            console.warn(`Error writing to localStorage for key "${cacheKey}":`, e);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error(`SWR Fetch error for key "${cacheKey}":`, err);
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [cacheKey]);

  return { data, loading, error };
};
