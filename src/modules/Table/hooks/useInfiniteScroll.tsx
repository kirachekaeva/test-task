import { StoreContext } from '@/app/provider/StoreProvider';
import { useEffect, useState, useCallback, useContext } from 'react';

interface UseInfiniteLoaderProps {
    initialPage?: number;
    pageSize?: number;
}

export const useInfiniteLoader = ({
    initialPage = 1,
    pageSize = 20,
}: UseInfiniteLoaderProps) => {
    const { tableStore } = useContext(StoreContext);
    const [isFetching, setIsFetching] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = useCallback(async () => {
        if (isFetching || !hasMore || tableStore.loading) return;

        setIsFetching(true);
        try {
            await tableStore.fetchTableData(tableStore.currentPage + 1, pageSize);
            tableStore.setCurrentPage(tableStore.currentPage + 1);

            if (tableStore.items.length >= (tableStore.currentPage + 1) * pageSize) {
                setHasMore(false);
            }
        } finally {
            setIsFetching(false);
        }
    }, [isFetching, hasMore, tableStore, pageSize]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        ) {
            return;
        }
        loadMore();
    }, [loadMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        tableStore.setCurrentPage(initialPage);
        tableStore.setHasMore(true);
    }, [tableStore, initialPage]);

    return {
        isFetching,
        hasMore,
        loadMore,
    };
};
