// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract AttestationStation is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // Event declarations
    event ProductAdded(uint256 productId, string name, string companyName, string description, string email);
    event FeatureAdded(uint256 productId, uint256 featureId, string description);
    event AttestationAdded(address indexed user, uint256 attestationId);
    event AttestationRevoked(address indexed user, uint256 attestationId);
    event RequirementsUpdated(uint256 featureId, uint256[] requiredAttestations);

    struct Product {
        uint256 id;
        string name;
        string companyName;
        string description;
        string email;
        mapping(uint256 => Feature) features;
        uint256 featureCount;
    }

    struct Feature {
        uint256 id;
        string description;
        uint256[] requiredAttestations;
    }

    Product[] public products;

    // Mapping from user addresses to their attestations
    mapping(address => mapping(uint256 => bool)) public userAttestations;

    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function addProduct(
        string memory name,
        string memory companyName,
        string memory description,
        string memory email,
        string[] memory featureDescriptions,
        uint256[][] memory requiredAttestations
    ) public onlyRole(ADMIN_ROLE) {
        products.push();
        uint256 productId = products.length - 1;

        Product storage product = products[productId];
        product.id = productId;
        product.name = name;
        product.companyName = companyName;
        product.description = description;
        product.email = email;
        product.featureCount = 0;

        for (uint256 i = 0; i < featureDescriptions.length; i++) {
            addFeatureToProductInternal(productId, featureDescriptions[i], requiredAttestations[i]);
        }

        emit ProductAdded(productId, name, companyName, description, email);
    }

    function addFeatureToProduct(uint256 productId, string memory description, uint256[] memory requiredAttestations)
        public
        onlyRole(ADMIN_ROLE)
    {
        addFeatureToProductInternal(productId, description, requiredAttestations);
    }

    function addFeatureToProductInternal(uint256 productId, string memory description, uint256[] memory requiredAttestations)
        internal
    {
        require(productId < products.length, "Product does not exist");
        Product storage product = products[productId];
        product.features[product.featureCount] =
            Feature({id: product.featureCount, description: description, requiredAttestations: requiredAttestations});
        emit FeatureAdded(productId, product.featureCount, description);
        product.featureCount++;
    }

    // Function to add an attestation to a user
    function addAttestation(address user, uint256 attestationId) public onlyRole(ADMIN_ROLE) {
        userAttestations[user][attestationId] = true;
        emit AttestationAdded(user, attestationId);
    }

    // Function to revoke an attestation from a user
    function revokeAttestation(address user, uint256 attestationId) public onlyRole(ADMIN_ROLE) {
        userAttestations[user][attestationId] = false;
        emit AttestationRevoked(user, attestationId);
    }

    // Function to check if a user has the required attestations for a feature
    function hasAccess(address user, uint256 productId, uint256 featureId) public view returns (bool) {
        require(
            productId < products.length && featureId < products[productId].featureCount, "Invalid product or feature ID"
        );
        Feature storage feature = products[productId].features[featureId];
        for (uint256 i = 0; i < feature.requiredAttestations.length; i++) {
            if (!userAttestations[user][feature.requiredAttestations[i]]) {
                return false;
            }
        }
        return true;
    }

    // Function to update attestation requirements for a feature
    function updateFeatureRequirements(uint256 productId, uint256 featureId, uint256[] calldata newRequirements)
        public
        onlyRole(ADMIN_ROLE)
    {
        require(
            productId < products.length && featureId < products[productId].featureCount, "Invalid product or feature ID"
        );
        Feature storage feature = products[productId].features[featureId];
        feature.requiredAttestations = newRequirements;
        emit RequirementsUpdated(featureId, newRequirements);
    }

    // Function to get the number of products
    function getProductCount() public view returns (uint256) {
        return products.length;
    }

    // Function to get product details by index
    function getProduct(uint256 productId) public view returns (uint256, string memory, string memory, string memory, string memory, uint256) {
        require(productId < products.length, "Product does not exist");
        Product storage product = products[productId];
        return (product.id, product.name, product.companyName, product.description, product.email, product.featureCount);
    }

    // Function to get feature details by product and feature index
    function getFeature(uint256 productId, uint256 featureId) public view returns (uint256, string memory, uint256[] memory) {
        require(productId < products.length, "Product does not exist");
        Product storage product = products[productId];
        require(featureId < product.featureCount, "Feature does not exist");
        Feature storage feature = product.features[featureId];
        return (feature.id, feature.description, feature.requiredAttestations);
    }
}
