export const gtagEvent = ({ action, category, label, value }) => {
  if (process.env.NEXT_PUBLIC_GTAG_ID) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};


export const gtagPageView = ({ title, location }) => {
  if (process.env.NEXT_PUBLIC_GTAG_ID) {
    gtag("event", "page_view", {
      page_title: title,
      page_location: location,
      send_to: process.env.NEXT_PUBLIC_GTAG_ID,
    });
  }
};
