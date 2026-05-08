import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { baseUrl, styles } from "./utils";

export interface PaymentRejectedEmailProps {
  contactName: string;
  reason: string;
}

export const subject = "Payment proof — action required";

export function PaymentRejectedEmail({ contactName, reason }: PaymentRejectedEmailProps) {
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
            <Text style={styles.h1}>Your payment proof could not be verified, {contactName}</Text>
            <Text style={styles.text}>
              <strong>Reason:</strong> {reason}
            </Text>
            <Text style={styles.text}>
              Please log in and upload a new proof of payment. Your payment window is still active.
            </Text>
            <Button href={`${baseUrl}/portal/payments`} style={styles.button}>Re-upload proof</Button>
            <Text style={styles.small}>
              If you believe this is an error, please contact us via WhatsApp.
            </Text>
          </Section>
          <Section style={styles.footer}>
            <Text style={styles.footerText}>© 2026 Erano Consulting · Accra, Ghana</Text>
            <Text style={styles.footerText}>
              <Link href={`${baseUrl}/legal/privacy`} style={styles.footerLink}>Privacy Policy</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
