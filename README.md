# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product.

## Showcase

For the Capstone project, it was important to also share a deployed version of the contracts and perform some sale operations via Opensea. Please find all relevant information below.

### Contracts

[NFT (Rinkeby)](https://rinkeby.etherscan.io/address/0xCeeac9ee830ff2e692508D09329B7bDFC8cE0DEB)<br>
[Verifier (Rinkeby)](https://rinkeby.etherscan.io/address/0x7E1A9FCe30e92107369652bA8F00Ebe2a24bcd3b)<br>
[Abi's](./eth-contracts/build/contracts/)

### Opensea Storefront

[Udacity BlockchainDeveloper Capstone RC](https://testnets.opensea.io/collection/udacity-blockchaindeveloper-capstone-rc)<br>

**Opensea Sale Transactions**

- 0xf7aa0f4b2a8a6619dc4cd57414a8d5476c823b0768c6f021de0f7ec3c62b624b
- 0xa00587c293c4732d123d325d81116e887db4ad0960926ad699c32a3f21da16b7
- 0x780ac6ab075c2eb953d0cd506cb1fc5a6f59c5560dc9bd632501b8029ea2fcb0
- 0x1e4a23ed386216fb9440be475e6343d75659ed22fb0d02ff645f01af0124c187
- 0x6d2ed7b4e9ebf57ccdca260c3c457f7eda189826aebcb941cb0c5072dd5d6835

## Prerequisites

Before you start, make sure the following tools are installed on your systen.

- [Truffle Framework](https://truffleframework.com/)
- [Docker](https://docs.docker.com/install/)
- [Ganache - One Click Blockchain](https://truffleframework.com/ganache)

Setup an Account for testing

Additionally, make sure to setup an account for [Infura](https://infura.io) and create a project to retrieve your Infura Key needed to connect to the Rinkeby network.

## Setup

### Generate a snSNARK proof

Run the zkSNARK docker image (old image because of the old solidity version used in this project)

`docker run -ti -v $(pwd)/zokrates:/udacity zokrates/zokrates:0.5.0 /bin/bash`

Within the docker image, navigate to the code directory

`cd /udacity/code/square`

Compile the code

`~/zokrates -i square.code`

Run Setup

`~/zokrates setup`

Compute Witness

`~/zokrates compute-witness -a 3 9`

Generate Proof

`~/zokrates generate-proof`

Export Verifier code

`~/zokrates export-verifier`

On your host, copy the **verifier.sol** into your _contracts_ folder.

`cp zokrates/code/square/verifier.sol eth-contracts/contracts/Verifier.sol`

### Start Ganache

Feel free to use the `./01_start_ganache_cli.sh`. The containing wallet recivery mnemonic is for testing only and should never be used to store any actual value.

## Test

Test the code by running `truffle test` within the `eth-contracts/` folder.

## Deploy

Ensure you have configured your `.env` file according to the `.env.sample` provided in the `eth-contracts/` folder.

**Local**<br>
`truffle migrate`

**Rinkeby**<br>
Ensure you have your environment variables set as described above.
`truffle migrate --network rinkeby`

### Mint NFTs

For simplicity, a script has been created to deploy **10** new NFTs per execution. The token id's start at the current `totalSupply() + 1`.

From within the `eth-contracts/` folder, run the script as follows:

**Local**<br>
`truffle exec scripts/mint.js`

**Rinkeby**<br>
`truffle exec scripts/mint.js --network rinkeby`

## Project Resources

- [Remix - Solidity IDE](https://remix.ethereum.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Truffle Framework](https://truffleframework.com/)
- [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
- [Open Zeppelin ](https://openzeppelin.org/)
- [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
- [Docker](https://docs.docker.com/install/)
- [ZoKrates](https://github.com/Zokrates/ZoKrates)
