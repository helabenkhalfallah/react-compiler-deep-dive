import { Input } from 'antd';
import React, { memo } from 'react';

interface NewsSearchBardProps {
    searchQuery: string;
    handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NewsSearchBar = memo(({ searchQuery, handleSearchChange }: NewsSearchBardProps) => {
    return (
        <div
            style={{
                marginTop: 16,
                marginBottom: 16,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Input
                style={{
                    width: '80%',
                }}
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    );
});

NewsSearchBar.displayName = 'NewsSearchBar';

export default NewsSearchBar;
