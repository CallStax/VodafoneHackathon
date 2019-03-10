pragma solidity ^0.5.0;

contract Ghajnuna{
    
    //Structs
    struct NGO {
        address ngoAddress;
        string name;
        string voNumber;
        string email;
        uint phone;
        uint mobile;
        bytes32[] industries;
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
        address beneficieryAddres;
        bytes32[] industries;
        bool isSet;
        bool isApproved;
        address[] approvedBy;
    }
    
    struct Benefactor {
        address benefactorAddress;
        string company;
        string email;
        uint phone;
        uint mobile; 
        bytes32[] industries;
        bool isSet;
        bool isApproved;
        address[] approvedBy;
    }
    
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

    //Approved benefactors
    //mapping(address(NGO) => address[](benefactors))
    mapping(address => address[]) private benefactorsApprovedByNgo; //List of NGOs that have onboarded the Benefactors
    //mapping(address(Benefactors) => address[](NGOs))
    mapping(address => address[]) private ngoApprovalForBenefactors; //List of NGOs that have onboarded the benefactors

    //Events
    event ngoRequested(address ngoAddress, string ngoName, string voNumber, string email, uint phone, uint mobile, bytes32[] industries, bool isSet, bool isApproved, bool isSysAdmin);
    event ngoApproved(address ngoAddress);
    event ngoMadeAdmin(address ngoAddress);
    event industryRegistered(bytes32 industryId, string code, string description, bool isSet);
    event beneficieryRegistered(address beneficieryAddress, bytes32[] chosenIndustries, bool isSet, bool isApproved);
    event beneficieryApproved(address beneficieryAddress);
    event benefactorRegistered(address benefactorAddress, string company, string email, string phone, string mobile, bytes32[] chosenIndustries, bool isSet, bool isApproved);
    event benefactorApproved(address benefactorAddress);

    //Constructor
    constructor(string memory ngoName, string memory voNumber) public {
        //Set contract creator as an Administrative NGO    
        ngos[msg.sender].name = ngoName;
        ngos[msg.sender].voNumber = voNumber;
        ngos[msg.sender].isSet = true;
        ngos[msg.sender].isApproved = true;
        ngos[msg.sender].isSysAdmin = true;

        allNgos.push(msg.sender);
    }
    
    //Functions for NGOs
    function requestNGO(address ngoAddress, string memory ngoName, string memory voNumber, string memory email, uint phone, uint mobile, bytes32[] memory industry) public requireAdministrativeNGO {
        ngos[ngoAddress].ngoAddress = ngoAddress;
        ngos[ngoAddress].name = ngoName;
        ngos[ngoAddress].voNumber = voNumber;
        ngos[ngoAddress].email = email;
        ngos[ngoAddress].phone = phone;
        ngos[ngoAddress].mobile = mobile;
        ngos[ngoAddress].industries = industries;
        ngos[ngoAddress].isSet = true;
        ngos[ngoAddress].isApproved = false;
        ngos[ngoAddress].isSysAdmin = false;

        emit ngoRequested(ngoAddress, ngoName, voNumber, email, phone, number, industries, true, false, false);
    }

    function approveNGO(address ngoAddress) public requireAdministrativeNGO {
        ngos[ngoAddress].isApproved = true;
        allNgos.push(ngoAddress);

        emit ngoApproved(ngoAddress);
    }
    
    function makeNGOAdmin(address ngoAddress) public requireAdministrativeNGO {
        ngos[ngoAddress].isSysAdmin = true;

        emit ngoMadeAdmin(ngoAddress);
    }
	
	function getNGO(address ngoAddress) view public returns(address, string memory, string memory, string memory, uint, uint, bytes32[], bool, bool, bool) {
		return (ngos[ngoAddress].name, ngos[ngoAddress].voNumber, ngos[ngoAddress].isSet, ngos[ngoAddress].isApproved, ngos[ngoAddress].isSysAdmin);
	}

    function getNGOs() view public returns(address[] memory){
	    return allNgos;
	}

    //Functions for industries
    function registerIndustry(string memory code, string memory description) public requireNGOOrBenefactor {
        bytes32 id = keccak256(abi.encodePacked(msg.sender, code, description));

        industries[id].id = id;
        industries[id].code = code;
        industries[id].description = description;
        industries[id].isSet = true;
        
        allIndustries.push(id);

        emit industryRegistered(id, code, description, isSet);
    }

    function getIndustry(bytes32 industryId) view public returns(bytes32, string memory, string memory, bool) {
        return (industries[industryId].id, industries[industryId].code, industries[industryId].description, industries[industryId].isSet);
    }

    function getIndustries() view public returns(bytes32[] memory) {
        return allIndustries;
    }

    //Functions for beneficeries
    function registerBeneficiary(address beneficieryAddress, bytes32[] memory chosenIndustries) public {
        beneficiaries[beneficieryAddress].beneficieryAddress = beneficieryAddress;
        beneficiaries[beneficieryAddress].industries = chosenIndustries;
        beneficiaries[beneficieryAddress].isSet = true;
        beneficiaries[beneficieryAddress].isApproved = false;

        emit beneficieryRegistered(beneficieryAddress, chosenIndustries, true, false);
    }

    function approveBeneficiary(address beneficiaryAddress) public requireNGO {
        beneficiaries[beneficiaryAddress].isApproved = true;
        allBeneficiaries.push(beneficiaryAddress);
        beneficiariesApprovedByNgo[msg.sender].push(beneficiaryAddress);
        ngoApprovalForBeneficiary[beneficiaryAddress].push(msg.sender);

        emit beneficieryApproved(beneficieryAddress);
    }

    function getBeneficiary(address beneficiaryAddress) view public returns(address, bytes32[] memory, bool, bool, address[]) {
        return (beneficiaries[beneficiaryAddress].industries, beneficiaries[beneficiaryAddress].isSet, beneficiaries[beneficiaryAddress].isApproved, beneficeries[beneficiaryAddress].approvedBy);
    }

    function getBeneficieries() view public returns(address[] memory){
        return allBeneficiaries;
    }

    function getBeneficiariesApprovedByNGO(address ngo) view public returns(address[] memory) {
        return beneficiariesApprovedByNgo[ngo];
    }

    function getNGOApprovalsForBeneficiaries(address beneficiary) view public returns(address[] memory) {
        return ngoApprovalForBeneficiary[beneficiary];
    }

    //Functions for benefactors
    function registerBenefactor(address benefactorAddress, string memory company, string memory email, uint phone, uint mobile, bytes32[] memory chosenIndustries) public {
        benefactors[benefactorAddress].benefactorAddress = benefactorAddress;
        benefactors[benefactorAddress].company = company;
        benefactors[benefactorAddress].email = email;
        benefactors[benefactorAddress].phone = phone;
        benefactors[benefactorAddress].mobile = mobile;
        benefactors[benefactorAddress].industries = chosenIndustries;
        benefactors[benefactorAddress].isSet = true;
        benefactors[benefactorAddress].isApproved = false;

        emit benefactorRegistered(benefactorAddress, company, email, phone, mobile, chosenIndustries, true, false);
    }

    function approveBenefactor(address benefactorAddress) public requireNGO {
        benefactors[benefactorAddress].isApproved = true;
        allBenefactors.push(benefactorAddress);
        benefactorsApprovedByNgo[msg.sender].push(benefactorAddress);
        ngoApprovalForBenefactors[benefactorAddress].push(msg.sender);

        emit benefactorApproved(benefactorAddress);
    }

    function getBenefactor(address benefactorAddress) view public returns(address, string memory, string memory, uint, uint, bytes32[] memory, bool, bool, address[] memory){
        return (benefactors[benefactorAddress].benefactorAddress, benefactors[benefactorAddress].company, benefactors[benefactorAddress].email, benefactors[benefactorAddress].phone, benefactors[benefactorAddress].mobile, benefactors[benefactorAddress].industries, benefactors[benefactorAddress].isSet, benefactors[benefactorAddress].isApproved, benefactors[benefactorAddress].approvedBy);
    }

    function getBenefactors() view public returns(address[]){
        return allBenefactors;
    }
    
    //Modifiers
    modifier requireNGO(){
        require((ngos[msg.sender].isSet && ngos[msg.sender].isApproved), "Only NGOs are able to run this function");
        _;
    }
    
    modifier requireAdministrativeNGO(){
        require((ngos[msg.sender].isSet && ngos[msg.sender].isApproved && ngos[msg.sender].isSysAdmin), "Only Admin NGOs are able to run this function");
        _;
    }
    
    modifier requireBenefactor(){
        require((benefactors[msg.sender].isSet), "Only Benefactors are able To run this function");
        _;
    }

    modifier requireNGOOrBenefactor(){
        require(((ngos[msg.sender].isSet && ngos[msg.sender].isApproved) || (benefactors[msg.sender].isSet)), "Only NGOs or Benefactors are able to run this function")
    }
    
    modifier requireBeneficiary(){
        require((beneficieries[msg.sender].isSet && beneficieries[msg.sender].isApproved), "Only Beneficiaries are able to run this function");
        _;
    }
}