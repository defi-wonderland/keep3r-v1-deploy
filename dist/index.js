"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keep3rV1DeployFunction = void 0;
const Keep3rV2Helper_json_1 = __importDefault(require("./artifacts/contracts/Keep3rV2Helper.sol/Keep3rV2Helper.json"));
const Keep3rV1Library_json_1 = __importDefault(require("./artifacts/contracts/Keep3rV1.sol/Keep3rV1Library.json"));
const Keep3rV1_json_1 = __importDefault(require("./artifacts/contracts/Keep3rV1.sol/Keep3rV1.json"));
const keep3rV1DeployFunction = async function (hre) {
    const { deployer, governor } = await hre.getNamedAccounts();
    console.debug('Deployer:', deployer);
    console.debug('Governor:', governor);
    const keep3rV2Helper = await hre.deployments.deploy('Keep3rV2Helper', {
        contract: Keep3rV2Helper_json_1.default,
        from: deployer,
        args: [],
        log: true,
    });
    const keep3rV1Library = await hre.deployments.deploy('Keep3rV1Library', {
        from: governor,
        contract: Keep3rV1Library_json_1.default
    });
    await hre.deployments.deploy('Keep3rV1', {
        contract: Keep3rV1_json_1.default,
        from: governor,
        args: [keep3rV2Helper.address],
        libraries: {
            Keep3rV1Library: keep3rV1Library.address
        },
        log: true,
    });
};
exports.keep3rV1DeployFunction = keep3rV1DeployFunction;
exports.keep3rV1DeployFunction.tags = ['Keep3rV1'];
exports.default = exports.keep3rV1DeployFunction;
