'use client'; // Add this line to mark this as a client-side component

import { useState } from 'react'; // Now you can safely use useState
import Image from 'next/image';

export default function Home() {
  const [wallet, setWalletAddress] = useState(''); // State for wallet address
  const [collection, setCollectionAddress] = useState(''); // State for collection address
  const [nfts, setNfts] = useState([]); // State to store NFTs
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const fetchNFTs = async () => {
    if (!collection) {
      setError('Please enter both wallet address and collection address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const baseUrl = 'https://mainnet.infura.io/v3/1fbfb41663cb4efe83ddcd36082586d0';
      const data = {
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            to: collection,
            data: "0x8da5cb5b"
          }
        ],
        id: 1
      };

      const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch NFTs');
      }

      const jsonData = await res.json();
      console.log(jsonData);

      const nftIds = jsonData.result; // Assumes result contains the NFT IDs
      setNfts(nftIds);
    } catch (error) {
      setError('Error fetching NFTs: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <input
          onChange={(e) => setWalletAddress(e.target.value)}
          type="text"
          placeholder="add your wallet address"
        />
        <input
          onChange={(e) => setCollectionAddress(e.target.value)}
          type="text"
          placeholder="add the collection address"
        />
        <label>
          <input type="checkbox" />
        </label>
        <button
          onClick={fetchNFTs}
        >
          {`let's go`}
        </button>

        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {nfts.length > 0 && (
          <div>
            <h3>Your NFTs:</h3>
            <ul>
              {nfts.map((nft, index) => (
                <li key={index}>{nft}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
