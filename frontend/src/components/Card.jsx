import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/userContext';
import { truncateEthAddress } from '../utils';

const Card = ({ message, timeStamp, author, tweetId }) => {
	const { currentUser, deleteTweet } = useContext(UserContext);

	return (
		<div className="bg-white shadow-md xl:w-6/12 w-11/12 rounded-md p-4 text-gray-500 font-semibold hover:shadow-lg space-y-2">
			<div class="border border-gray-400 lg:border lg:border-gray-400 bg-white rounded lg:rounded p-4 flex flex-col justify-between leading-normal">
				<div class="mb-3">
					<p class="text-gray-700 text-base">{message}</p>
				</div>
				<div className="flex justify-between">
					<div class="flex items-center">
						<img
							class="w-10 h-10 rounded-full mr-4"
							src={author.imgURI}
							alt="Avatar"
						/>
						<div class="text-sm">
							<p class="text-gray-900 leading-none text-sm">
								{author.username}
							</p>
							<p class="text-gray-600 text-xs">
								{truncateEthAddress(author.userAddress)}
							</p>
							<p class="text-gray-600 text-xs">{timeStamp}</p>
						</div>
					</div>
					{author.userAddress === currentUser.userAddress && (
						<div className="space-x-2 self-end">
							<Link to={`/update/${tweetId}`}>
								<button className="px-2 py-1 font-semibold rounded-md bg-indigo-500 text-white">
									Update
								</button>
							</Link>
							<button
								className="px-2 py-1 font-semibold rounded-md bg-red-400 text-white"
								onClick={() => deleteTweet(tweetId)}
							>
								delete
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
