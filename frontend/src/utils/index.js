import { ethers } from 'ethers';
import contractAddress from '../contracts/contract-address.json';
import contract from '../contracts/DeTweet.json';

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export const truncateEthAddress = (address) => {
	const match = address.match(truncateRegex);
	if (!match) return address;
	return `${match[1]}…${match[2]}`;
};

export const getContractReadOnly = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const deCalendContract = new ethers.Contract(
		contractAddress.contractAddress,
		contract.abi,
		provider
	);
	return deCalendContract;
};

export const getContractWrite = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const deCalendContract = new ethers.Contract(
		contractAddress.contractAddress,
		contract.abi,
		signer
	);
	return deCalendContract;
};
