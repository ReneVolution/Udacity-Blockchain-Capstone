pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is rcERC721Token {
     IVerifier verifierContract;

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 idx;
        address owner;
    }

    // TODO define an array of the above struct
    // Solution[] private _allSolutions = [];
    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private _solutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address prover);

    constructor(address _verifierAddress, string memory _name, string memory _symbol, string memory _baseTokenURI)
        rcERC721Token(_name, _symbol, _baseTokenURI) public
    {
        verifierContract = IVerifier(_verifierAddress);
    }


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(bytes32 _hash, address _address, uint256 _idx) public {
        _solutions[_hash] = Solution({ idx: _idx, owner: _address});
        emit SolutionAdded(_address);
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintVerified(
        address _to, 
        uint256 _tokenId,
        uint[2] memory _a,
        uint[2][2] memory _b,
        uint[2] memory _c, 
        uint[2] memory _input
    ) public {
        require(verifierContract.verifyTx(_a, _b, _c, _input), "Invalid Proof!");
        bytes32 _hash = keccak256(abi.encodePacked(_tokenId, _to));
        require(_solutions[_hash].owner == address(0), "Solution not unique");

        super.mint(_to, _tokenId);
        addSolution(_hash, _to, _tokenId);
    }
}

contract IVerifier
{
    function verifyTx(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input
        ) public returns (bool r);
}








  


























