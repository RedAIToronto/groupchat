import React, { useState, useEffect, useRef } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token';
import confetti from 'canvas-confetti';
import io from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SendIcon, Gift, Volume2, VolumeX, Copy, ExternalLink, Rocket, PartyPopper } from 'lucide-react'
import { badges, achievements, getUserBadges, getUserAchievements } from '@/utils/badges';

const emojis = ['🚀', '💎', '🌙', '🦍', '🍌', '🤑', '💰', '🔥', '🎰', '🏆', '💯', '🌈', '🍻', '🧠', '🚨'];
const ranks = ['Noob', 'Pleb', 'Degen', 'Ape', 'Diamond Hands', 'Whale', 'Satoshi'];

const GC_TOKEN_ADDRESS = new PublicKey('3HRM8uVQjb8fpmy51bdXYpNa1uknaEFcm3JbfezVpump');

const getRandomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

const getTokenRank = (balance) => {
    if (balance >= 10000000) return 'WHALE 🐳';
    if (balance >= 1000000) return 'CHAD 💪';
    if (balance >= 100000) return 'HOLDER 💎';
    if (balance >= 10000) return 'BELIEVER 🙏';
    if (balance >= 1000) return 'CURIOUS 🧐';
    return 'NEWCOMER 🐣';
};

const useAudio = () => {
    const [audio, setAudio] = useState({
        error: null,
        notify: null,
        startup: null,
        gift: null,
    });

    useEffect(() => {
        setAudio({
            error: new Audio('/sounds/xp_error.mp3'),
            notify: new Audio('/sounds/xp_notify.mp3'),
            startup: new Audio('/sounds/xp_startup.mp3'),
            gift: new Audio('/sounds/gift.mp3'),
        });
    }, []);

    return audio;
};

export default function SolanaIRCChat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [balance, setBalance] = useState(null);
    const [gcBalance, setGcBalance] = useState(null);
    const [isLoadingBalance, setIsLoadingBalance] = useState(false);
    const [degenMode, setDegenMode] = useState(false);
    const [userRank, setUserRank] = useState('Noob');
    const [tokenRank, setTokenRank] = useState('NEWCOMER 🐣');
    const [giftAmount, setGiftAmount] = useState(0.01);
    const [giftRecipient, setGiftRecipient] = useState('');
    const [giftType, setGiftType] = useState('SOL');
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [userBadges, setUserBadges] = useState([]);
    const [userAchievements, setUserAchievements] = useState([]);
    const [messageCount, setMessageCount] = useState(0);
    const [giftsSent, setGiftsSent] = useState(0);
    const [joinDate] = useState(new Date());
    const [isConnected, setIsConnected] = useState(false);
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [userColor] = useState(getRandomColor());
    const xpSounds = useAudio();

    useEffect(() => {
        const initSocket = async () => {
            await fetch('/api/socket');
            if (!socketRef.current) {
                socketRef.current = io({
                    path: '/api/socket',
                });

                socketRef.current.on('connect', () => {
                    console.log('Connected to server');
                    setIsConnected(true);
                });

                socketRef.current.on('receive-message', (msg) => {
                    setMessages((prevMessages) => {
                        const newMessages = [...prevMessages, msg];
                        localStorage.setItem('chatMessages', JSON.stringify(newMessages));
                        return newMessages;
                    });
                    if (isSoundOn && xpSounds.notify) xpSounds.notify.play();
                });

                socketRef.current.on('chat-history', (history) => {
                    setMessages(history);
                });

                socketRef.current.on('connect_error', (err) => {
                    console.log('Connection error:', err);
                    toast.error('Failed to connect to chat server. Please try again later.');
                });
            }
        };

        initSocket();

        if (isSoundOn && xpSounds.startup) xpSounds.startup.play();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [isSoundOn, xpSounds]);

    useEffect(() => {
        if (publicKey && isConnected) {
            const welcomeMessage = {
                sender: 'System',
                content: `Welcome, ${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}! 🎉`,
                timestamp: new Date().toISOString(),
                color: '#00ff00',
                rank: 'System',
                tokenRank: 'System',
                fullAddress: 'System',
                gcBalance: null,
                badges: [],
                achievements: [],
            };
            socketRef.current.emit('send-message', welcomeMessage);
            updateBalance();
        }
    }, [publicKey, isConnected]);

    useEffect(() => {
        if (publicKey) {
            updateBalance();
        }
    }, [publicKey, connection]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (publicKey) {
            const userData = {
                publicKey,
                balance: balance || 0,
                gcBalance: gcBalance || 0,
                messageCount,
                giftsSent,
                joinDate,
            };
            setUserBadges(getUserBadges(userData));
            setUserAchievements(getUserAchievements(userData));
        }
    }, [publicKey, balance, gcBalance, messageCount, giftsSent]);

    const updateBalance = async () => {
        if (publicKey) {
            setIsLoadingBalance(true);
            try {
                const balance = await connection.getBalance(publicKey);
                const solBalance = balance / LAMPORTS_PER_SOL;
                setBalance(solBalance);
                updateRank(solBalance);

                const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID });
                const gcAccount = tokenAccounts.value.find(account => account.account.data.parsed.info.mint === GC_TOKEN_ADDRESS.toBase58());

                if (gcAccount) {
                    const gcBalance = gcAccount.account.data.parsed.info.tokenAmount.uiAmount;
                    setGcBalance(gcBalance);
                    setTokenRank(getTokenRank(gcBalance));
                } else {
                    setGcBalance(0);
                    setTokenRank('NEWCOMER 🐣');
                }

                // After updating balance, send a join message
                if (socketRef.current) {
                    socketRef.current.emit('wallet-connected', {
                        address: publicKey.toBase58(),
                        solBalance: solBalance,
                        gcBalance: gcBalance || 0,
                    });
                }
            } catch (error) {
                console.error("Error fetching balance:", error);
                setBalance(null);
                setGcBalance(null);
                if (isSoundOn && xpSounds.error) xpSounds.error.play();
                toast.error('Failed to fetch balance. Network error?', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } finally {
                setIsLoadingBalance(false);
            }
        } else {
            setBalance(null);
            setGcBalance(null);
        }
    };

    const updateRank = (balance) => {
        if (balance > 1000) setUserRank(ranks[6]);
        else if (balance > 100) setUserRank(ranks[5]);
        else if (balance > 50) setUserRank(ranks[4]);
        else if (balance > 10) setUserRank(ranks[3]);
        else if (balance > 5) setUserRank(ranks[2]);
        else if (balance > 1) setUserRank(ranks[1]);
        else setUserRank(ranks[0]);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() !== '' && publicKey && socketRef.current) {
            const newMessage = {
                sender: `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`,
                content: degenMode ? addEmojis(inputMessage) : inputMessage,
                timestamp: new Date().toISOString(),
                color: userColor,
                rank: userRank,
                tokenRank: tokenRank,
                fullAddress: publicKey.toBase58(),
                gcBalance: gcBalance,
                badges: userBadges,
                achievements: userAchievements,
            };
            socketRef.current.emit('send-message', newMessage);
            setInputMessage('');
            setMessageCount(prevCount => prevCount + 1);
            if (degenMode) triggerConfetti();
        }
    };

    const addEmojis = (message) => {
        const emojiCount = Math.floor(Math.random() * 5) + 1;
        return message + ' ' + Array(emojiCount).fill().map(() => emojis[Math.floor(Math.random() * emojis.length)]).join('');
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    const sendGift = async () => {
        if (!publicKey || !giftRecipient) return;
        try {
            let transaction = new Transaction();
            const recipientPubkey = new PublicKey(giftRecipient);

            if (giftType === 'SOL') {
                transaction.add(
                    SystemProgram.transfer({
                        fromPubkey: publicKey,
                        toPubkey: recipientPubkey,
                        lamports: giftAmount * LAMPORTS_PER_SOL,
                    })
                );
            } else if (giftType === 'GC') {
                const fromTokenAccount = await getAssociatedTokenAddress(GC_TOKEN_ADDRESS, publicKey);
                const toTokenAccount = await getAssociatedTokenAddress(GC_TOKEN_ADDRESS, recipientPubkey);

                transaction.add(
                    createTransferInstruction(
                        fromTokenAccount,
                        toTokenAccount,
                        publicKey,
                        giftAmount * Math.pow(10, 9) // Assuming GC has 9 decimals
                    )
                );
            }

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'confirmed');
            updateBalance();
            triggerConfetti();
            setGiftsSent(prevCount => prevCount + 1);
            if (isSoundOn && xpSounds.gift) xpSounds.gift.play();
            toast.success(`Gift of ${giftAmount} ${giftType} sent to ${giftRecipient.slice(0, 4)}...${giftRecipient.slice(-4)}!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Error sending gift:", error);
            if (isSoundOn && xpSounds.error) xpSounds.error.play();
            toast.error(`Gift failed to send. Check the recipient address and try again.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Address copied to clipboard!', { autoClose: 2000 });
    };

    return (
        <div className="flex flex-col h-screen bg-[#3A6EA5] overflow-hidden">
            {/* Windows XP Taskbar */}
            <div className="bg-gradient-to-r from-[#245EDC] to-[#3A6EA5] p-1 flex justify-between items-center">
                <Button
                    onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
                    className="flex items-center bg-green-500 text-white px-2 py-1 rounded-sm hover:bg-green-600 focus:outline-none"
                >
                    <span className="mr-1">🪟</span> Start
                </Button>
                <div className="flex items-center space-x-2">
                    <Button
                        onClick={() => setIsSoundOn(!isSoundOn)}
                        className="bg-blue-800 text-white p-2 rounded-sm hover:bg-blue-900"
                    >
                        {isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </Button>
                    <div className="bg-blue-800 text-white px-2 py-1 rounded-sm">
                        {new Date().toLocaleTimeString()}
                    </div>
                </div>
            </div>

            {/* Windows XP Desktop */}
            <div className="flex-grow p-4 bg-[url('/images/xp_wallpaper.jpg')] bg-cover bg-center">
                {/* Chat Window */}
                <div className="bg-white rounded-t-lg shadow-lg max-w-4xl mx-auto">
                    {/* Title Bar */}
                    <div className="bg-gradient-to-r from-[#0A246A] via-[#3A6EA5] to-[#0A246A] p-1 rounded-t-lg flex justify-between items-center">
                        <h1 className="text-xl font-bold text-white px-2">Solana Degen Chat XP 🚀💎🙌</h1>
                        <div className="flex">
                            <button className="w-6 h-6 bg-[#C2CEDF] text-black font-bold rounded-sm mx-1">_</button>
                            <button className="w-6 h-6 bg-[#C2CEDF] text-black font-bold rounded-sm mx-1">□</button>
                            <button className="w-6 h-6 bg-[#C13535] text-white font-bold rounded-sm mx-1">X</button>
                        </div>
                    </div>

                    {/* Chat Content */}
                    <div className="p-4">
                        <ScrollArea className="h-[50vh] mb-4 p-2 border rounded-md">
                            {messages.map((msg, index) => (
                                <div key={index} className="mb-2 p-2 bg-[#ECE9D8] rounded-lg">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <span
                                                className="font-bold cursor-pointer transition-colors duration-200 hover:text-blue-600"
                                                style={{ color: msg.color }}
                                            >
                                                [{msg.rank}] [{msg.tokenRank}] {msg.sender}:
                                            </span>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-96 p-4">
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium text-lg leading-none">User Info</h4>
                                                    <div className="text-sm">
                                                        <p><strong>Address:</strong> <span className="font-mono break-all">{msg.fullAddress}</span></p>
                                                        <p><strong>SOL Rank:</strong> {msg.rank}</p>
                                                        <p><strong>GC Rank:</strong> {msg.tokenRank}</p>
                                                        <p><strong>GC Balance:</strong> {msg.gcBalance !== undefined && msg.gcBalance !== null ? `${msg.gcBalance.toFixed(2)} GC` : "N/A"}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <h4 className="font-medium text-lg leading-none">Badges</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {msg.badges && msg.badges.map((badge) => (
                                                            <span key={badge.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                                                {badge.icon} {badge.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <h4 className="font-medium text-lg leading-none">Achievements</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {msg.achievements && msg.achievements.map((achievement) => (
                                                            <span key={achievement.id} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                                                {achievement.icon} {achievement.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Button onClick={() => copyToClipboard(msg.fullAddress)} size="sm" variant="outline">
                                                        <Copy className="w-4 h-4 mr-2" />
                                                        Copy Address
                                                    </Button>
                                                    <Button onClick={() => window.open(`https://solscan.io/account/${msg.fullAddress}`, '_blank')} size="sm" variant="outline">
                                                        <ExternalLink className="w-4 h-4 mr-2" />
                                                        View on Solscan
                                                    </Button>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <span className="ml-2">{msg.content}</span>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </ScrollArea>

                        {/* Input Area */}
                        <form onSubmit={sendMessage} className="flex flex-col space-y-2">
                            <div className="flex space-x-2">
                                <Input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    className="flex-grow"
                                    placeholder="Type your degen thoughts..."
                                />
                                <Button type="submit" className="bg-[#ECE9D8] border-2 border-[#919B9C] text-black hover:bg-[#D1D1D1]">
                                    <SendIcon className="w-4 h-4 mr-2" />
                                    Send
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={degenMode}
                                        onChange={() => setDegenMode(!degenMode)}
                                        className="mr-2"
                                    />
                                    <span>Degen Mode 🦍</span>
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button className="bg-[#ECE9D8] border-2 border-[#919B9C] text-black hover:bg-[#D1D1D1]">
                                            <Gift className="w-4 h-4 mr-2" />
                                            Gift
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <Tabs defaultValue="SOL">
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="SOL">Gift SOL</TabsTrigger>
                                                <TabsTrigger value="GC">Gift GC</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="SOL">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Gift SOL</h4>
                                                    <p className="text-sm text-muted-foreground">Send SOL to another wallet</p>
                                                    <Input
                                                        id="sol-recipient"
                                                        placeholder="Recipient address"
                                                        value={giftRecipient}
                                                        onChange={(e) => setGiftRecipient(e.target.value)}
                                                    />
                                                    <Input
                                                        id="sol-amount"
                                                        type="number"
                                                        placeholder="Amount (SOL)"
                                                        value={giftAmount}
                                                        onChange={(e) => setGiftAmount(parseFloat(e.target.value))}
                                                        step="0.01"
                                                        min="0.01"
                                                    />
                                                    <Button onClick={() => { setGiftType('SOL'); sendGift(); }} disabled={!publicKey || !giftRecipient}>
                                                        Send SOL Gift
                                                    </Button>
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="GC">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Gift GC</h4>
                                                    <p className="text-sm text-muted-foreground">Send GC to another wallet</p>
                                                    <Input
                                                        id="gc-recipient"
                                                        placeholder="Recipient address"
                                                        value={giftRecipient}
                                                        onChange={(e) => setGiftRecipient(e.target.value)}
                                                    />
                                                    <Input
                                                        id="gc-amount"
                                                        type="number"
                                                        placeholder="Amount (GC)"
                                                        value={giftAmount}
                                                        onChange={(e) => setGiftAmount(parseFloat(e.target.value))}
                                                        step="0.01"
                                                        min="0.01"
                                                    />
                                                    <Button onClick={() => { setGiftType('GC'); sendGift(); }} disabled={!publicKey || !giftRecipient}>
                                                        Send GC Gift
                                                    </Button>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </PopoverContent>
                                </Popover>
                                <Button
                                    onClick={updateBalance}
                                    className="bg-[#ECE9D8] border-2 border-[#919B9C] text-black hover:bg-[#D1D1D1]"
                                    disabled={isLoadingBalance}
                                >
                                    {isLoadingBalance ? "Refreshing..." : "Refresh Balance 💰"}
                                </Button>
                            </div>
                        </form>

                        {/* Wallet and Balance */}
                        <div className="mt-4 flex justify-between items-center">
                            <WalletMultiButton className="!bg-[#ECE9D8] !border-2 !border-[#919B9C] !text-black !p-2 !rounded !hover:bg-[#D1D1D1]" />
                            {publicKey && (
                                <div className="text-sm">
                                    <span className="mr-2">
                                        SOL: {isLoadingBalance ? "Loading..." : balance !== null ? `${balance.toFixed(2)} SOL` : "N/A"}
                                    </span>
                                    <span className="mr-2">
                                        $GC: {isLoadingBalance ? "Loading..." : gcBalance !== null ? `${gcBalance.toFixed(2)} GC` : "N/A"}
                                    </span>
                                    <span>Rank: {userRank} {userRank === 'Whale' ? '🐳' : userRank === 'Diamond Hands' ? '💎🙌' : '🚀'}</span>
                                    <span className="ml-2">Token Rank: {tokenRank}</span>
                                </div>
                            )}
                        </div>

                        {/* Badges and Achievements */}
                        <div className="mt-4 p-2 bg-[#ECE9D8] rounded-lg">
                            <h3 className="text-lg font-bold mb-2">Your Badges and Achievements</h3>
                            <div className="flex flex-wrap gap-2">
                                {userBadges && userBadges.map((badge) => (
                                    <span key={badge.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                        {badge.icon} {badge.name}
                                    </span>
                                ))}
                                {userAchievements && userAchievements.map((achievement) => (
                                    <span key={achievement.id} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                        {achievement.icon} {achievement.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Windows XP Start Menu */}
            {isStartMenuOpen && (
                <div className="absolute bottom-8 left-0 w-64 bg-[#3A6EA5] border-2 border-[#0C3F8E] rounded-tr-lg shadow-lg">
                    <div className="bg-gradient-to-b from-[#3A6EA5] to-[#0C3F8E] p-2">
                        <span className="text-white font-bold">Degen XP</span>
                    </div>
                    <div className="bg-white p-2">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => {
                            toast.info('Diamond hands activated! 💎🙌', { autoClose: 2000 });
                            setIsStartMenuOpen(false);
                        }}>
                            <Rocket className="w-4 h-4 mr-2" />
                            HODL
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => {
                            toast.warning('Paper hands detected! Shame! 📄🙌', { autoClose: 2000 });
                            setIsStartMenuOpen(false);
                        }}>
                            <PartyPopper className="w-4 h-4 mr-2" />
                            Sell (Paper Hands)
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => {
                            toast.success('To the moon! 🚀🌕', { autoClose: 2000 });
                            triggerConfetti();
                            setIsStartMenuOpen(false);
                        }}>
                            <Rocket className="w-4 h-4 mr-2" />
                            Moon
                        </Button>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}