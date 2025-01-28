import {useEffect, useState} from 'react';
import axios from 'axios';
import {InterestType} from '../../../types';
import {HomeComponentServiceProps} from '../../../types/HomePropsType';

const HomeComponentService = ({children}: HomeComponentServiceProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [interests, setInterests] = useState<InterestType[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        fetchInterests(searchTerm);
      } else {
        setInterests([]); // Clear interests if searchTerm is empty
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(timer); // Cleanup timeout on each re-render
  }, [searchTerm]);

  // Function to fetch interests with API call
  const fetchInterests = async (term: string) => {
    const source = axios.CancelToken.source(); // Create cancel token

    try {
      const response = await axios.get(
        'https://be-v2.convose.com/autocomplete/interests',
        {
          cancelToken: source.token, // Attach cancel token to the request
          headers: {
            Accept: 'application/json',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language':
              'en-GB,en;q=0.9,en-US;q=0.8,de-DE;q=0.7,de;q=0.6',
            Authorization: 'Jy8RZCXvvc6pZQUu2QZ2',
          },
          params: {q: term, limit: 10, from: 0},
        },
      );

      const data = response.data.autocomplete;

      if (Array.isArray(data)) {
        // Filter and prioritize exact matches first
        const exactMatches = data.filter(item =>
          item.name.toLowerCase().includes(term.toLowerCase()),
        );

        const previousMatches = data.filter(
          item => !exactMatches.includes(item),
        );

        // Sort results: exact matches first, then other matches
        const sortedResults = [...exactMatches, ...previousMatches];
        setInterests(sortedResults);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error fetching interests:', error);
      }
    }
  };

  return children({
    searchTerm,
    setSearchTerm,
    interests,
  });
};

export default HomeComponentService;
