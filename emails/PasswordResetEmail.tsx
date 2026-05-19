import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { styles } from "./utils";

export interface PasswordResetEmailProps {
  resetUrl: string;
}

export const subject = "Reset your password — Erano Consulting";

export function PasswordResetEmail({ resetUrl }: PasswordResetEmailProps) {
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
            <Text style={styles.h1}>Reset your password</Text>
            <Text style={styles.text}>
              We received a request to reset the password for your Erano Consulting account.
              Click the button below to choose a new password.
            </Text>
            <Button href={resetUrl} style={styles.button}>Reset password</Button>
            <Text style={styles.small}>This link expires in 24 hours.</Text>
            <Text style={styles.small}>
              If you did not request a password reset, please ignore this email. Your password will not change.
            </Text>
          </Section>
          <Section style={styles.footer}>
            <Text style={styles.footerText}>© 2026 Erano Consulting · Accra, Ghana</Text>
            <Text style={styles.footerText}>
              <Link href="https://eranoconsulting.com/privacy" style={styles.footerLink}>Privacy Policy</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
