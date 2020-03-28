import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Contains various utility functions.
 */

/**
 * Effect to fetch data from a specified API endpoint
 */
const useGet = (url, params, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = (url, params) => {
    // Initially set loading to true and errors to null
    setLoading(true);
    setError(null);
    // Make API call
    axios
      .get(url, params)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => fetchData(url, params), deps);

  return { data, loading, error };
};

/**
 * Create a route link.
 */
export const createNewLink = displayName => {
  const link = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} {...props} />
  ));
  link.displayName = displayName;
  return link;
};
