import { useEffect, useState } from 'react';

export const useAudio = () => {
    const [audio, setAudio] = useState({
        error: null,
        notify: null,
        startup: null,
    });

    useEffect(() => {
        setAudio({
            error: new Audio('/sounds/xp_error.mp3'),
            notify: new Audio('/sounds/xp_notify.mp3'),
            startup: new Audio('/sounds/xp_startup.mp3'),
        });
    }, []);

    return audio;
};