/**
 * CONFIGURATION BRIDGE
 * 
 * This file pulls directly from `config.js` in your root folder and injects
 * environment variables if present.
 * 
 * To edit names, messages, dialogue, or scroll speed, open `config.js` in the root!
 */

import { CONFIG as rawConfig } from '../config.js';

export interface BirthdayConfig {
  CORRECT_NAMES: string[];
  FRIEND_DISPLAY_NAME: string;
  CREATOR_NAME: string;
  LANDING_TAGLINE: string;
  WRONG_ANSWER_LINES: string[];
  CHARACTER_DIALOGUE: {
    boyName: string;
    girlName: string;
    introGreeting: string;
    introFollowUp: string;
    noReaction: string;
    noButtonMorphText: string;
    yesReaction: string;
  };
  BIRTHDAY_MESSAGE: string[];
  SCROLL_SPEED: number;
  EMAIL: {
    SERVICE_ID: string;
    TEMPLATE_ID: string;
    PUBLIC_KEY: string;
    FORMSPREE_ENDPOINT?: string;
    RECIPIENT_EMAIL: string;
  };
}

export const CONFIG: BirthdayConfig = {
  ...rawConfig,
  EMAIL: {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || rawConfig.EMAIL?.SERVICE_ID || '',
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || rawConfig.EMAIL?.TEMPLATE_ID || '',
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || rawConfig.EMAIL?.PUBLIC_KEY || '',
    FORMSPREE_ENDPOINT: import.meta.env.VITE_FORMSPREE_ENDPOINT || rawConfig.EMAIL?.FORMSPREE_ENDPOINT || '',
    RECIPIENT_EMAIL: rawConfig.EMAIL?.RECIPIENT_EMAIL || 'lekanseyibolade@gmail.com',
  },
};

export default CONFIG;
