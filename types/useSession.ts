import { useEffect, useState } from 'react';

export function useSession() {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/check-session', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'authenticated') {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    return { user, loading };
}
