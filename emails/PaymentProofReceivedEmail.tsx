import { Html, Head, Body, Container, Section, Text, Button, Preview, Link } from "@react-email/components";
import { styles } from "./utils";

export interface PaymentProofReceivedEmailProps {
  clientName: string;
  businessName: string;
  transactionReference: string;
  amountPaid: string;
  adminUrl: string;
}

export const subject = (businessName: string) => `Payment proof uploaded — ${businessName}`;

export function PaymentProofReceivedEmail({
  clientName, businessName, transactionReference, amountPaid, adminUrl,
}: PaymentProofReceivedEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Payment proof uploaded — {businessName}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.headerText}>Erano Consulting</Text>
          </Section>
          <Section style={styles.section}>
            <Text style={styles.h1}>A client has uploaded payment proof</Text>
            <table style={styles.table}>
              <tbody>
                <tr>
                  <td style={styles.tdLabel}>Client name</td>
                  <td style={styles.tdValue}>{clientName}</td>
                </tr>
                <tr>
                  <td style={styles.tdLabel}>Business</td>
                  <td style={styles.tdValue}>{businessName}</td>
                </tr>
                <tr>
                  <td style={styles.tdLabel}>Transaction ref</td>
                  <td style={styles.tdValue}>{transactionReference}</td>
                </tr>
                <tr>
                  <td style={styles.tdLabel}>Amount</td>
                  <td style={styles.tdValue}>{amountPaid}</td>
                </tr>
              </tbody>
            </table>
            <Button href={adminUrl} style={styles.button}>Review payment</Button>
            <Text style={styles.small}>
              Log in to the admin portal to confirm or reject this payment.
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
