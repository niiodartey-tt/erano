import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { styles } from "./utils";

export interface DocumentUploadedEmailProps {
  clientName: string;
  businessName: string;
  documentTitle: string;
  adminUrl: string;
}

export const subject = (businessName: string) => `Document uploaded — ${businessName}`;

export function DocumentUploadedEmail({ clientName, businessName, documentTitle, adminUrl }: DocumentUploadedEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Document uploaded — {businessName}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.headerText}>Erano Consulting</Text>
          </Section>
          <Section style={styles.section}>
            <Text style={styles.h1}>A client has uploaded a document</Text>
            <Text style={styles.text}>
              <strong>Client:</strong> {clientName} ({businessName})
            </Text>
            <Text style={styles.text}>
              <strong>Document:</strong> {documentTitle}
            </Text>
            <Button href={adminUrl} style={styles.button}>View document</Button>
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
