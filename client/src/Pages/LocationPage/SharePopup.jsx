import React from 'react';
import { X, Facebook, Twitter, Clipboard, Check } from 'lucide-react';

const SharePopup = ({ showShare, setShowShare, handleShare, copied, setCopied, locationData }) => {
    if (!showShare) return null;
    const shareText = `Check out ${locationData.name}! Located near ${locationData.station}.`;

   
    return (
        <div className="fixed inset-1 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 relative">
                <button
                    onClick={() => setShowShare(false)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>
                <h3 className="text-xl font-bold mb-4">Share this location</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => handleShare('facebook')}
                        className="flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        <Facebook size={20} />
                        Facebook
                    </button>
                    <button
                        onClick={() => handleShare('twitter')}
                        className="flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500"
                    >
                        <Twitter size={20} />
                        Twitter
                    </button>
                    <button
                        onClick={() => handleShare('whatsapp')}
                        className="flex items-center justify-center gap-2 p-2 rounded-lg bg-green-400 text-white hover:bg-green-500"
                    >
                       
                        WhatsApp
                    </button>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(shareText);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        }}
                        className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 col-span-2"
                    >
                        {copied ? <><Check size={20} /> Copied!</> : <><Clipboard size={20} /> Copy Link</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SharePopup;
