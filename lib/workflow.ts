import { Client as WorkflowClient } from "@upstash/workflow";
// Commented out QStash and Resend imports
// import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/config";
// Import our new email service
import { sendEmail as sendEmailDirect } from "@/lib/email";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

// Commented out QStash client
// const qstashClient = new QStashClient({
//   token: config.env.upstash.qstashToken,
// });

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  // Commented out QStash + Resend implementation
  // await qstashClient.publishJSON({
  //   api: {
  //     name: "email",
  //     provider: resend({ token: config.env.resendToken }),
  //   },
  //   body: {
  //     //from: "JS Mastery <contact@adrianjsmastery.com>",
  //     from: "JS Mastery <hello.shreyaupadhyay.in>",
  //     to: [email],
  //     subject,
  //     html: message,
  //   },
  // });

  // Using Nodemailer directly instead
  return await sendEmailDirect({
    email,
    subject,
    message,
  });
};