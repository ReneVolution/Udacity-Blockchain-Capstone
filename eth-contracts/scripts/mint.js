const fs = require('fs')
const { inspect } = require('util')
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier')
var proofJson = require('../../zokrates/code/square/proof.json')

const NUM_TOKENS = 10

module.exports = async (callback) => {
  const { proof, inputs } = proofJson
  const { network, from } = config
  console.log(`Connected Account: ${from}`)

  const dConf = require(`../config.${network}.json`)
  console.log(dConf)

  const ssv = await SolnSquareVerifier.at(dConf.nft)
  console.log(ssv.address)

  const beforeSupply = await ssv.totalSupply()
  console.log(`Before Supply: ${beforeSupply}`)

  const mintStart = parseInt(beforeSupply) + 1
  const totalMint = parseInt(beforeSupply) + NUM_TOKENS
  for (let i = mintStart; i <= totalMint; i++) {
    console.log(`Minting Token: ${i}`)
    try {
      await ssv.mintVerified(from, i, proof.a, proof.b, proof.c, inputs, {
        from,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const afterSupply = await ssv.totalSupply()
  console.log(`After Supply: ${afterSupply}`)

  // Finish
  callback()
}
