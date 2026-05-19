import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { baseUrl, styles } from "./utils";

export interface InvoiceReadyEmailProps {
  contactName: string;
  invoiceNumber: string;
  packageName: string;
}

export const subject = (invoiceNumber: string) => `Your invoice is ready — ${invoiceNumber}`;

export function InvoiceReadyEmail({ contactName, invoiceNumber, packageName }: InvoiceReadyEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your invoice is ready — {invoiceNumber}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.headerText}>Erano Consulting</Text>
          </Section>
          <Section style={styles.section}>
            <Text style={styles.h1}>Your invoice is ready, {contactName}</Text>
            <Text style={styles.text}>
              We have prepared invoice {invoiceNumber} for the {packageName} package.
            </Text>
            <Text style={styles.text}>
              Please log in to review your service agreement and invoice.
            </Text>
            <Button href={`${baseUrl}/portal/invoice`} style={styles.button}>View my invoice</Button>
            <Text style={styles.small}>
              You must accept the terms and conditions before payment details are revealed.
            </Text>
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
