import React, { useEffect, useState } from 'react';
import { fetchData } from '../Services/user';
import { useLocation } from 'react-router-dom';
import NotFound from './NotFound';
import Links from '../Componants/Links';
import Profile from '../Componants/Profile';

const UserTree = () => {
    const location = useLocation();
    const [data, setData] = useState(null);
    const path = location.pathname.slice(1);

    useEffect(() => {
        let mounted = true;
        (async () => {
            const items = await fetchData(path);
            if (mounted && items.data) {
                setData(items.data);
            }
        })();
        return () => (mounted = false);
    }, [path]);

    console.log(data);
    return (
        <>
            {data !== null && typeof data.docs === 'object' ? (
                <>
                    <Profile data={data.docs} />
                    <Links link={data.docs?.socials} />
                </>
            ) : (
                <NotFound />
            )}
        </>
    );
};

export default UserTree;
