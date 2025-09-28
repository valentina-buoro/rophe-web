import { CONTRACT_CONFIG } from "./CONTRACT_CONFIG";
import { useWalletStore } from "@/lib/walletStore";

export class ContractService {
  private mockState = { ...CONTRACT_CONFIG.mockState };

  async callFunction(functionName: string, params: any[] = []): Promise<any> {
    const { walletState } = useWalletStore.getState();

    if (!walletState?.address) {
      alert("Wallet not connected");
      throw new Error("Wallet not connected");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    // Mock function logic here
    switch (functionName) {
      case "add_medication":
        this.mockState.medication_count++;
        // Mock storing medication details
        return { success: true, message: "Medication added successfully" };
      case "update_medication":
        return { success: true, message: "Medication updated successfully" };
      case "remove_medication":
        this.mockState.medication_count--;
        return { success: true, message: "Medication removed successfully" };
      case "add_mood":
        this.mockState.mood_count++;
        // Mock storing mood details
        return { success: true, message: "Mood added successfully" };
      case "update_mood":
        return { success: true, message: "Mood updated successfully" };
      case "remove_mood":
        this.mockState.mood_count--;
        return { success: true, message: "Mood removed successfully" };
      case "transfer_ownership":
        this.mockState.owner_id = params[0];
        return { success: true, message: "Ownership transferred successfully" };
      case "view_medication":
        return {
          success: true,
          message: "Medication details viewed (off-chain)",
        };
      default:
        throw new Error(
          `Function ${functionName} not implemented in mock service`
        );
    }
  }

  getState() {
    return { ...this.mockState };
  }
}

export const contractService = new ContractService();
