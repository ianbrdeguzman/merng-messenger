import { useEffect, useState } from 'react';

const useShow = () => {
    const [show, setShow] = useState(true);

    const handleShowHeader = () => {
        if (window.innerWidth < 900) {
            setShow(false);
        } else {
            setShow(true);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleShowHeader);
        handleShowHeader();
        return () => {
            window.removeEventListener('resize', handleShowHeader);
        };
    }, []);

    return { show };
};

export default useShow;
