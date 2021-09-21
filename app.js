 
 
 // Get the modal
 var modal = document.getElementById("myModal");

  
 
 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 if (window.ethereum) {
     handleEthereum();
   } 
   else {
     window.addEventListener('ethereum#initialized', handleEthereum, {
       once: true,
     });
   
     // If the event is not dispatched by the end of the timeout,
     // the user probably doesn't have MetaMask installed.
     setTimeout(handleEthereum, 3000); // 3 seconds
   }
   
   function handleEthereum() {
     const { ethereum } = window;
     if (ethereum && ethereum.isMetaMask) {
       console.log('Ethereum successfully detected!');
       
       // Access the decentralized web!
     } else {
       console.log('Please install MetaMask!');
       document.getElementById("wallet").innerHTML = "Connect to wallet";
       window.open(
         "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
      '_blank'  
       );

     }
   }
 
 ethereum.on('accountsChanged', (accounts) => {
     // Handle the new accounts, or lack thereof.
     // "accounts" will always be an array, but it can be empty.
     console.log("account chnaged");
     location.reload();
      
     
   });

   ethereum.on('connect', (connectInfo) => {
        console.log("connected to wallet");
        console.log(connectInfo);
        // document.getElementById("wallet").innerHTML = "Connected";
      
         
   });

   ethereum.on('disconnect', (error) => {
        console.log("account disconnected");
        console.log(error);
        location.reload();
   });

   ethereum.on('chainChanged',(chainId) => {
     console.log("chainChanged");
     console.log(chainId);
     window.location.reload();
   });
  
 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
   modal.style.display = "none";
 }
 
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }

async function loadWeb3() {
     const isMetaMaskInstalled = () => {
          //Have to check the ethereum binding on the window object to see if it's installed
          const { ethereum } = window;
          return Boolean(ethereum && ethereum.isMetaMask);
        };
        if(isMetaMaskInstalled){

             if (window.ethereum) {
                 window.web3 = new Web3(window.ethereum);
                
                 window.ethereum.enable();
              }
             else{
              
             }
        }
         
 }
 
 function connecttowallet()
 {
     if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          window.ethereum.enable();
       }
      else{
        window.open(
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
       '_blank' // <- This is what makes it open in a new window.
        );
        
        
      }

 }
 function updateStatus(status) {
     const statusEl = document.getElementById('status');
     statusEl.innerHTML = status;
     
     console.log(status);
 }

 function UpdateUser(user){
     const statusEl = document.getElementById('user');
     statusEl.innerHTML = user;
     console.log(user);
     balanceOFuser();
 }
 
 load();
 
 async function loadContract() {
      
      let ABI = [{
               "anonymous": false,
               "inputs": [
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "owner",
                         "type": "address"
                    },
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "approved",
                         "type": "address"
                    },
                    {
                         "indexed": true,
                         "internalType": "uint256",
                         "name": "tokenId",
                         "type": "uint256"
                    }
               ],
               "name": "Approval",
               "type": "event"
          },
          {
               "anonymous": false,
               "inputs": [
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "owner",
                         "type": "address"
                    },
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "operator",
                         "type": "address"
                    },
                    {
                         "indexed": false,
                         "internalType": "bool",
                         "name": "approved",
                         "type": "bool"
                    }
               ],
               "name": "ApprovalForAll",
               "type": "event"
          },
          {
               "anonymous": false,
               "inputs": [
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "previousOwner",
                         "type": "address"
                    },
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "newOwner",
                         "type": "address"
                    }
               ],
               "name": "OwnershipTransferred",
               "type": "event"
          },
          {
               "anonymous": false,
               "inputs": [
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "from",
                         "type": "address"
                    },
                    {
                         "indexed": true,
                         "internalType": "address",
                         "name": "to",
                         "type": "address"
                    },
                    {
                         "indexed": true,
                         "internalType": "uint256",
                         "name": "tokenId",
                         "type": "uint256"
                    }
               ],
               "name": "Transfer",
               "type": "event"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "to",
                         "type": "address"
                    },
                    {
                         "internalType": "uint256",
                         "name": "tokenId",
                         "type": "uint256"
                    }
               ],
               "name": "approve",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "string",
                         "name": "tokenURI",
                         "type": "string"
                    }
               ],
               "name": "CreateNFT",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "uint256",
                         "name": "_tokenid",
                         "type": "uint256"
                    }
               ],
               "name": "DelteNFT",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "renounceOwnership",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "from",
                         "type": "address"
                    },
                    {
                         "internalType": "address",
                         "name": "to",
                         "type": "address"
                    },
                    {
                         "internalType": "uint256",
                         "name": "tokenId",
                         "type": "uint256"
                    }
               ],
               "name": "safeTransferFrom",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "from",
                         "type": "address"
                    },
                    {
                         "internalType": "address",
                         "name": "to",
                         "type": "address"
                    },
                    {
                         "internalType": "uint256",
                         "name": "tokenId",
                         "type": "uint256"
                    },
                    {
                         "internalType": "bytes",
                         "name": "_data",
                         "type": "bytes"
                    }
               ],
               "name": "safeTransferFrom",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "operator",
                         "type": "address"
                    },
                    {
                         "internalType": "bool",
                         "name": "approved",
                         "type": "bool"
                    }
               ],
               "name": "setApprovalForAll",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "from",
                         "type": "address"
                    },
                    {
                         "internalType": "address",
                         "name": "to",
                         "type": "address"
                    },
                    {
                         "internalType": "uint256",
                         "name": "tokenId",
                         "type": "uint256"
                    }
               ],
               "name": "transferFrom",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "newOwner",
                         "type": "address"
                    }
               ],
               "name": "transferOwnership",
               "outputs": [],
               "stateMutability": "nonpayable",
               "type": "function"
          },
          {
               "inputs": [],
               "stateMutability": "nonpayable",
               "type": "constructor"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "owner",
                         "type": "address"
                    }
               ],
               "name": "balanceOf",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "string",
                         "name": "_TokenURI",
                         "type": "string"
                    }
               ],
               "name": "Get_tokenid",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "uint256",
                         "name": "tokenId",
                         "type": "uint256"
                    }
               ],
               "name": "getApproved",
               "outputs": [
                    {
                         "internalType": "address",
                         "name": "",
                         "type": "address"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "GetnoOf_tokenid",
               "outputs": [
                    {
                         "internalType": "uint256",
                         "name": "",
                         "type": "uint256"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "address",
                         "name": "owner",
                         "type": "address"
                    },
                    {
                         "internalType": "address",
                         "name": "operator",
                         "type": "address"
                    }
               ],
               "name": "isApprovedForAll",
               "outputs": [
                    {
                         "internalType": "bool",
                         "name": "",
                         "type": "bool"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "name",
               "outputs": [
                    {
                         "internalType": "string",
                         "name": "",
                         "type": "string"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "owner",
               "outputs": [
                    {
                         "internalType": "address",
                         "name": "",
                         "type": "address"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "uint256",
                         "name": "tokenId",
                         "type": "uint256"
                    }
               ],
               "name": "ownerOf",
               "outputs": [
                    {
                         "internalType": "address",
                         "name": "",
                         "type": "address"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "bytes4",
                         "name": "interfaceId",
                         "type": "bytes4"
                    }
               ],
               "name": "supportsInterface",
               "outputs": [
                    {
                         "internalType": "bool",
                         "name": "",
                         "type": "bool"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [],
               "name": "symbol",
               "outputs": [
                    {
                         "internalType": "string",
                         "name": "",
                         "type": "string"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          },
          {
               "inputs": [
                    {
                         "internalType": "uint256",
                         "name": "tokenId",
                         "type": "uint256"
                    }
               ],
               "name": "tokenURI",
               "outputs": [
                    {
                         "internalType": "string",
                         "name": "",
                         "type": "string"
                    }
               ],
               "stateMutability": "view",
               "type": "function"
          }
     ];
          
     let contract_address = '0xf6051A0FD588A1BcCD66C03E8CBa4389d9405011';
     return await new window.web3.eth.Contract(ABI, contract_address);
 }

 async function load() {
     await loadWeb3();
     window.contract = await loadContract();
     updateStatus('Ready!');
     const account = await getCurrentAccount();
     UpdateUser(account);
 }
 function imgloop(_src,_name,_description,_tokenid)
  { 
      var carddiv = document.createElement('div');
      carddiv.className = 'card';

      var img = new Image(200, 200);
      img.src = _src;
     //  img.style.width = '100%';
     //  img.alt = "NFT";

     carddiv.appendChild(img)

     var h3 = document.createElement('h3');
     h3.textContent = _tokenid;
     carddiv.appendChild(h3)

     var h1 = document.createElement('h1');
     h1.textContent = _name;
     carddiv.appendChild(h1)

     var p = document.createElement('p');
     p.textContent = _description;
     carddiv.appendChild(p)

     var bp = document.createElement('p');
     var b = document.createElement('button');
     b.setAttribute("data-tokenid",_tokenid);
     b.setAttribute("data-name",_name);
    
     b.textContent = "send";
     b.id = "myBtn";
     b.name = "testname";
     b.onclick = function () {
          
          SendTokenPOP(b.getAttribute("data-tokenid"));

        };
     bp.appendChild(b);
     carddiv.appendChild(bp)
 
      var src = document.getElementById("elementid");
      src.appendChild(carddiv);
 
 
  }
 
 async function balanceOFuser(){
     updateStatus('chaking the tokens ...');
     const account = await getCurrentAccount();
     let No_of_tokens =  await window.contract.methods.GetnoOf_tokenid().call();
     console.log("number of token in this account"+No_of_tokens);
     if(await window.contract.methods.balanceOf(account).call() > 0){
          //show the add tokens;
           //tokenURI(1);
           //tokenURI(2);
          for(let i =1 ; i<= No_of_tokens; i++){
               tokenURI(i)
          }
     }
     else{
          const statusEl = document.getElementById('elementid');
     statusEl.innerHTML = "No NFTS";
     console.log(user);
 
     }
 }
  
 async function TransforToken(_tokenid,_to){
     const account = await getCurrentAccount();
      
     //var _to = document.getElementById('adddessin').value;
     //var _tokenid = document.getElementById('tokenin').value;
     console.log(_to);
     console.log(_tokenid);
     updateStatus("sending Token");
     try{

          await window.contract.methods.safeTransferFrom(account, _to, _tokenid).send({from:account});
          updateStatus("successfully sent");
          location.reload();
          console.log("token sent");
     }
     catch{
          alert("Transaction faild chake the addres ");
     }

      
     
 }

 

 async function tokenURI(tokenid) {
     updateStatus('fetching Data...');
     const TokenOwner = await window.contract.methods.ownerOf(tokenid).call();
     const account = await getCurrentAccount();
     console.log("token owner"+TokenOwner);
     if(account === TokenOwner)
     {

         
          const TokenURI = await window.contract.methods.tokenURI(tokenid).call();
         const ThisTokenID =  await window.contract.methods.Get_tokenid(TokenURI).call();
          
          let response = fetch(TokenURI).then(response => response.text()).then(function(data){
            console.log(JSON.parse(data));
            const obj = JSON.parse(data);
            console.log(obj.image);     
            imgloop(obj.image,obj.name,obj.description,ThisTokenID);
           // document.getElementById("NFTImage").src = obj.image;
           console.log("__________________________________");
     
          } );
          
          //console.log(response);
          
          updateStatus('!Connected');
     }
 }

 async function CreateNFT() {
   const account = await getCurrentAccount();
   const _TokenURI = document.getElementById("_tokenURI").value;
   var regex = new RegExp("^https://ipfs.io/ipfs/[a-zA-Z0-9]{46}$");
    if(regex.test(_TokenURI)) {
        
        try{
     
          updateStatus('Creating NFT');
             await window.contract.methods.CreateNFT(_TokenURI).send({ from: account });
     
          updateStatus('!NFT Created Successfully');
          location.reload();
        }
        catch(e){
             console.log(e);
             alert("add correct uri or some problam in creating token");
        }
    }else {
        alert("Enter the currect URI formet{https://ipfs.io/ipfs/your IPFS CID}");
        return false;
    }

   
 }


 
//  async function changeTokenURI() {
//      var s = document.getElementById("datain").value;
//      //const value = Math.floor(Math.random() * 100);
//      updateStatus(`Updating Data with ${s}`);
//      const account = await getCurrentAccount();
//      const TokenURI = await window.contract.methods.set(s).send({ from: account });
//      updateStatus('Updated.');
//  }
 async function getCurrentAccount() {
     const accounts = await window.web3.eth.getAccounts();
     return accounts[0];
 }

 function SendTokenPOP(_tokenid){
     modal.style.display = "block";
     var databutton  = document.getElementById("dataholder");
     databutton.setAttribute("data-tokanid",_tokenid);

 }

 async function TransferToken(_tokenid){
      //transret the 
      let Tid = _tokenid.getAttribute("data-tokanid");
      var Raddress = document.getElementById("adddessin").value;
     // alert(Raddress);
      console.log("get the token id and call transfer");

      TransforToken(Tid,Raddress);
 }

   
//  function pinJsonToIPFS(){
//      var nftname =   document.getElementById("NFTname").value;
//      var NFTDiscription =   document.getElementById("NFTDiscription").value;
//      var NFTimageCID =   document.getElementById("NFTimageCID").value;


//      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
                    
//           fetch(url,{
//               // Adding method type
//             method: "POST",
//               // Adding body or contents to send
//             body: JSON.stringify({
//               name: "foo",
//               description: "bar",
//               image: "https://ipfs.io/ipfs/QmPL3HWxMugJLzwm7DhywG1xsaJgxW6MnB211SYMSBVjN9"
//             }),
//               // Adding headers to the request
//             headers: {
              
//               "Content-type": "application/json; charset=UTF-8",
//               'pinata_api_key': '299e5e307c02e3848d26',
//               'pinata_secret_api_key': 'b5f4aa6a74b4b7308483b2302ab3a1a1d790d944200f005ac884746fa6d1e021'
//             }
//           })// Converting to JSON
//           .then(response => response.json())

//           // Displaying results to console
//           .then(json => console.log(json))
                
//           };
    
