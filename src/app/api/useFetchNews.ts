import { NewsItemType } from '@/app/home/types/NewsItemType';
import { useEffect, useState } from 'react';

export const useFetchNews = () => {
    const [newsList, setNewsList] = useState<NewsItemType[]>([]);
    const [filterQuery, setFilterQuery] = useState('science');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=${filterQuery}&sortBy=publishedAt&pageSize=100&page=1&apiKey=35a66ae469ba4fcda4e74236c781f557`,
                );

                if (!response.ok) {
                    setNewsList([]);
                    return;
                }

                const data = await response.json();
                setNewsList(data?.products);
            } catch (error) {
                console.error('Failed to fetch news:', error);
                setNewsList([]);
            }
        };

        fetchNews();
    }, [filterQuery]);

    return {
        newsList,
        onFilterChange: setFilterQuery,
    };
};
