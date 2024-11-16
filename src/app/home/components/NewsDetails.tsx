import { NewsItemType } from '@/app/home/types/NewsItemType';
import { Flex, Modal, Space, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

interface NewsDetailsProps {
    newsDetails: NewsItemType;
    isModalOpen: boolean;
    onCloseModal: () => void;
}

export function NewsDetails({ newsDetails, isModalOpen, onCloseModal }: NewsDetailsProps) {
    return (
        <Modal title={newsDetails.title} open={isModalOpen} onCancel={onCloseModal} footer={[]}>
            <Flex gap="middle" align="center" vertical>
                <Image
                    alt={newsDetails.title}
                    src={
                        newsDetails.urlToImage ||
                        'https://fakeimg.pl/600x400/e6e6e6/d9d9d9?text=No+image'
                    }
                    width={300}
                    height={200}
                />
                <Space direction="vertical" size="middle">
                    <Typography.Text>{newsDetails.title}</Typography.Text>
                    <Typography.Text>{newsDetails.description}</Typography.Text>
                </Space>
            </Flex>
        </Modal>
    );
}
