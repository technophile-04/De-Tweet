import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import MyTweets from './pages/MyTweets';
import UpdateTweet from './pages/UpdateTweet';
import UserProfile from './pages/UserProfile';

const App = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PrivateRoute>
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					</PrivateRoute>
				}
			/>
			<Route
				path="/update/:tweetId"
				element={
					<PrivateRoute>
						<ProtectedRoute>
							<UpdateTweet />
						</ProtectedRoute>
					</PrivateRoute>
				}
			/>
			<Route
				path="/users/:userAddress"
				element={
					<PrivateRoute>
						<UserProfile />
					</PrivateRoute>
				}
			/>
			<Route
				path="/myTweets"
				element={
					<PrivateRoute>
						<ProtectedRoute>
							<MyTweets />
						</ProtectedRoute>
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default App;
