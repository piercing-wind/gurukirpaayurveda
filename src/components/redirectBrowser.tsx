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

    // Check if the user is on Android
    if (/android/i.test(userAgent)) {
      if (isInAppBrowser()) {
        // Attempt to open in Chrome using intent
        window.location.href = "intent://" + window.location.href.replace(/^https?:\/\//, '') + "#Intent;scheme=https;package=com.android.chrome;end;";
        setTimeout(() => {
         // If no browser is found, redirect to the Play Store to install Chrome
         window.location.href = "https://play.google.com/store/apps/details?id=com.android.chrome";
       }, 500);
      }
    } 
    // Check if the user is on iOS
    else if (/iPad|iPhone|iPod/.test(userAgent)) {
      if (isInAppBrowser()) {
        // Attempt to open in Safari
        window.location.href = window.location.href;
      }
    }
  }, []);
};

const RedirectWrapper = () => {
   useRedirectToChrome();
   return null;
 };

export default RedirectWrapper;