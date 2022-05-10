import React, { useContext } from 'react';
import SignUp from '../pages/SignUp';
import { UserContext } from '../providers/userContext';

const ProtectedRoute = ({ children }) => {
	const { currentAccount, currentUser } = useContext(UserContext);

	return currentAccount.toUpperCase() !==
		currentUser?.userAddress.toUpperCase() ? (
		<SignUp />
	) : (
		children
	);
};

export default ProtectedRoute;
