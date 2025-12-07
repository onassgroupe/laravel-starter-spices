import { useCallback, useEffect, useState } from 'react';

interface UseFetchOptions {
    skip?: boolean;
}

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export function useGet<T>(url: string, options: UseFetchOptions = {}): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(!options.skip);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!url || options.skip) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' },
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    }, [url, options.skip]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
