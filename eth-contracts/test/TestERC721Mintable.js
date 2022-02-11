var rcERC721Token = artifacts.require('rcERC721Token')
var truffleAssert = require('truffle-assertions')

contract('TestERC721Mintable', (accounts) => {
  const baseURI =
    'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/'
  const account_one = accounts[0]
  const account_two = accounts[1]
  const NUM_TOKENS = 10

  describe('match erc721 spec', function () {
    beforeEach(async function () {
      this.contract = await rcERC721Token.new('Test', 'TEST', baseURI, {
        from: account_one,
      })

      // TODO: mint multiple tokens
      for (let i = 0; i < NUM_TOKENS; i++) {
        await this.contract.mint(account_one, i, { from: account_one })
      }
    })

    it('should return total supply', async function () {
      const totalSupply = await this.contract.totalSupply()
      assert.equal(
        totalSupply,
        NUM_TOKENS,
        'Total Supply should be equal the number of tokens minted.',
      )
    })

    it('should get token balance', async function () {
      const bal_one = await this.contract.balanceOf(account_one)
      const bal_two = await this.contract.balanceOf(account_two)

      assert.equal(bal_one, NUM_TOKENS, 'Account one should own all token.')
      assert.equal(bal_two, 0, 'Account Two should not own any token.')
    })

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it('should return token uri', async function () {
      const expected = `https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1`
      const tokenURI = await this.contract.tokenURI(1)

      assert.equal(tokenURI, expected, `Wrong tokenURI`)
    })

    it('should transfer token from one owner to another', async function () {
      // Transfer tokenId 1 from account_one to account_two
      await this.contract.transferFrom(account_one, account_two, 1)

      const tokenOneOwner = await this.contract.ownerOf(1)
      assert.equal(
        tokenOneOwner,
        account_two,
        'Token should be transfered to account two.',
      )
    })
  })

  describe('have ownership properties', function () {
    beforeEach(async function () {
      this.contract = await rcERC721Token.new('Test', 'TEST', '', {
        from: account_one,
      })
    })

    it('should fail when minting when address is not contract owner', async function () {
      await truffleAssert.reverts(
        this.contract.mint(account_two, 1, { from: account_two }),
        'Ownable: caller is not the owner',
      )
    })

    it('should return contract owner', async function () {
      const contractOwner = await this.contract.owner()
      assert.equal(contractOwner, account_one)
    })
  })
})
