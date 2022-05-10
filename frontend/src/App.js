import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import UpdateTweet from './pages/UpdateTweet';

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
		</Routes>
	);
};

export default App;
