$(document).ready(function(){

    checkMetaMaskIsInstalled();

    /* connect auto mask */
    if(window.location.href.indexOf("private") > -1 ) // This doesn't work, any suggestions?
    {
         connect_MetaMask()
	        .then((data)=> {
	            currentAccount = data[0];
	            $('#info h3').html(currentAccount);
	        })
	        .catch(()=> {
	            console.log('KẾT NỐI METAMASK THẤT BẠI.');
	        });
    }
    

    var currentAccount = null;
    // TOKEN BUSD
    var SM_ABI_BUSD = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    var SM_ADD_BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';

    // TOKEN VIKE
    var SM_ABI_VIKE = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "symbol",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "initialSupply",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
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
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
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
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
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
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
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
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
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
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
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
            "inputs": [],
            "name": "totalSupply",
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
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    var SM_ADD_VIKE = '0xb4d5c5dB29d0B2722f584FA9601D84967622b386';

    // TOKEN BV SM
    var SM_ABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "VIKE",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "BUSD",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "busd_token",
            "outputs": [
                {
                    "internalType": "contract IERC20",
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
                    "name": "amount_Vike",
                    "type": "uint256"
                }
            ],
            "name": "buy_Vike_Token",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount_Vike",
                    "type": "uint256"
                }
            ],
            "name": "sell_Vike_Token",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "send_BNB",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "showOwnerAddress",
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
            "name": "showSummary",
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
                    "name": "new_ratio_busd_to_vike",
                    "type": "uint256"
                }
            ],
            "name": "update_RatioBnbToVike",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "new_ratio_vike_to_busd",
                    "type": "uint256"
                }
            ],
            "name": "update_RatioVikeToBnb",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "vike_token",
            "outputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    var SM_ADD = '0x959E939AFbd72D50d13e4539A94D4018A9B80761';

    // Contract Metamask
    window.ethereum.enable();
    const web3 = new Web3(window.ethereum);
    var contract_BUSD = web3.eth.Contract(SM_ABI_BUSD, SM_ADD_BUSD);
    var contract_VIKE = web3.eth.Contract(SM_ABI_VIKE, SM_ADD_VIKE);
    var contract_MM = web3.eth.Contract(SM_ABI, SM_ADD);

    // KẾT NỐI VỚI VÍ HIỆN TẠI
    $("#btn_CoonectMM").click(()=> {
        console.log('BẮT ĐẦU KẾT NỐI METAMASK');
        connect_MetaMask()
        .then((data)=> {
            currentAccount = data[0];
            $('#info h3').html(currentAccount);
        })
        .catch(()=> {
            console.log('KẾT NỐI METAMASK THẤT BẠI.');
        });
    });

    window.ethereum.on('accountsChanged', function(account) {
        currentAccount = account;
        $('#info h3').html(currentAccount);
    });

    $('#btn_App').click(()=> {
        let txt_ethe = ($('#form-field-busd').val());
        let busd_current_amount;
        contract_BUSD.methods.balanceOf(currentAccount).call().then(amount => {
            busd_current_amount = web3.utils.hexToNumberString(amount)/10**18;
            if(parseFloat(busd_current_amount) > 0 
                && parseFloat(busd_current_amount) > parseFloat(txt_ethe)) {
                userApprove(SM_ADD, currentAccount, txt_ethe).then(data => {
                    console.log('userApprove result = ' + data);
                });
        } else {
            console.log('You have not enough to send token BUSD.');
        }
        });
    });

    //$('#btn_Buy').click(()=> {
    $('#btn_Buy').click(function(){

    	//approve

    	let txt_ethe = ($('#form-field-busd').val());

        var r = confirm("Are you sure to buy Vike?");

        if (r == true) {
            let busd_current_amount;
            contract_BUSD.methods.balanceOf(currentAccount).call().then(amount => {
                busd_current_amount = web3.utils.hexToNumberString(amount)/10**18;
                if(parseFloat(busd_current_amount) > 0 
                    && parseFloat(busd_current_amount) > parseFloat(txt_ethe)) {
                    userApprove(SM_ADD, currentAccount, txt_ethe).then(data => {
                        console.log('userApprove result = ' + data);
                         if(currentAccount != null) {
                            contract_MM.methods.buy_Vike_Token(web3.utils.toWei((txt_ethe*50).toString(), 'wei'))
                            .send({from: currentAccount, "gasPrice": 6000000}, function(err, transactionHash) {
                                console.log('BUY SUCCESS.');
                                console.log(transactionHash);
                            });
                        }
                    });
            } else {
                alert('You have not enough to send token BUSD.');
            }
            });
            // let busd_current_amount;
           
        }

        else {
            
        }
        


        

       
    });

    $("#connect_wallet").click(function(){
				
				 connect_MetaMask()
			        .then((data)=> {
			            currentAccount = data[0];
			            //$('#info h3').html(currentAccount);			            
			        })
			        .catch(()=> {
			            console.log('KẾT NỐI METAMASK THẤT BẠI.');
			        });
	})

    var userApprove = function(SM_ADD, currentAccount, txt_ethe) {
        return new Promise((resolve, reject) => {
            contract_BUSD.methods.approve(SM_ADD, web3.utils.toWei(txt_ethe, 'ether'))
            .send({from: currentAccount}, function(err, transactionHash) {
                if(!err && transactionHash) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    }
});

function checkMetaMaskIsInstalled() {
    if(typeof window.ethereum !== 'undefined') {
        $("#install").hide();
        $("#info").show();
    } else {
        console.log("CHƯA CÀI ĐẶT METAMASK.!");
    }
}

async function connect_MetaMask() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}
