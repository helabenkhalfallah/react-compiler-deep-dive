import { Segmented } from 'antd';
import { memo } from 'react';

const NewsFilterView = memo(({ onFilterChange }: { onFilterChange: (value: string) => void }) => {
    return (
        <Segmented
            block
            size="large"
            options={['science', 'technology', 'sports', 'entertainment']}
            style={{ margin: 16 }}
            onChange={onFilterChange}
        />
    );
});

NewsFilterView.displayName = 'NewsFilterView';

export default NewsFilterView;
