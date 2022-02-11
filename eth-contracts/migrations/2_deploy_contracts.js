// migrating the appropriate contracts
var Verifier = artifacts.require('./Verifier.sol')
var SolnSquareVerifier = artifacts.require('./SolnSquareVerifier.sol')
const fs = require('fs').promises

module.exports = async (deployer, network) => {
  await deployer.deploy(Verifier)

  const verifierContract = await Verifier.deployed()

  await deployer.deploy(
    SolnSquareVerifier,
    verifierContract.address,
    'Udacity BlockchainDeveloper Capstone (RC)',
    'UBDC_RC',
    'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/',
  )

  const nftContract = await SolnSquareVerifier.deployed()

  console.log(`Verifier Contract Address: ${verifierContract.address}`)
  console.log(`NFT Contract Address: ${nftContract.address}`)

  config = {
    network,
    verifier: verifierContract.address,
    nft: nftContract.address,
  }

  await fs.writeFile(
    __dirname + `/../config.${network}.json`,
    JSON.stringify(config, null, '\t'),
    'utf-8',
  )
}
