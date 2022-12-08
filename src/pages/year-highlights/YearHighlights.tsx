import { useEffect, useState } from 'react';
// project import
import Highlights from './Highlights';

// ==============================|| YEAR HIGHLIGHTS ||============================== //

const YearHighlights = () => {
    const pathname = document.location.pathname.split('/')[1];
    const [path, setPath] = useState<string>(document.location.pathname.split('/')[1]);
    useEffect(() => {
        setPath(pathname);
    }, [pathname]);
    return (
        <>
            <Highlights year={path} />
        </>
    );
};

export default YearHighlights;
