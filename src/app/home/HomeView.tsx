'use client';

import { NewsDetails } from '@/app/home/components/NewsDetails';
import NewsFilterView from '@/app/home/components/NewsFilterView';
import { NewsList } from '@/app/home/components/NewsList';
import NewsSearchBar from '@/app/home/components/NewsSearchBar';
import { NewsItemType } from '@/app/home/types/NewsItemType';
import React, { useCallback, useEffect, useState, useTransition } from 'react';

const HomeView: React.FC = () => {
    const [newsList, setNewsList] = useState<NewsItemType[]>([]);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [selectedNews, setSelectedNews] = useState<NewsItemType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [deferredQuery, setDeferredQuery] = useState(searchQuery);
    const [isPending, startTransition] = useTransition();

    const [filterQuery, setFilterQuery] = useState('science');

    // Fetch news data from an open-source API
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=${filterQuery}&sortBy=publishedAt&pageSize=100&page=1&apiKey=35a66ae469ba4fcda4e74236c781f557`,
                ); // Replace with a real API
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }
                const data = await response.json();
                setNewsList(data?.articles);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            }
        };

        fetchNews();
    }, [filterQuery]);

    const toggleFavorite = useCallback((id: string) => {
        setFavorites((prevFavorites) => {
            const newFavorites = new Set(prevFavorites);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    }, []);

    const openModal = useCallback((news: NewsItemType) => {
        setSelectedNews(news);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setSelectedNews(null);
        setIsModalOpen(false);
    }, []);

    // Handle search input with transition
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        // Start a low-priority update for deferred query
        startTransition(() => {
            setDeferredQuery(value);
        });
    }, []);

    // Handle filter change
    const handleFilterChange = useCallback((value: string) => {
        setFilterQuery(value);
    }, []);

    return (
        <div>
            <h1>Latest News</h1>

            <NewsFilterView onFilterChange={handleFilterChange} />

            <NewsSearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />

            {/* Show loading state for the deferred update */}
            {isPending && <p>Loading...</p>}

            <NewsList
                newsList={newsList}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                searchQuery={deferredQuery}
                openModal={openModal}
            />

            {isModalOpen && selectedNews && (
                <NewsDetails
                    newsDetails={selectedNews}
                    isModalOpen={isModalOpen}
                    onCloseModal={closeModal}
                />
            )}
        </div>
    );
};

export default HomeView;
