// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol";
import "./interfaces/IEndpoint.sol";
import "./interfaces/ISequencer.sol";
import "./Version.sol";
import "hardhat/console.sol";




contract Sequencer is ISequencer, EIP712Upgradeable, OwnableUpgradeable, Version  {
    address private endpoint;
    
    function initialize(address _endpoint)external initializer {
        __Ownable_init();
        setEndpoint(_endpoint);
    }

    function setEndpoint(address _endpoint) public onlyOwner {
        endpoint = _endpoint;
    }


    function submitTransactions( uint64 idx,bytes[] calldata transactions) public onlyOwner{
        IEndpoint(endpoint).submitTransactionsChecked(idx,transactions);
    }
}
