/**
 * QUICK EDIT CONFIG FILE
 * 
 * You can edit this file or `src/config.ts` to customize:
 * - Friend's name & accepted nicknames
 * - Creator's name
 * - Dialogue lines
 * - Birthday message paragraphs
 * - Scroll speed
 */

export const CONFIG = {
  CORRECT_NAMES: [
    'ayobami',
    'ayo',
    'bami',
    'ayobami mi',
    'ay',
    'bams',
    'ayomi',
    'ayomide',
    'baby girl',
    'bestie',
  ],

  FRIEND_DISPLAY_NAME: 'Ayobami',
  CREATOR_NAME: 'Olalekan',

  LANDING_TAGLINE: 'Olalekan crafted an interactive story just for you 💌',

  WRONG_ANSWER_LINES: [
    "Ah ah, that's not the name o! Try again 😄",
    "Ehn ehn? Which kind stranger be this? Check your spelling joor! 😂",
    "No be so o! Use the exact nickname the creator calls you! 😉",
    "Oya re-strategize! You know the real name, don't do like this 🙈",
    "Chai! Dem send you come spy? Try again my friend! 🤣",
    "Lai lai! Think carefully: what does your person call you? 🧐",
  ],

  CHARACTER_DIALOGUE: {
    boyName: 'Olalekan',
    girlName: 'Oluwaseyi',
    introGreeting: 'Heyyy {name}! 🎉 Welcome ooo!',
    introFollowUp: 'You ready to read this top-secret birthday message we brought all the way from another realm?',
    noReaction: "NO oooo! You no get choice but to read am after all the creator's stress! 😭💔",
    noButtonMorphText: 'Okay fine, let’s go! 😅',
    yesReaction: 'Get in jhor! 🔥 Oya open wide your eyes, here it comes!',
  },

  BIRTHDAY_MESSAGE: [
    'Oremi atata, my person, my sister, and my rare gem 💎',
    'You see, having you in my corner is one of the greatest blessings God has quietly handed to me. Sometimes I sit back, replay our journey, and wonder what I did to deserve a soul as sweet, loving, and intentional as yours.',
    'You are a rare breed, my friend. In a world where genuine love and true loyalty are hard to find, you show up every single day and make being loved look so effortless. Without you, so many seasons would have broken me completely, but you made heavy burdens feel light. The way you carry my matter on your head ehn, sometimes I ask myself if you even remember you are human too. Your heart is pure gold, unfiltered and soft.',
    'From just being a friend, to being my gist partner, to being my safe haven, to becoming a sister, thank you. Look at us today! Kaiiii, who would have thought we would become this inseparable?',
    'Let’s even talk about your patience and the way you listen. You are always there listening to my endless complaints, my useless drama, my overthinking, and my silly laughters. I know I might not also be the best person who shares everything but for it all, I am really grateful.',
    'You never get tired of hearing me out, and of course, even if you want to be tired, you cannot be tired of me sha 😂.',
    'And your care? Ahhh, why should I ever forget your care! When life gets overwhelming and I withdraw into my shell, you are always the one pulling me back into the light.',
    'Thank you for the endless check-ins that always come right on time.',
    'Thank you for the warm hugs that feel like home.',
    'Thank you for feeding me both physically and spiritually.',
    'Thank you for those late-night conversations where we talk about everything and nothing at all.',
    'Thank you for the unsolicited sound advice and words of wisdom.',
    'Thank you for the insults disguised as love and the endless laughter that makes my stomach ache.',
    'Thank you for the prayers and the daily prayers to my hand over.',
    'Thank you for service days.',
    'Thank you for showing me what genuine sisterhood feels like.',
    'You love so selflessly, without hidden motives, without expectations, and with so much grace. You make room for me even when you are dealing with your own stuff. That kind of selflessness is not common at all.',
    'Beyond the things you do, it is your person that I adore the most. Your warmth, your quiet strength, your humor, your infectious smile, and that beautiful aura you carry everywhere you go. Being around you is pure peace of mind.',
    'My heart is saying far more than my fingers can type right now, but I know heaven hears every silent thanksgiving I offer on your behalf.',
    'Ayobami,',
    'When Scripture says, "There is a friend who sticks closer than a sister," it is your face that comes to mind. You have stepped far past the title of a friend; you are family to me now.',
    'I do not take your presence in my life for granted, not for a second. Having you in my corner is a breath of fresh air.',
    'My sincere prayer for you today and always is that the Lord will honor your kind heart. Because you have poured so much love, peace, and comfort into others, your own well will never run dry.',
    'May God surround you with people who will fight for you, defend you, and love you just as fiercely as you do for those around you.',
    'You will never walk alone.',
    'Whenever you call on one, thousands will rise to stand with you and help you.',
    'You will never be stranded in life, you will never be confused, and you will never miss your appointed time.',
    'Every closed door before you will swing wide open by mercy.',
    'May the peace of God, which surpasses human understanding, guard your heart and mind continuously. Where others struggle, you will glide by grace. Your life will continually reflect the beauty, kindness, and goodness of God.',
    'Thank you for being genuine. Thank you for choosing to walk this road with me. Thank you for being the sweetest, most dependable friend anyone could ever ask for.',
    'I love and cherish you deeply, mi love. Always and forever. 🫂❤️',
    'THANKS FOR FRIENDSHIP',
  ],

  SCROLL_SPEED: 36, // pixels per second

  EMAIL: {
    // Option 1: EmailJS keys (read from .env or entered here)
    SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID',
    TEMPLATE_ID: 'YOUR_EMAILJS_TEMPLATE_ID',
    PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',

    // Option 2: Formspree (alternative simplest setup - just paste your form endpoint URL!)
    FORMSPREE_ENDPOINT: 'https://formspree.io/f/mkjjdoav',

    // Your receiving email address
    RECIPIENT_EMAIL: 'lekanseyibolade@gmail.com',
  },
};

