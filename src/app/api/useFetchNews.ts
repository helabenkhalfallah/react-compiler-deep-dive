import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useFetchNews = () => {
    const [filterQuery, setFilterQuery] = useState('science');

    const { data } = useQuery({
        queryKey: ['useFetchNews', filterQuery],
        queryFn: () =>
            fetch(
                `https://newsapi.org/v2/everything?q=${filterQuery}&sortBy=publishedAt&pageSize=100&page=1&apiKey=35a66ae469ba4fcda4e74236c781f557`,
            ).then((res) => res.json()),
    });

    return {
        newsList: data?.products,
        onFilterChange: setFilterQuery,
    };
};
