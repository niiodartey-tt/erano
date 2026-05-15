import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { baseUrl, styles } from "./utils";

export interface AccountExpiredEmailProps {
  contactName: string;
}

export const subject = "Your payment window has closed";

export function AccountExpiredEmail({ contactName }: AccountExpiredEmailProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "233275819606";

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
            <Text style={styles.h1}>Your payment window has closed, {contactName}</Text>
            <Text style={styles.text}>
              The 5 business day payment window for your Erano Consulting account has elapsed.
            </Text>
            <Text style={styles.text}>
              Your account has been temporarily locked. Please contact us to reactivate your account.
            </Text>
            <Button href={`https://wa.me/${whatsappNumber}`} style={styles.button}>
              Contact us on WhatsApp
            </Button>
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
