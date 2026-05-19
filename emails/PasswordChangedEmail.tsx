import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { styles } from "./utils";

export interface PasswordChangedEmailProps {
  contactName: string;
}

export const subject = "Your password has been changed — Erano Consulting";

export function PasswordChangedEmail({ contactName }: PasswordChangedEmailProps) {
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
            <Text style={styles.h1}>Password changed successfully</Text>
            <Text style={styles.text}>
              Hi {contactName}, your Erano Consulting account password was successfully changed.
              If you did not make this change, please contact us immediately at ray.ankrah@eranoconsulting.com or via WhatsApp.
            </Text>
            <Button href="https://wa.me/233275819606" style={styles.button}>Contact us</Button>
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
