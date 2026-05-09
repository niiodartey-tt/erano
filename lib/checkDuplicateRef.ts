// SERVER SIDE ONLY — never import in client components
import { createServerClient } from "@/lib/supabase-server";

export async function checkDuplicateTransactionRef(reference: string): Promise<boolean> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("payment_proofs")
    .select("id")
    .ilike("transaction_reference", reference)
    .limit(1);

  if (error) throw new Error("Failed to check transaction reference");
  return (data?.length ?? 0) > 0;
}
