import React, { useContext, useState } from 'react';
import { UserContext } from '../providers/userContext';

const SignUp = () => {
	const { createUser } = useContext(UserContext);

	const [userName, setUserName] = useState('');
	const [fullName, setFullName] = useState('');
	const [imgLink, setimgLink] = useState(
		'https://external-preview.redd.it/RNHBb73nQjSDez_ZxyzDTA3inn0E0G670g29PqEdJbI.jpg?auto=webp&s=3e648825a26d115990fb327986c37e51e023fb0b'
	);

	return (
		<div className="container mx-auto flex flex-col items-center justify-center space-y-5 pb-4">
			<div className="bg-white shadow-md flex flex-col items-center justify-center rounded-md m-8 p-4 xl:w-6/12 space-y-3 w-11/12">
				<h1 className="text-3xl font-semibold">Welcome to De-Tweet 🚀</h1>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Your Username
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="Username"
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="fullName"
					>
						Full Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="fullName"
						type="text"
						placeholder="Full Name"
						onChange={(e) => setFullName(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="fullName"
					>
						Avatar link
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="fullName"
						type="text"
						placeholder="image url"
						onChange={(e) => setimgLink(e.target.value)}
					/>
				</div>
				<button
					className="h-10 px-6 font-semibold rounded-md bg-indigo-500 text-white"
					onClick={() => createUser(userName, fullName, imgLink)}
				>
					Sign Up
				</button>
			</div>
		</div>
	);
};

export default SignUp;
