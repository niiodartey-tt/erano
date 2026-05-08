import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { baseUrl, styles } from "./utils";

export interface WelcomeEmailProps {
  contactName: string;
  magicLinkUrl: string;
}

export const subject = "Welcome to Erano Consulting — activate your account";

export function WelcomeEmail({ contactName, magicLinkUrl }: WelcomeEmailProps) {
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
            <Text style={styles.h1}>Welcome, {contactName}</Text>
            <Text style={styles.text}>
              Your account has been created. Click the button below to set your password and access your portal.
            </Text>
            <Button href={magicLinkUrl} style={styles.button}>Activate my account</Button>
            <Text style={styles.small}>
              This link expires in 24 hours. If it expires, use the Forgot Password link on the login page.
            </Text>
            <Text style={styles.small}>
              If you did not request this account, please ignore this email.
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
