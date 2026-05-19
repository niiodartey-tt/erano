import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { baseUrl, styles } from "./utils";

export interface PaymentConfirmedEmailProps {
  contactName: string;
  packageName: string;
}

export const subject = "Payment confirmed — your account is now active";

export function PaymentConfirmedEmail({ contactName, packageName }: PaymentConfirmedEmailProps) {
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
            <Text style={styles.h1}>Great news, {contactName}!</Text>
            <Text style={styles.text}>
              Your payment has been confirmed and your {packageName} account is now active.
            </Text>
            <Text style={styles.text}>
              You now have full access to your Erano Consulting client portal.
            </Text>
            <Button href={`${baseUrl}/portal/dashboard`} style={styles.button}>Access my portal</Button>
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
