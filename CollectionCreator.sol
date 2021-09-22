pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

 

contract MyCollectible is ERC721URIStorage,Ownable {
    mapping (string => bool) Uniquenft;
    mapping (string => uint256) uritotoken;
    
     
     using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    constructor() ERC721("MyCollectible", "UMNFT") {
         
    }
    
    function CreateNFT(string memory tokenURI) public {
        require(!Uniquenft[tokenURI],"this token is exist");
         _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        uritotoken[tokenURI] = newItemId;
        Uniquenft[tokenURI] = true;
        
    }
    
    function DelteNFT(uint256 _tokenid) public onlyOwner {
        _tokenIds.decrement();
        _burn(_tokenid);
    }
    
    function GetnoOf_tokenid() public view returns(uint256){
       return  _tokenIds.current();
    }
    
    function Get_tokenid(string memory _TokenURI) public view returns(uint256){
       return  uritotoken[_TokenURI];
    }
    
    
}