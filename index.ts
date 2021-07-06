import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import Keep3rV2Helper from './artifacts/contracts/Keep3rV2Helper.sol/Keep3rV2Helper.json'
import Keep3rV1Library from './artifacts/contracts/Keep3rV1.sol/Keep3rV1Library.json'
import Keep3rV1 from './artifacts/contracts/Keep3rV1.sol/Keep3rV1.json'

export const keep3rV1DeployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, governor } = await hre.getNamedAccounts();
  console.debug('Deployer:', deployer);
  console.debug('Governor:', governor);

  const keep3rV2Helper = await hre.deployments.deploy('Keep3rV2Helper', {
    contract: Keep3rV2Helper,
    from: deployer,
    args: [],
    log: true,
  });

  const keep3rV1Library = await hre.deployments.deploy('Keep3rV1Library', {
    from: governor,
    contract: Keep3rV1Library
  });

  await hre.deployments.deploy('Keep3rV1', {
    contract: Keep3rV1,
    from: governor,
    args: [keep3rV2Helper.address],
    libraries: {
      Keep3rV1Library: keep3rV1Library.address
    },
    log: true,
  });
};

keep3rV1DeployFunction.tags = ['Keep3rV1'];

export default keep3rV1DeployFunction;