import { useEffect, useState } from 'react';

export function useSession() {
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/check-session', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'authenticated') {
                    setUser(data.user);
                    setUserId(data.id);
                } else {
                    console.log('Unauthenticated user');
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return { user, userId, loading };
}
