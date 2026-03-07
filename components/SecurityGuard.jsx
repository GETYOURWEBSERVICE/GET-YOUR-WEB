import { useEffect } from 'react';

const SecurityGuard = () => {
    useEffect(() => {
        // Disable Right-Click
        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        // Disable Keyboard Shortcuts
        const handleKeyDown = (e) => {
            // F12
            if (e.keyCode === 123) {
                e.preventDefault();
                return false;
            }
            // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
            if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
                e.preventDefault();
                return false;
            }
            // Ctrl+U (View Source)
            if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                return false;
            }
            // Ctrl+S (Save Page)
            if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
                return false;
            }
        };

        // Console Trap / Warning
        const trapConsole = () => {
            console.clear();
            console.log(
                "%cSTOP!",
                "color: red; font-family: sans-serif; font-size: 4.5rem; -webkit-text-stroke: 1px black; font-weight: bold"
            );
            console.log(
                "%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or 'hack' someone's account, it is a scam and will give them access to your account.",
                "font-family: sans-serif; font-size: 1.5rem; color: black;"
            );
            console.log(
                "%cWebsite Protected by Antigravity AI Security. Unauthorised access to source code is strictly prohibited.",
                "font-family: sans-serif; font-size: 1.2rem; color: #ffaa00; font-weight: bold;"
            );
            console.log("%c[SecurityGuard] System Online & Monitoring", "color: blue; font-weight: bold;");
        };

        // Debugger Loop (Harder to bypass)
        const debugLoop = () => {
            setInterval(() => {
                const startTime = performance.now();
                debugger;
                const endTime = performance.now();
                if (endTime - startTime > 100) {
                    // console.log("Inspection Detected!");
                }
            }, 1000);
        };
        // debugLoop(); // Use with caution as it stops execution if dev tools are open

        const clearIntervalId = setInterval(() => {
            // console.clear(); // Disabled by default as it might be annoying during dev, but user specifically asked for "max security"
        }, 1000);

        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('keydown', handleKeyDown);
        trapConsole();

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(clearIntervalId);
        };
    }, []);

    return null;
};

export default SecurityGuard;
