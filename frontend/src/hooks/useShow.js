import { useEffect, useState } from 'react';

const useShow = () => {
    const [show, setShow] = useState(true);
    const [reactionShow, setReactionShow] = useState(true);

    const handleShowHeader = () => {
        if (window.innerWidth < 900) {
            setShow(false);
        } else {
            setShow(true);
        }
    };

    const handleShowReaction = () => {
        if (window.innerWidth < 600) {
            setReactionShow(false);
        } else {
            setReactionShow(true);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleShowHeader);
        window.addEventListener('resize', handleShowReaction);
        handleShowHeader();
        handleShowReaction();
        return () => {
            window.removeEventListener('resize', handleShowHeader);
            window.removeEventListener('resize', handleShowReaction);
        };
    }, []);

    return { show, reactionShow };
};

export default useShow;
