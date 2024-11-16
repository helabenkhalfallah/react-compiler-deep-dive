'use client';

import { useFetchNews } from '@/app/api/useFetchNews';
import { NewsDetails } from '@/app/home/components/NewsDetails';
import NewsFilterView from '@/app/home/components/NewsFilterView';
import { NewsList } from '@/app/home/components/NewsList';
import NewsSearchBar from '@/app/home/components/NewsSearchBar';
import { NewsItemType } from '@/app/home/types/NewsItemType';
import React, { useCallback, useState, useTransition } from 'react';

const HomeView: React.FC = () => {
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [selectedNews, setSelectedNews] = useState<NewsItemType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [deferredQuery, setDeferredQuery] = useState(searchQuery);
    const [isPending, startTransition] = useTransition();

    const { newsList, onFilterChange } = useFetchNews();

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
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        // Start a low-priority update for deferred query
        startTransition(() => {
            setDeferredQuery(value);
        });
    };

    // Handle filter change
    const handleFilterChange = (value: string) => {
        onFilterChange(value);
    };

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
