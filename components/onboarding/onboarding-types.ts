import { z } from "zod";

export const onboardingSchema = z.object({
  legalName:               z.string().min(2, "Required"),
  tradingName:             z.string().optional(),
  regNumber:               z.string().optional(),
  bizType:                 z.string().min(1, "Required"),
  industry:                z.string().min(1, "Required"),
  country:                 z.string().min(1, "Required"),
  contactName:             z.string().min(2, "Required"),
  contactRole:             z.string().min(2, "Required"),
  contactEmail:            z.string().email("Enter a valid email"),
  contactPhone:            z.string().min(7, "Required"),
  address:                 z.string().min(5, "Required"),
  services:                z.array(z.string()).min(1, "Select at least one service"),
  turnover:                z.string().min(1, "Required"),
  employees:               z.number({ error: "Required" }).min(1, "At least 1"),
  lastAudit:               z.string().optional(),
  hasAccountant:           z.enum(["yes", "no"]),
  graRegistered:           z.enum(["yes", "no"]),
  vatRegistered:           z.enum(["yes", "no"]),
  outstandingObligations:  z.enum(["yes", "no"]),
  packageId:               z.string().min(1, "Please select a package"),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

export const STEPS = [
  { label: "Business information" },
  { label: "Contact details" },
  { label: "Services needed" },
  { label: "Financial profile" },
  { label: "Compliance status" },
  { label: "Package selection" },
];

export const stepFields: Record<number, (keyof OnboardingFormData)[]> = {
  0: ["legalName", "bizType", "industry", "country"],
  1: ["contactName", "contactRole", "contactEmail", "contactPhone", "address"],
  2: ["services"],
  3: ["turnover", "employees", "hasAccountant"],
  4: ["graRegistered", "vatRegistered", "outstandingObligations"],
  5: ["packageId"],
};

export interface Package {
  id: string;
  name: string;
  description: string | null;
  price_ghs: number | null;
  is_active: boolean;
}
