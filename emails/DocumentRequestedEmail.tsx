import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { baseUrl, styles } from "./utils";

export interface DocumentRequestedEmailProps {
  contactName: string;
  documentTitle: string;
  description: string;
  category: string;
}

export const subject = (documentTitle: string) => `Document requested — ${documentTitle}`;

export function DocumentRequestedEmail({ contactName, documentTitle, description, category }: DocumentRequestedEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Document requested — {documentTitle}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.headerText}>Erano Consulting</Text>
          </Section>
          <Section style={styles.section}>
            <Text style={styles.h1}>A document has been requested, {contactName}</Text>
            <Text style={styles.text}>
              Erano Consulting has requested the following document from you:
            </Text>
            <table style={styles.table}>
              <tbody>
                <tr>
                  <td style={styles.tdLabel}>Title</td>
                  <td style={styles.tdValue}>{documentTitle}</td>
                </tr>
                <tr>
                  <td style={styles.tdLabel}>Category</td>
                  <td style={styles.tdValue}>{category}</td>
                </tr>
                <tr>
                  <td style={styles.tdLabel}>Instructions</td>
                  <td style={styles.tdValue}>{description}</td>
                </tr>
              </tbody>
            </table>
            <Button href={`${baseUrl}/portal/documents`} style={styles.button}>Upload document</Button>
            <Text style={styles.small}>Please upload this document at your earliest convenience.</Text>
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
