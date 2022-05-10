const hre = require('hardhat');

async function main() {
	const DeTweet = await hre.ethers.getContractFactory('DeTweet');
	const deTweet = await DeTweet.deploy();

	await deTweet.deployed();

	console.log('deTweet deployed to:', deTweet.address);

	saveFrontendFiles(deTweet.address);
}

function saveFrontendFiles(contractAddress) {
	const fs = require('fs');

	const contractsDir = __dirname + '/../frontend/src/contracts';

	if (!fs.existsSync(contractsDir)) {
		fs.mkdirSync(contractsDir);
	}

	fs.writeFileSync(
		contractsDir + '/contract-address.json',
		JSON.stringify({ contractAddress: contractAddress }, undefined, 2)
	);

	const DeTweet = artifacts.readArtifactSync('DeTweet');

	fs.writeFileSync(
		contractsDir + '/DeTweet.json',
		JSON.stringify(DeTweet, null, 2)
	);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
