import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { getContractReadOnly, getContractWrite } from '../utils';

export const UserContext = React.createContext();

const { ethereum } = window;

export const UserProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState('');
	const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [tweets, setTweets] = useState([]);

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (accounts.length > 0) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log('NO accoutns found');
			}
			console.log(accounts);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const connectWallet = async () => {
		try {
			console.log('Connetct called ');
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			console.log(accounts);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const getUser = async () => {
		const contract = getContractReadOnly();
		const user = await contract.getUser(currentAccount);
		setCurrentUser(user);
		return user;
	};

	const createUser = async (username, name, avatar) => {
		const contract = getContractWrite();
		const tx = await contract.signup(username, name, avatar);
		await tx.wait();
		getUser();
	};

	const getAllTweet = async () => {
		const contract = getContractReadOnly();
		const dweets = await contract.getAllTweets();
		let populateAuthor = [];

		populateAuthor = await Promise.all(
			dweets.map(async (tweet) => {
				const user = await contract.getUser(tweet.author);
				return {
					author: user,
					timestamp: tweet.timestamp,
					content: tweet.content,
					id: tweet.id,
				};
			})
		);

		console.log(populateAuthor);
		setTweets(populateAuthor);
	};

	const postTweet = async (tweet) => {
		const contract = getContractWrite();
		const tx = await contract.postDweet(tweet);
		await tx.wait();
		getAllTweet();
	};

	const deleteTweet = async (tweetId) => {
		const contract = getContractWrite();
		const tx = await contract.deleteTweet(tweetId);
		await tx.wait();
		getAllTweet();
	};

	useEffect(() => {
		if (ethereum) {
			const getChain = async () => {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const { chainId } = await provider.getNetwork(provider);
				console.log('CHAIN ID : ', chainId);
				setIsCorrectNetwork(chainId === 31337);
			};

			ethereum.on('accountsChanged', (accounts) => {
				setCurrentAccount(accounts[0]);
			});
			ethereum.on('networkChanged', function (networkId) {
				window.location.reload();
			});
			checkIfWalletIsConnected();
			getAllTweet();
			getChain();
		}
	}, []);

	useEffect(() => {
		if (currentAccount) {
			getUser();
		}
	}, [currentAccount]);

	return (
		<UserContext.Provider
			value={{
				connectWallet,
				currentAccount,
				loading,
				isCorrectNetwork,
				createUser,
				currentUser,
				postTweet,
				getAllTweet,
				tweets,
				deleteTweet,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
