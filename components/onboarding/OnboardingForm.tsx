"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@supabase/ssr";
import { AnimatePresence, motion } from "framer-motion";
import { OnboardingHeader } from "./OnboardingHeader";
import { OnboardingSidebar } from "./OnboardingSidebar";
import { Step1Business } from "./steps/Step1Business";
import { Step2Contact } from "./steps/Step2Contact";
import { Step3Services } from "./steps/Step3Services";
import { Step4Financial } from "./steps/Step4Financial";
import { Step5Compliance } from "./steps/Step5Compliance";
import { Step6Package } from "./steps/Step6Package";
import { Step7Summary } from "./steps/Step7Summary";
import { Step8Confirmation } from "./steps/Step8Confirmation";
import { onboardingSchema, type OnboardingFormData, stepFields, type Package } from "./onboarding-types";

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const methods = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { country: "Ghana", services: [] },
  });

  const { trigger, getValues } = methods;

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    supabase
      .from("packages")
      .select("*")
      .eq("is_active", true)
      .order("price_ghs", { ascending: true, nullsFirst: false })
      .then(({ data }) => {
        setPackages(data ?? []);
        setPackagesLoading(false);
      });
  }, []);

  const handleNext = async () => {
    const fields = stepFields[currentStep as keyof typeof stepFields];
    if (fields) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    setCurrentStep((s) => s + 1);
  };

  const handleFinalSubmit = async () => {
    const valid = await trigger();
    if (!valid) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/onboarding/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getValues()),
      });
      const body = await res.json();
      if (!res.ok) { setSubmitError(body.error ?? "Something went wrong."); return; }
      setCurrentStep(7);
    } catch {
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = Math.min(((currentStep + 1) / 6) * 100, 100);
  const showNavButtons = currentStep < 6;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-off flex flex-col">
        <OnboardingHeader />
        <div className="flex flex-1">
          <OnboardingSidebar currentStep={currentStep} />
          <main id="main-content" className="flex-1 flex flex-col min-w-0">
            <div
              className="h-[3px] bg-line"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Form completion progress"
            >
              <div
                className="h-full bg-gold transition-all duration-500 ease-premium"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-4 md:px-10 py-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex-1"
                >
                  {currentStep === 0 && <Step1Business />}
                  {currentStep === 1 && <Step2Contact />}
                  {currentStep === 2 && <Step3Services />}
                  {currentStep === 3 && <Step4Financial />}
                  {currentStep === 4 && <Step5Compliance />}
                  {currentStep === 5 && <Step6Package packages={packages} packagesLoading={packagesLoading} />}
                  {currentStep === 6 && <Step7Summary data={getValues()} packages={packages} onBack={() => setCurrentStep(5)} onSubmit={handleFinalSubmit} submitting={submitting} submitError={submitError} />}
                  {currentStep === 7 && <Step8Confirmation contactName={getValues("contactName")} />}
                </motion.div>
              </AnimatePresence>

              {showNavButtons && (
                <div className="mt-8 pt-6 border-t border-line flex items-center gap-3">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((s) => s - 1)}
                      className="px-6 py-3 text-ui text-body border border-line rounded-lg hover:border-navy hover:text-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy min-h-[44px]"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 text-ui font-semibold text-white bg-gold rounded-lg hover:bg-gold-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 min-h-[44px] ml-auto"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>

            <footer className="border-t border-line px-4 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 bg-white">
              <p className="text-xs text-body">© 2026 Erano Consulting</p>
              <div className="flex gap-5">
                <a href="/legal/privacy" className="text-xs text-body hover:text-navy transition-colors">Privacy Policy</a>
                <a href="/legal/terms" className="text-xs text-body hover:text-navy transition-colors">Terms</a>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </FormProvider>
  );
}
