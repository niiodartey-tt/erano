import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { styles } from "./utils";

export interface ServiceExpiryReminderEmailProps {
  contactName:    string;
  packageName:    string;
  expiresOn:      string;
  daysRemaining:  number;
  renewalUrl:     string;
}

export const subject = (daysRemaining: number) =>
  `Your Erano service expires in ${daysRemaining} days`;

export function ServiceExpiryReminderEmail({
  contactName, packageName, expiresOn, daysRemaining, renewalUrl,
}: ServiceExpiryReminderEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{subject(daysRemaining)}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.headerText}>Erano Consulting</Text>
          </Section>
          <Section style={styles.section}>
            <Text style={styles.h1}>Your service is expiring soon, {contactName}</Text>
            <Text style={styles.text}>
              Your <strong>{packageName}</strong> service with Erano Consulting expires on{" "}
              <strong>{expiresOn}</strong>. To ensure uninterrupted service, please contact us to
              discuss renewal.
            </Text>
            <Button href={renewalUrl} style={styles.button}>Contact us to renew</Button>
            <Text style={styles.small}>
              If you have already arranged renewal, please disregard this message.
            </Text>
          </Section>
          <Section style={styles.footer}>
            <Text style={styles.footerText}>© 2026 Erano Consulting · Accra, Ghana</Text>
            <Text style={styles.footerText}>
              <Link href="https://erano.vercel.app/legal/privacy" style={styles.footerLink}>Privacy Policy</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
