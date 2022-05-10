//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DeTweet {
    struct User {
        address userAddress;
        string name;
        string username;
        string imgURI;
    }
    mapping(address => string) public usernames;
    mapping(string => User) public users;

    struct Tweet {
        uint id;
        address author;
        string content;
        uint timestamp;
        uint likes;
    }
    mapping(uint => Tweet) public idToTweet;
    uint[] public tweetIds;

    function signup(
        string memory _username,
        string memory _name,
        string memory _imgURI
    ) public {
        require(
            bytes(usernames[msg.sender]).length == 0,
            "User already exists"
        );
        require(
            users[_username].userAddress == address(0),
            "Username is taken, please try another one."
        );

        users[_username] = User({
            userAddress: msg.sender,
            name: _name,
            username: _username,
            imgURI: _imgURI
        });
        usernames[msg.sender] = _username;
    }

    function getUser(address _userAddress) public view returns (User memory) {
        return users[usernames[_userAddress]];
    }

    function postDweet(string memory _content) public {
        require(
            bytes(usernames[msg.sender]).length > 0,
            "You must sign up to post a tweet."
        );
        require(
            bytes(_content).length > 0,
            "You must write something to post a tweet."
        );
        require(bytes(_content).length <= 280, "Your tweet is too long.");

        uint currId = tweetIds.length;

        idToTweet[currId] = Tweet({
            id: currId,
            author: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            likes: 0
        });

        tweetIds.push(currId);
    }

    function getAllTweets() public view returns (Tweet[] memory) {
        Tweet[] memory allTweets = new Tweet[](tweetIds.length);
        uint currIndex = 0;
        for (uint i = 0; i < tweetIds.length; i++) {
            uint currentId = tweetIds[i];
            Tweet storage currentTweet = idToTweet[currentId];
            allTweets[currIndex] = currentTweet;
            currIndex++;
        }

        return allTweets;
    }

    function deleteTweet(uint _tweetId) public {
        for (uint i = 0; i < tweetIds.length; i++) {
            if (tweetIds[i] == _tweetId) {
                tweetIds[i] = tweetIds[tweetIds.length - 1];
                tweetIds.pop();
                break;
            }
        }

        delete idToTweet[_tweetId];
    }

    function updateTweet(uint _tweetId, string memory _content) public {
        require(idToTweet[_tweetId].author != address(0), "Tweet do not exist");
        require(
            idToTweet[_tweetId].author == msg.sender,
            "You are not the owner"
        );
        Tweet storage currentTweet = idToTweet[_tweetId];
        currentTweet.content = _content;
    }
}
