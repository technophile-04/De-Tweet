import React, { useContext } from 'react';
import { UserContext } from '../providers/userContext';

const PrivateRoute = ({ children }) => {
	const { currentAccount, connectWallet } = useContext(UserContext);

	return currentAccount ? (
		children
	) : (
		<button onClick={connectWallet}>Connect</button>
	);
};

export default PrivateRoute;
