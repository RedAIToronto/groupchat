import { PublicKey } from '@solana/web3.js';

export const badges = [
    {
        id: 'early-adopter',
        name: 'Early Adopter',
        description: 'Joined during the first month of launch',
        icon: '🌟',
    },
    {
        id: 'gc-holder',
        name: 'GC Holder',
        description: 'Holds GC tokens',
        icon: '💎',
    },
    {
        id: 'chat-enthusiast',
        name: 'Chat Enthusiast',
        description: 'Sent over 100 messages',
        icon: '💬',
    },
];

export const achievements = [
    {
        id: 'sol-whale',
        name: 'SOL Whale',
        description: 'Hold over 1000 SOL',
        icon: '🐳',
        condition: (data) => data.balance >= 1000,
    },
    {
        id: 'gc-millionaire',
        name: 'GC Millionaire',
        description: 'Hold over 1,000,000 GC',
        icon: '💰',
        condition: (data) => data.gcBalance >= 1000000,
    },
    {
        id: 'generous-gifter',
        name: 'Generous Gifter',
        description: 'Sent over 10 gifts',
        icon: '🎁',
        condition: (data) => data.giftsSent >= 10,
    },
    {
        id: 'diamond-hands',
        name: 'Diamond Hands',
        description: 'Held GC for over 30 days',
        icon: '💎🙌',
        condition: (data) => {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return data.joinDate <= thirtyDaysAgo && data.gcBalance > 0;
        },
    },
    {
        id: 'chat-master',
        name: 'Chat Master',
        description: 'Sent over 1000 messages',
        icon: '🎭',
        condition: (data) => data.messageCount >= 1000,
    },
];

export const getUserBadges = (userData) => {
    return badges.filter(badge => {
        switch (badge.id) {
            case 'early-adopter':
                const launchDate = new Date('2023-06-01'); // Replace with actual launch date
                return userData.joinDate <= launchDate;
            case 'gc-holder':
                return userData.gcBalance > 0;
            case 'chat-enthusiast':
                return userData.messageCount > 100;
            default:
                return false;
        }
    });
};

export const getUserAchievements = (userData) => {
    return achievements.filter(achievement => achievement.condition(userData));
};