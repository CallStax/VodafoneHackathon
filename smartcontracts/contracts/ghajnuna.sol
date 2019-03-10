pragma solidity ^0.5.0;

contract Ghajnuna{
    
    //Structs
    struct NGO {
        address ngoAddress;
        string name;
        string voNumber;
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
        string name;
        bytes32[] industries;
        bool isSet;
        bool isApproved;
        address[] approvedBy;
    }

    // struct Course {
        // bytes32 id;
        // string name;
        // string description;
    // }
    
    //NGOs
    address[] private allNgos;
    mapping(address => NGO) private ngos;

    //Industries
    bytes32[] private allIndustries;
    mapping(bytes32 => Industry) private industries;
    
    //Beneficiaries
    address[] private allBeneficiaries;
    mapping(address => Beneficiary) private beneficiaries;
    address[] private beneficiariesPendingApproval;

    //Benefactors
    address[] private allBenefactors;
    mapping(address => Benefactor) private benefactors;
    address[] private benefactorsPendingApproval;
    

    // Courses
    // bytes32[] private allCourses;
    // mapping(bytes32 => Course) private courses;
    // mapping(address => bytes32[]) private coursesTakenByUser;
    
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
    event ngoRegistered(address ngoAddress, string ngoName, string voNumber, bool isSet, bool isApproved, bool isSysAdmin);
    event ngoIndustriesRecevied(address ngoAddress, bytes32[] industries);
    event ngoApproved(address ngoAddress);
    event ngoMadeAdmin(address ngoAddress);
    event industryRegistered(bytes32 industryId, string code, string description, bool isSet);
    event beneficieryRegistered(address beneficieryAddress, bool isSet, bool isApproved);
    event beneficieryApproved(address beneficieryAddress);
    event benefactorRegistered(address benefactorAddress, string name, bool isSet, bool isApproved);
    event benefactorIndustriesReceived(address benefactorAddress, bytes32[] industries);
    event benefactorApproved(address benefactorAddress);
    // event courseCreated(bytes32 id, string name, string description);
    // event userEnrolledToCourse(address userAddress, bytes32 courseId);

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
    function requestNGO(string memory ngoName, string memory voNumber) public {
        ngos[msg.sender].ngoAddress = msg.sender;
        ngos[msg.sender].name = ngoName;
        ngos[msg.sender].voNumber = voNumber;
        ngos[msg.sender].isSet = true;
        ngos[msg.sender].isApproved = false;
        ngos[msg.sender].isSysAdmin = false;

        emit ngoRegistered(msg.sender, ngoName, voNumber, true, false, false);
    }

    function updateNGOIndustries(bytes32[] memory chosenIndustries) public {
        require(ngos[msg.sender].isSet);

        ngos[msg.sender].industries = chosenIndustries;

        emit ngoIndustriesRecevied(msg.sender, chosenIndustries);
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
	
	function getNGO(address ngoAddress) view public returns(address, string memory, string memory, bool, bool, bool) {
		return (
            ngos[ngoAddress].ngoAddress,
            ngos[ngoAddress].name,
            ngos[ngoAddress].voNumber,
            ngos[ngoAddress].isSet,
            ngos[ngoAddress].isApproved,
            ngos[ngoAddress].isSysAdmin);
	}

    function getNGOs() view public returns(address[] memory){
	    return allNgos;
	}

    //Functions for industries
    function registerIndustry(string memory code, string memory description) public requireNGOOrBenefactor {
        bytes32 id = keccak256(abi.encodePacked(msg.sender, code, description));
		
		require(industries[id].isSet == false, 'Industry is already set');

        industries[id].id = id;
        industries[id].code = code;
        industries[id].description = description;
        industries[id].isSet = true;
        
        allIndustries.push(id);

        emit industryRegistered(id, code, description, true);
    }

    function getIndustry(bytes32 industryId) view public returns(string memory, string memory) {
		require(industries[industryId].isSet);
        return (industries[industryId].code, industries[industryId].description);
    }

    function getIndustries() view public returns(bytes32[] memory) {
        return allIndustries;
    }

    //Functions for beneficeries
    function requestBeneficiary(address beneficieryAddress, bytes32[] memory chosenIndustries) public {
        beneficiaries[beneficieryAddress].beneficieryAddres = beneficieryAddress;
        beneficiaries[beneficieryAddress].industries = chosenIndustries;
        beneficiaries[beneficieryAddress].isSet = true;
        beneficiaries[beneficieryAddress].isApproved = false;

        emit beneficieryRegistered(beneficieryAddress, true, false);
    }

    function approveBeneficiary(address beneficiaryAddress) public requireNGO {
        beneficiaries[beneficiaryAddress].isApproved = true;
        allBeneficiaries.push(beneficiaryAddress);

        beneficiaries[beneficiaryAddress].approvedBy.push(msg.sender);
        beneficiariesApprovedByNgo[msg.sender].push(beneficiaryAddress);
        ngoApprovalForBeneficiary[beneficiaryAddress].push(msg.sender);

        emit beneficieryApproved(beneficiaryAddress);
    }

    function getBeneficiary(address beneficiaryAddress) view public returns(address, bytes32[] memory, bool, bool, address[] memory) {
        return (beneficiaries[beneficiaryAddress].beneficieryAddres, beneficiaries[beneficiaryAddress].industries, beneficiaries[beneficiaryAddress].isSet, beneficiaries[beneficiaryAddress].isApproved, beneficiaries[beneficiaryAddress].approvedBy);
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
    function registerBenefactor(address benefactorAddress, string memory name) public {
        benefactors[benefactorAddress].benefactorAddress = benefactorAddress;
        benefactors[benefactorAddress].name = name;
        benefactors[benefactorAddress].isSet = true;
        benefactors[benefactorAddress].isApproved = false;

        emit benefactorRegistered(benefactorAddress, name, true, false);
    }

    function benefactorChosenIndustries(address benefactorAddress, bytes32[] memory chosenIndustries) public {
        require(benefactors[benefactorAddress].isSet);

        benefactors[benefactorAddress].industries = chosenIndustries;

        emit benefactorIndustriesReceived(benefactorAddress, chosenIndustries);
    }

    function approveBenefactor(address benefactorAddress) public requireNGO {
        benefactors[benefactorAddress].isApproved = true;
        allBenefactors.push(benefactorAddress);
        benefactorsApprovedByNgo[msg.sender].push(benefactorAddress);
        ngoApprovalForBenefactors[benefactorAddress].push(msg.sender);

        emit benefactorApproved(benefactorAddress);
    }

    function getBenefactor(address benefactorAddress) view public returns(address, string memory, bytes32[] memory, bool, bool, address[] memory){
        return (benefactors[benefactorAddress].benefactorAddress, benefactors[benefactorAddress].name, benefactors[benefactorAddress].industries, benefactors[benefactorAddress].isSet, benefactors[benefactorAddress].isApproved, benefactors[benefactorAddress].approvedBy);
    }

    function getBenefactors() view public returns(address[] memory){
        return allBenefactors;
    }
	
	function getUserType() view public returns(uint) {
		if (ngos[msg.sender].isSet == true){
			return 1;
		} else if (benefactors[msg.sender].isSet == true){
			return 2;
		} else if (beneficiaries[msg.sender].isSet == true){
			return 3;
		} else {
			return 0;
		}
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
        require(((ngos[msg.sender].isSet && ngos[msg.sender].isApproved) || (benefactors[msg.sender].isSet)), "Only NGOs or Benefactors are able to run this function");
        _;
    }
    
    modifier requireBeneficiary(){
        require((beneficiaries[msg.sender].isSet && beneficiaries[msg.sender].isApproved), "Only Beneficiaries are able to run this function");
        _;
    }
}