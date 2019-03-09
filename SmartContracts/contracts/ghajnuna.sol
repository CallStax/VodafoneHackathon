pragma solidity ^0.5.0;

contract Ghajnuna{
    
    //Structs
    struct NGO {
        string name;
        string voNumber;
        bool isSet;
        bool isApproved;
        bool isSysAdmin;
    }
    
    struct Industry {
        bytes32 id;
        string code;
        string description;
        bool isSet;
    }

    struct Beneficiary {
        bytes32[] industries;
        bool isSet;
        bool isApproved; //TODO: Replaced by Approved By
        address[] approvedBy;
    }
    
    struct Benefactor {
        string name;
        bytes32[] industries;
        bool isSet;
    }
    
    //TODO: Create approval process
    
    //NGOs
    address[] private allNgos;
    mapping(address => NGO) private ngos;

    //Industries
    bytes32[] private allIndustries;
    mapping(bytes32 => Industry) private industries;
    
    //Beneficiaries
    address[] private allBeneficiaries;
    mapping(address => Beneficiary) private beneficiaries;
    
    //Benefactors
    address[] private allBenefactors;
    mapping(address => Benefactor) private benefactors;
    
    //Approved beneficiaries
    //mapping(address(NGO) => address[](beneficiaries))
    mapping(address => address[]) private beneficiariesApprovedByNgo; //List of NGOs that have onboarded the Beneficiary
    //mapping(address(Beneficiary) => address[](NGOs))
    mapping(address => address[]) private ngoApprovalForBeneficiary; //List of NGOs that have onboarded the Beneficiary

    //TODO Events
    
    constructor(string memory ngoName, string memory voNumber) public {
        //Set contract creator as an Administrative NGO    
        ngos[msg.sender].name = ngoName;
        ngos[msg.sender].voNumber = voNumber;
        ngos[msg.sender].isSet = true;
        ngos[msg.sender].isApproved = true;
        ngos[msg.sender].isSysAdmin = true;

        allNgos.push(msg.sender);
    }
    
    // Functions
    function requestNGO(address ngoAddress, string memory ngoName, string memory voNumber) public requireAdministrativeNGO {
        ngos[ngoAddress].name = ngoName;
        ngos[ngoAddress].voNumber = voNumber;
        ngos[ngoAddress].isSet = true;
        ngos[ngoAddress].isApproved = false;
        ngos[ngoAddress].isSysAdmin = false;
    }

    function approveNGO(address ngoAddress) public requireAdministrativeNGO {
        ngos[ngoAddress].isApproved = true;
        allNgos.push(ngoAddress);
    }
    
    function makeNGOAdmin(address ngoAddress) public requireAdministrativeNGO {
        ngos[ngoAddress].isSysAdmin = true;
    }
	
	function getNGO(address ngoAddress) view public returns(string memory, string memory, bool, bool, bool) {
		return (ngos[ngoAddress].name, ngos[ngoAddress].voNumber, ngos[ngoAddress].isSet, ngos[ngoAddress].isApproved, ngos[ngoAddress].isSysAdmin);
	}

    function registerIndustry(string memory code, string memory description) public requireAdministrativeNGO {
        bytes32 id = keccak256(abi.encodePacked(msg.sender, code, description));

        industries[id].id = id;
        industries[id].code = code;
        industries[id].description = description;
        industries[id].isSet = true;
        
        allIndustries.push(id);
    }

    function getIndustry(bytes32 industryId) view public returns(bytes32, string memory, string memory, bool) {
        return (industries[industryId].id, industries[industryId].code, industries[industryId].description, industries[industryId].isSet);
    }

    function getAllIndustries() view public returns(bytes32[] memory) {
        return allIndustries;
    }

    function registerBeneficiary(address beneficieryAddress, bytes32[] memory chosenIndustries) public {
        beneficiaries[beneficieryAddress].industries = chosenIndustries;
        beneficiaries[beneficieryAddress].isSet = true;
        beneficiaries[beneficieryAddress].isApproved = false;
    }

    function approveBeneficiary(address beneficiaryAddress) public requireAdministrativeNGO {
        beneficiaries[beneficiaryAddress].isApproved = true;
        allBeneficiaries.push(beneficiaryAddress);
        beneficiariesApprovedByNgo[msg.sender].push(beneficiaryAddress);
        ngoApprovalForBeneficiary[beneficiaryAddress].push(msg.sender);
    }

    function getBeneficiary(address beneficiaryAddress) view public returns(bytes32[] memory, bool, bool) {
        return (beneficiaries[beneficiaryAddress].industries, beneficiaries[beneficiaryAddress].isSet, beneficiaries[beneficiaryAddress].isApproved);
    }

    function getBeneficiariesApprovedByNGO(address ngo) view public returns(address[] memory) {
        return beneficiariesApprovedByNgo[ngo];
    }

    function getNGOApprovalsForBeneficiaries(address beneficiary) view public returns(address[] memory) {
        return ngoApprovalForBeneficiary[beneficiary];
    }

    function registerBenefactor(address benefactorAddress, string memory name, bytes32[] memory chosenIndustries) public {
        benefactors[benefactorAddress].name = name;
        benefactors[benefactorAddress].industries = chosenIndustries;
        benefactors[benefactorAddress].isSet = true;
        
        allBenefactors.push(benefactorAddress);
    }

    function getBenefactor(address benefactorAddress) view public returns(string memory, bytes32[] memory, bool) {
        return (benefactors[benefactorAddress].name, benefactors[benefactorAddress].industries, benefactors[benefactorAddress].isSet);
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