export const isSmartphone = (): boolean => {
    const userAgentCheck = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const screenSizeCheck = window.innerWidth <= 768;
    return userAgentCheck || screenSizeCheck;
};

