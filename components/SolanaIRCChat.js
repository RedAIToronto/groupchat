// components/SolanaIRCChat.js
import React, { useState, useEffect, useRef } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import confetti from 'canvas-confetti';
import io from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAudio } from '../hooks';

const emojis = ['🚀', '💎', '🌙', '🦍', '🍌', '🤑', '💰', '🔥', '🎰', '🏆', '💯', '🌈', '🍻', '🧠', '🚨'];
const ranks = ['Noob', 'Pleb', 'Degen', 'Ape', 'Diamond Hands', 'Whale', 'Satoshi'];

const GC_TOKEN_ADDRESS = new PublicKey('12aVGio5EgK92Ff4SRwY73L1H4ohrhxDxZo8KpJagNUT');

const getRandomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

const getTokenRank = (balance) => {
    if (balance >= 10000000) return 'WHALE 🐳';
    if (balance >= 1000000) return 'CHAD 💪';
    if (balance >= 100000) return 'HOLDER 💎';
    if (balance >= 10000) return 'BELIEVER 🙏';
    if (balance >= 1000) return 'CURIOUS 🧐';
    return 'NEWCOMER 🐣';
};

const SolanaIRCChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [balance, setBalance] = useState(null);
    const [gcBalance, setGcBalance] = useState(null);
    const [isLoadingBalance, setIsLoadingBalance] = useState(false);
    const [degenMode, setDegenMode] = useState(false);
    const [userRank, setUserRank] = useState('Noob');
    const [tokenRank, setTokenRank] = useState('NEWCOMER 🐣');
    const [giftAmount, setGiftAmount] = useState(0.01);
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const socketRef = useRef();
    const messagesEndRef = useRef(null);
    const [userColor] = useState(getRandomColor());
    const xpSounds = useAudio();

    useEffect(() => {
        socketRef.current = io();

        socketRef.current.on('receive-message', (msg) => {
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages, msg];
                localStorage.setItem('chatMessages', JSON.stringify(newMessages));
                return newMessages;
            });
            xpSounds.notify && xpSounds.notify.play();
        });

        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }

        xpSounds.startup && xpSounds.startup.play();

        return () => {
            socketRef.current.disconnect();
        };
    }, [xpSounds]);

    useEffect(() => {
        if (publicKey) {
            updateBalance();
        }
    }, [publicKey, connection]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const updateBalance = async () => {
        if (publicKey) {
            setIsLoadingBalance(true);
            try {
                const balance = await connection.getBalance(publicKey);
                const solBalance = balance / LAMPORTS_PER_SOL;
                setBalance(solBalance);
                updateRank(solBalance);

                // Fetch GC token balance
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
            } catch (error) {
                console.error("Error fetching balance:", error);
                setBalance(null);
                setGcBalance(null);
                xpSounds.error && xpSounds.error.play();
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
        if (inputMessage.trim() !== '') {
            const newMessage = {
                sender: publicKey ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : 'Anon Pleb',
                content: degenMode ? addEmojis(inputMessage) : inputMessage,
                timestamp: new Date().toISOString(),
                color: userColor,
                rank: userRank,
                tokenRank: tokenRank,
            };
            socketRef.current.emit('send-message', newMessage);
            setInputMessage('');
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
        if (!publicKey) return;
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey('11111111111111111111111111111111'), // Replace with actual recipient
                    lamports: giftAmount * LAMPORTS_PER_SOL,
                })
            );
            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'confirmed');
            updateBalance();
            triggerConfetti();
            toast.success('Gift sent successfully! You absolute degen! 🎁🚀', {
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
            xpSounds.error && xpSounds.error.play();
            toast.error('Gift failed to send. Did you paper hand? 📄🙌', {
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

    return (
        <div className="flex flex-col h-screen bg-[#3A6EA5] overflow-hidden">
            {/* Windows XP Taskbar */}
            <div className="bg-gradient-to-r from-[#245EDC] to-[#3A6EA5] p-1 flex justify-between items-center">
                <button
                    onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
                    className="flex items-center bg-green-500 text-white px-2 py-1 rounded-sm hover:bg-green-600 focus:outline-none"
                >
                    <span className="mr-1">🪟</span> Start
                </button>
                <div className="flex items-center bg-[#0C3F8E] text-white px-2 py-1 rounded-sm">
                    {new Date().toLocaleTimeString()}
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
                        <div className="bg-white border-2 border-[#919B9C] p-4 h-[50vh] overflow-y-auto rounded-lg mb-4">
                            {messages.map((msg, index) => (
                                <div key={index} className="mb-2 p-2 bg-[#ECE9D8] rounded-lg">
                  <span className="font-bold" style={{ color: msg.color }}>
                    [{msg.rank}] [{msg.tokenRank}] {msg.sender}:
                  </span>
                                    <span className="ml-2">{msg.content}</span>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={sendMessage} className="flex flex-col">
                            <div className="flex mb-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    className="flex-grow p-2 border-2 border-[#919B9C] rounded-l-lg focus:outline-none focus:border-[#0055EA]"
                                    placeholder="Type your degen thoughts..."
                                />
                                <button type="submit" className="bg-[#ECE9D8] border-2 border-[#919B9C] border-l-0 text-black p-2 rounded-r-lg hover:bg-[#D1D1D1]">
                                    Send 🚀
                                </button>
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
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        value={giftAmount}
                                        onChange={(e) => setGiftAmount(parseFloat(e.target.value))}
                                        className="w-20 p-1 mr-2 border-2 border-[#919B9C] rounded"
                                        step="0.01"
                                        min="0.01"
                                    />
                                    <button
                                        onClick={sendGift}
                                        className="bg-[#ECE9D8] border-2 border-[#919B9C] text-black p-1 rounded hover:bg-[#D1D1D1]"
                                        disabled={!publicKey}
                                    >
                                        Gift SOL 🎁
                                    </button>
                                </div>
                                <button
                                    onClick={updateBalance}
                                    className="bg-[#ECE9D8] border-2 border-[#919B9C] text-black p-1 rounded hover:bg-[#D1D1D1]"
                                    disabled={isLoadingBalance}
                                >
                                    {isLoadingBalance ? "Refreshing..." : "Refresh Balance 💰"}
                                </button>
                            </div>
                        </form>

                        {/* Wallet and Balance */}
                        <div className="mt-4 flex justify-between items-center">
                            <WalletMultiButton className="!bg-[#ECE9D8] !border-2 !border-[#919B9C] !text-black !p-2 !rounded !hover:bg-[#D1D1D1]" />
                            <div>
                <span className="mr-2">
                  SOL: {isLoadingBalance ? "Loading..." : balance !== null ? `${balance.toFixed(2)} SOL` : "N/A"}
                </span>
                                <span className="mr-2">
                  $GC: {isLoadingBalance ? "Loading..." : gcBalance !== null ? `${gcBalance.toFixed(2)} GC` : "N/A"}
                </span>
                                <span>Rank: {userRank} {userRank === 'Whale' ? '🐳' : userRank === 'Diamond Hands' ? '💎🙌' : '🚀'}</span>
                                <span className="ml-2">Token Rank: {tokenRank}</span>
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
                        <button className="w-full text-left py-1 px-2 hover:bg-[#ECE9D8]" onClick={() => {
                            toast.info('Diamond hands activated! 💎🙌', { autoClose: 2000 });
                            setIsStartMenuOpen(false);
                        }}>
                            HODL
                        </button>
                        <button className="w-full text-left py-1 px-2 hover:bg-[#ECE9D8]" onClick={() => {
                            toast.warning('Paper hands detected! Shame! 📄🙌', { autoClose: 2000 });
                            setIsStartMenuOpen(false);
                        }}>
                            Sell (Paper Hands)
                        </button>
                        <button className="w-full text-left py-1 px-2 hover:bg-[#ECE9D8]" onClick={() => {
                            toast.success('To the moon! 🚀🌕', { autoClose: 2000 });
                            setIsStartMenuOpen(false);
                        }}>
                            Moon
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default SolanaIRCChat;