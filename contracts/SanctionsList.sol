// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "./interfaces/ISanctionsList.sol";

contract SanctionedList is ISanctionsList {

    mapping(address => bool) sanctioned;
    function isSanctioned( address addr)  external view virtual override  returns (bool){
        return sanctioned[addr];
    }
}