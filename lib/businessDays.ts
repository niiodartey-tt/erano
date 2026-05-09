// SERVER SIDE ONLY — never import in client components

export function calculatePaymentDeadline(start: Date): Date {
  const result = new Date(start);
  let added = 0;

  while (added < 5) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay(); // 0 = Sunday, 6 = Saturday
    if (day !== 0 && day !== 6) added++;
  }

  return result;
}
