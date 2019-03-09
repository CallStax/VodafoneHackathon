const path = require('path');
const fs = require('fs');
const solc = require('solc');

const ghajnunaPath = path.resolve(__dirname, 'contracts', 'ghajnuna.sol');
const contractSource = fs.readFileSync(ghajnunaPath, 'utf8');

let jsonContractSource = JSON.stringify({
    language: 'Solidity',
    sources: {
      'Task': {
          content: contractSource,
       },
    },
    settings: { 
        outputSelection: {
            '*': {
                '*': ['abi',"evm.bytecode"],   
             // here point out the output of the compiled result
            },
        },
    },
});

let compiledResult = JSON.parse(solc.compile(jsonContractSource));

let compiledContract = compiledResult.contracts.Task.Ghajnuna;

module.exports = compiledContract;
