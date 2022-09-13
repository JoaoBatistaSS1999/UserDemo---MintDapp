/** Switches the network and request the user to add it if he/she doesnt have it already*/
export const switchToPolygon = async () => {
  try {
    // try to switch it
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x89" }],
    });
  } catch (error) {
    // request to add it they dont have it

    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x89",
              chainName: "Polygon - Mainnet",
              nativeCurrency: {
                name: "Matic",
                symbol: "MATIC",
                decimals: 18,
              },
              blockExplorerUrls: ["https://polygonscan.com/"],
              rpcUrls: ["https://polygon-rpc.com"],
            },
          ],
        });
      } catch (addError) {
        console.log(
          "You denied the request to add the contract's chain to you wallet. Please, add it an try again"
        );
      }
      return;
    }
    console.log("Changing to chain failed, please try again");
  }
};
