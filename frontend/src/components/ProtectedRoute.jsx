import React, { useContext } from 'react';
import SignUp from '../pages/SignUp';
import { UserContext } from '../providers/userContext';
import Navbar from './Navbar';

const ProtectedRoute = ({ children }) => {
	const { currentAccount, currentUser } = useContext(UserContext);

	return currentAccount.toUpperCase() !==
		currentUser?.userAddress.toUpperCase() ? (
		<SignUp />
	) : (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default ProtectedRoute;
