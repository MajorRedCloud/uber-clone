import { useState, useEffect, useCallback } from "react";

type OlaMapsProps = {
  query: string;
  latitude: number;
  longitude: number;
  radius: number;
};

export const fetchAPI = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(url, options);
      setData(result.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const fetchPredictions = async ({query, latitude, longitude, radius} : OlaMapsProps) => {
        
        query.replaceAll(' ', '%20')
        try {
            const url = `https://api.olamaps.io/places/v1/autocomplete?input=${query}&location=${latitude}%2C${longitude}&radius=${radius}&api_key=${process.env.EXPO_PUBLIC_OLA_MAPS_API_KEY}`;
    
            const response = await fetch(url)
            const data = await response.json()
            
            return data
            
        } catch (error) {
            console.log(error)
        }
    }