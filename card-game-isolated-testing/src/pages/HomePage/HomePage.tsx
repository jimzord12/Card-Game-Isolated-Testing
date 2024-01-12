import { Link } from "react-router-dom";
import { useCallback } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { useMutation } from "@tanstack/react-query";
import { loginWithWallet } from "../../../api/apiFns";

const HomePage = () => {
  const auth = useAuth();
  // const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const randomWalletAddress = "0x8b3fea985a9352ffb3aee9398b2fc1f46f57bb5c";

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: (walletAddress: string) => loginWithWallet(walletAddress),
    onSuccess: (data) => {
      // Handle successful login
      console.log("🐱‍🏍 - The Received Data: ", data);
      auth.login(data);
      // auth.login(data); // Assuming you have a login function in your auth context
    },
    onError: (error) => {
      // Handle error
      console.error("⛔ - Login error: ", error);
    },
  });

  const fakeLogin = useCallback(() => {
    // setWalletAddress(randomWalletAddress);
    loginMutation(randomWalletAddress);
  }, [loginMutation, randomWalletAddress]);

  if (isPending) return <div style={{ fontSize: 24 }}>Loading...</div>;

  if (error) return <div style={{ fontSize: 24 }}>{error.message}</div>;

  return (
    <div>
      <h1 style={{ color: auth.user?.wallet ? "green" : "" }}>HomePage</h1>
      <Link to={"/game"}>Go to Game</Link>
      <br />
      <button onClick={fakeLogin}>Login</button>
    </div>
  );
};

export default HomePage;
