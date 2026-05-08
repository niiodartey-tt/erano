import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { baseUrl, styles } from "./utils";

export interface AccountReactivatedEmailProps {
  contactName: string;
  expiresAt: string;
}

export const subject = "Your account has been reactivated";

export function AccountReactivatedEmail({ contactName, expiresAt }: AccountReactivatedEmailProps) {
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
            <Text style={styles.h1}>Your account has been reactivated, {contactName}</Text>
            <Text style={styles.text}>
              A new 5 business day payment window has started. It closes on {expiresAt}.
            </Text>
            <Text style={styles.text}>Log in to complete your payment.</Text>
            <Button href={`${baseUrl}/portal/payments`} style={styles.button}>View payment details</Button>
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
