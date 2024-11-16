import { NewsItemType } from '@/app/home/types/NewsItemType';
import { Button, List } from 'antd';
import Image from 'next/image';
import React, { useMemo } from 'react';

interface NewsListProps {
    newsList: NewsItemType[];
    favorites: Set<string>;
    toggleFavorite: (id: string) => void;
    openModal: (news: NewsItemType) => void;
    searchQuery: string;
}

export function NewsList({
    newsList,
    favorites,
    toggleFavorite,
    openModal,
    searchQuery,
}: NewsListProps) {
    const filteredNews = useMemo(() => {
        return newsList
            .filter((item) => item.title && !item.title.includes('Removed'))
            .filter(
                (item) =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase()),
            );
    }, [newsList, searchQuery]);

    return (
        <List
            dataSource={filteredNews}
            itemLayout="vertical"
            renderItem={(news) => (
                <List.Item
                    key={`${news.title}-${news.publishedAt}`}
                    actions={[
                        <Button key="Details" onClick={() => openModal(news)}>
                            View Details
                        </Button>,
                        <Button
                            key="Favorite"
                            onClick={() => toggleFavorite(news.title)}
                            type={favorites.has(news.title) ? 'primary' : 'default'}
                        >
                            {favorites.has(news.title) ? 'Remove Favorite' : 'Add to Favorites'}
                        </Button>,
                    ]}
                    extra={
                        <Image
                            alt={news.title}
                            src={
                                news.urlToImage ||
                                news.thumbnail ||
                                'https://fakeimg.pl/600x400/e6e6e6/d9d9d9?text=No+image'
                            }
                            width={250}
                            height={150}
                        />
                    }
                >
                    <List.Item.Meta title={news.title || ''} description={news.description || ''} />
                </List.Item>
            )}
        />
    );
}
