import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { baseUrl, styles } from "./utils";

export interface AgreementAcceptedEmailProps {
  contactName: string;
  packageName: string;
  expiresAt?: string | null;
}

export const subject = "Agreement accepted — payment instructions";

export function AgreementAcceptedEmail({ contactName, packageName, expiresAt }: AgreementAcceptedEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{subject}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.headerText}>Erano Consulting</Text>
          </Section>
          <Section style={styles.section}>
            <Text style={styles.h1}>Thank you for accepting the agreement, {contactName}</Text>
            <Text style={styles.text}>
              Your {packageName} service agreement has been accepted.
            </Text>
            {expiresAt ? (
              <>
                <Text style={styles.text}>
                  You have 5 business days to complete payment. Your payment window closes on {expiresAt}.
                </Text>
                <Text style={styles.text}>
                  Log in to your portal to view your bank payment details and upload your proof of payment.
                </Text>
                <Button href={`${baseUrl}/portal/payments`} style={styles.button}>View payment details</Button>
              </>
            ) : (
              <Text style={styles.text}>
                Your account has been activated. Our team will be in touch shortly.
              </Text>
            )}
          </Section>
          <Section style={styles.footer}>
            <Text style={styles.footerText}>© 2026 Erano Consulting · Accra, Ghana</Text>
            <Text style={styles.footerText}>
              <Link href={`${baseUrl}/privacy`} style={styles.footerLink}>Privacy Policy</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
