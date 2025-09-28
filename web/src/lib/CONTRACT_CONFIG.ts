export const CONTRACT_CONFIG = {
    name: "MedicationTracker",
    address: "medication_tracker_contract_address_placeholder", // Replace with deployed contract address
    functions: {
      add_medication: {
        name: "add_medication",
        params: ["user_id", "medication_id", "medication_name", "dosage", "frequency", "side_effects"],
        returns: "void",
        description: "Adds a new medication entry"
      },
      update_medication: {
        name: "update_medication",
        params: ["user_id", "medication_id", "medication_name", "dosage", "frequency", "side_effects"],
        returns: "void",
        description: "Updates an existing medication entry"
      },
      remove_medication: {
        name: "remove_medication",
        params: ["user_id", "medication_id"],
        returns: "void",
        description: "Removes a medication entry"
      },
      view_medication: {
        name: "view_medication",
        params: ["user_id", "medication_id"],
        returns: "void",
        description: "Views medication details (off-chain)"
      },
      add_mood: {
        name: "add_mood",
        params: ["user_id", "mood_id", "mood", "intensity", "note"],
        returns: "void",
        description: "Adds a new mood entry"
      },
      update_mood: {
        name: "update_mood",
        params: ["user_id", "mood_id", "mood", "intensity", "note"],
        returns: "void",
        description: "Updates an existing mood entry"
      },
      remove_mood: {
        name: "remove_mood",
        params: ["user_id", "mood_id"],
        returns: "void",
        description: "Removes a mood entry"
      },
      transfer_ownership: {
        name: "transfer_ownership",
        params: ["new_owner"],
        returns: "void",
        description: "Transfers contract ownership"
      }
    },
    mockState: {
      medication_count: 0,
      mood_count: 0,
      owner_id: 0,
      medication_names: {},
      dosages: {},
      frequencies: {},
      side_effects: {},
      moods: {},
      intensities: {},
      notes: {}
    }
  };
  