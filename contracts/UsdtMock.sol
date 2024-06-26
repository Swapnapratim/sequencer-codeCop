// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IERC20Base.sol";

contract UsdtMock is ERC20 {
    constructor() ERC20("MyToken", "MT") {
        _mint(msg.sender, 10000000000000000000 * (10 ** uint256(decimals())));
    }
}
