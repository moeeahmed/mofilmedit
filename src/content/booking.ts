// Options for the /book enquiry flow.

export const BOOKING_LOCATIONS = ["Birmingham", "London", "Elsewhere in the UK"];

export const BOOKING_GOALS = [
  "Social media content",
  "Paid ads",
  "Website or brand film",
  "Event coverage",
  "Property listing",
  "Something else",
];

// Optional: paste your Cal.com or Calendly booking link into .env to show a
// "pick a call time" link on the confirmation screen.
export const BOOKING_CALENDAR_URL =
  process.env.NEXT_PUBLIC_BOOKING_CALENDAR_URL || "";
