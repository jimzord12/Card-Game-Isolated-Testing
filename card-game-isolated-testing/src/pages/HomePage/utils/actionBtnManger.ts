export const actionBtnManger = (currentStep: number) => {
  switch (currentStep) {
    case 0:
      return {
        text: "Get MetaMask",
        handler: () => {
          window.open("https://metamask.io/", "_blank");
        },
      };
      break;

    case 1:
      return {
        text: "Connect Wallet",
        handler: () => {
          //TODO: Connect Wallet
          // connectMetaMask();
        },
      };
      break;

    case 2:
      return {
        text: "Select Genera Network",
        handler: () => {
          //TODO: Switch Network
          // switchNetwork();
        },
      };
      break;

    case 3:
      return {
        text: "Login with Wallet",
        handler: (e) => {
          //TODO: Login with Wallet
          // handlePlayerLogin2(e);
        },
      };
      break;

    default:
      return { text: "Error!", handler: () => {} };
  }
};
