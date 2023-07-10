import { useState, useEffect } from 'react';

const useVirtualKeyboard = () => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    useEffect(() => {
        const updateKeyboardStatus = () => {
            const wasOpen = keyboardOpen;
            const isOpen = window.innerHeight < window.innerWidth;
            
            if (isOpen !== wasOpen) {
                setKeyboardOpen(isOpen);
            }
        };

        window.addEventListener('resize', updateKeyboardStatus);

        return () => {
            window.removeEventListener('resize', updateKeyboardStatus);
        };
    }, [keyboardOpen]);

    return keyboardOpen;
};

export default useVirtualKeyboard;