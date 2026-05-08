// SERVER SIDE ONLY — call this at the start of every portal API route handler

import { createServerClient } from "@/lib/supabase-server";

export type AccountState =
  | "pending"
  | "awaiting_agreement"
  | "awaiting_payment"
  | "awaiting_confirmation"
  | "active"
  | "expired";

export class StateValidationError extends Error {
  constructor(
    public readonly currentState: AccountState,
    public readonly allowedStates: AccountState[],
  ) {
    super("ACTION_NOT_ALLOWED_IN_CURRENT_STATE");
    this.name = "StateValidationError";
  }
}

export async function requireState(
  userId: string,
  allowedStates: AccountState[],
): Promise<AccountState> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("users")
    .select("account_state")
    .eq("id", userId)
    .single();

  if (error) throw new Error("Failed to fetch account state");
  if (!data) throw new Error("User not found");

  const currentState = data.account_state as AccountState;

  if (!isStateAllowed(currentState, allowedStates)) {
    throw new StateValidationError(currentState, allowedStates);
  }

  return currentState;
}

export function isStateAllowed(
  state: AccountState,
  allowedStates: AccountState[],
): boolean {
  return allowedStates.includes(state);
}
