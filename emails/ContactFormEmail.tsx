import { Html, Head, Body, Container, Section, Text, Preview, Link } from "@react-email/components";
import { styles } from "./utils";

export interface ContactFormEmailProps {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  service?: string;
  message: string;
}

export const subject = (fullName: string) => `New enquiry — ${fullName}`;

export function ContactFormEmail({ fullName, email, phone, company, industry, service, message }: ContactFormEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New enquiry from {fullName}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.headerText}>Erano Consulting</Text>
          </Section>
          <Section style={styles.section}>
            <Text style={styles.h1}>New enquiry from the website</Text>
            <table style={styles.table}>
              <tbody>
                <tr>
                  <td style={styles.tdLabel}>Name</td>
                  <td style={styles.tdValue}>{fullName}</td>
                </tr>
                <tr>
                  <td style={styles.tdLabel}>Email</td>
                  <td style={styles.tdValue}>{email}</td>
                </tr>
                {phone && (
                  <tr>
                    <td style={styles.tdLabel}>Phone</td>
                    <td style={styles.tdValue}>{phone}</td>
                  </tr>
                )}
                {company && (
                  <tr>
                    <td style={styles.tdLabel}>Company</td>
                    <td style={styles.tdValue}>{company}</td>
                  </tr>
                )}
                {industry && (
                  <tr>
                    <td style={styles.tdLabel}>Industry</td>
                    <td style={styles.tdValue}>{industry}</td>
                  </tr>
                )}
                {service && (
                  <tr>
                    <td style={styles.tdLabel}>Service</td>
                    <td style={styles.tdValue}>{service}</td>
                  </tr>
                )}
                <tr>
                  <td style={styles.tdLabel}>Message</td>
                  <td style={styles.tdValue}>{message}</td>
                </tr>
              </tbody>
            </table>
            <Text style={styles.small}>Reply directly to this email to respond to the enquirer.</Text>
          </Section>
          <Section style={styles.footer}>
            <Text style={styles.footerText}>© 2026 Erano Consulting · Accra, Ghana</Text>
            <Text style={styles.footerText}>
              <Link href="https://eranoconsulting.com/legal/privacy" style={styles.footerLink}>Privacy Policy</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
