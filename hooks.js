// hooks.js
import { useState, useEffect } from 'react';

export function useAudio() {
    const [audio, setAudio] = useState({});

    useEffect(() => {
        setAudio({
            error: new Audio('/sounds/xp_error.mp3'),
            notify: new Audio('/sounds/xp_notify.mp3'),
            startup: new Audio('/sounds/xp_startup.mp3'),
        });
    }, []);

    return audio;
}