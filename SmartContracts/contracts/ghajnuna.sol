pragma solidity ^0.5.0;

contract Ghajnuna{
    
    //Structs
    struct NGO {
        string name;
        string voNumber;
        bool isSet;
        bool isSysAdmin;
    }
    
    struct Industry {
        string code;
        string description;
        bool isSet;
    }

    struct Beneficiary {
        Industry[] industries;
        bool isSet;
        bool isApproved; //TODO: Replaced by Approved By
    }
    
    struct Benefactor {
        string name;
        Industry[] industries;
        bool isSet;
    }
    
    //TODO: Create approval process
    
    //NGOs
    address[] private allNgos;
    mapping(address => NGO) private ngos;
    
    //Beneficiaries
    address[] private allBeneficiaries;
    mapping(address => Beneficiary) private beneficiaries;
    
    //Benefactors
    address[] private allBenefactors;
    mapping(address => Benefactor) private benefactors;
    
    //TODO Events
    
    constructor(string memory ngoName, string memory voNumber) public {
        //Set contract creator as an Administrative NGO    
        ngos[msg.sender].name = ngoName;
        ngos[msg.sender].voNumber = voNumber;
        ngos[msg.sender].isSet = true;
        ngos[msg.sender].isSysAdmin = true;

        allNgos.push(msg.sender);
    }
    
    // Function to get all store managers
    function registerNGO(address ngoAddress, string memory ngoName, string memory voNumber) public requireAdministrativeNGO {
        ngos[ngoAddress].name = ngoName;
        ngos[ngoAddress].voNumber = voNumber;
        ngos[ngoAddress].isSet = true;
        ngos[ngoAddress].isSysAdmin = false;
        
        allNgos.push(ngoAddress);
    }
    
    function makeNGOAdmin(address ngoAddress) public requireAdministrativeNGO {
        ngos[ngoAddress].isSysAdmin = true;
    }
	
	function getNGO(address ngoAddress) view public returns(string memory, string memory, bool, bool) {
		return (ngos[ngoAddress].name, ngos[ngoAddress].voNumber, ngos[ngoAddress].isSet, ngos[ngoAddress].isSysAdmin);
	}
	
	function getNGOs() view public returns(address[] memory){
	    return allNgos;
	}
	    
    //Modifiers
    modifier requireNGO(){
        require((ngos[msg.sender].isSet), "Only NGOs are able To run this function");
        _;
    }
    
    modifier requireAdministrativeNGO(){
        require((ngos[msg.sender].isSet && ngos[msg.sender].isSysAdmin), "Only Admin NGOs are able To run this function");
        _;
    }
    
    modifier requireBenefactor(){
        require((benefactors[msg.sender].isSet), "Only Benefactors are able To run this function");
        _;
    }
    
    modifier requireBeneficiary(){
        require((benefactors[msg.sender].isSet), "Only Beneficiaries are able To run this function");
        _;
    }
}