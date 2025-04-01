"use client";
import { useEffect, useState } from 'react';

const TestConnection = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
      try {


        
        const response = await fetch('/api/route');

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        setStatus(data.message);
      } catch (error: any) {
        setStatus('Error connecting to database');
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  if (loading) {
    return <div className="p-50 bg-blue-300 mt-40">Loading...</div>;
  }

  if (error) {
    return <div className="p-50 bg-red-300 mt-40">Error: {error}</div>;
  }

  return (
    <div className="p-50 bg-green-300 mt-40">
      MongoDB Connection Status: {status}
    </div>
  );
};

export default TestConnection;
