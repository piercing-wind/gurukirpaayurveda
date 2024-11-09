'use client'
import { useEffect } from 'react';

const useRedirectToChrome = () => {
  useEffect(() => {
    const userAgent = navigator.userAgent;

    // Function to check if the browser is an in-app browser
    const isInAppBrowser = () => {
      const inAppBrowserPatterns = [
        /FBAN/, // Facebook
        /FBAV/, // Facebook
        /Instagram/, // Instagram
        /Line/, // Line
        /Twitter/, // Twitter
        /Snapchat/, // Snapchat
        /WhatsApp/, // WhatsApp
        /WeChat/, // WeChat
        /Messenger/, // Facebook Messenger
      ];
      return inAppBrowserPatterns.some((pattern) => pattern.test(userAgent));
    };

    // Function to check if the website is in an iframe and the parent domain is byteswithbits.com
    const isInIframeFromBytesWithBits = () => {
      try {
        return window.self !== window.top && document.referrer.includes('byteswithbits.com');
      } catch (e) {
        return false;
      }
    };

    // Check if the user is on Android
    if (/android/i.test(userAgent)) {
      if (isInAppBrowser()) {
        if (isInIframeFromBytesWithBits()) {
          // Disable error handling for byteswithbits.com
         //  console.log('Disabling error handling for byteswithbits.com');
        } else {
          // Attempt to open in Chrome using intent
          window.location.href = "intent://" + window.location.href.replace(/^https?:\/\//, '') + "#Intent;scheme=https;package=com.android.chrome;end;";
          setTimeout(() => {
            // If no browser is found, prompt the user to choose from other browsers
            window.location.href = "intent://" + window.location.href.replace(/^https?:\/\//, '') + "#Intent;scheme=https;end;";
          }, 1000);
        }
      }
    } 
    // Check if the user is on iOS
    else if (/iPad|iPhone|iPod/.test(userAgent)) {
      if (isInAppBrowser()) {
        if (isInIframeFromBytesWithBits()) {
          // Disable error handling for byteswithbits.com
         //  console.log('Disabling error handling for byteswithbits.com');
        } else {
          // Attempt to open in Safari
          window.location.href = window.location.href;
        }
      }
    }
  }, []);
};

const RedirectWrapper = () => {
  useRedirectToChrome();
  return null;
};

export default RedirectWrapper;