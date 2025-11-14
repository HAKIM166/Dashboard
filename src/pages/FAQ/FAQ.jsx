import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  const qa = [
    {
      q: "How do I change the global date range?",
      a: "Use the date range control in the header. The selection immediately updates all widgets and exports. Saved views will keep your last used range."
    },
    {
      q: "What time zone does the dashboard use?",
      a: "By default it follows your profile time zone. You can switch it from the profile/preferences panel; widgets and exports will respect the same zone."
    },
    {
      q: "How are the main KPIs calculated?",
      a: "Each KPI uses a documented formula shown in its tooltip (hover the info icon). Drill into the KPI to see the exact fields and aggregation used."
    },
    {
      q: "Can I drill down to underlying records?",
      a: "Yes. Click any chart bar/point or KPI and choose “View details”. You can add filters there and jump to the source table if permitted."
    },
    {
      q: "How do I save and reuse my filters?",
      a: "After applying filters, click “Save view”. Give it a name and choose visibility (only me / team). Opening that view restores filters and date range."
    },
    {
      q: "How do I share a filtered link with teammates?",
      a: "Use “Share current view”. It copies a link that preserves your filters and date range. Recipients need access permissions to open it."
    },
    {
      q: "How fresh is the data?",
      a: "A freshness badge is shown near the header (e.g., “Updated 18 min ago”). Pipelines run on a schedule; the next run time is shown in the tooltip."
    },
    {
      q: "Can I export charts and tables?",
      a: "Yes. Use the export menu on each widget (CSV/XLSX/PDF) or export the entire dashboard. Exports always include current filters and date range."
    },
    {
      q: "Why does a chart show ‘No data’?",
      a: "Most commonly due to filters removing all results or the selected period having no records. Try widening the date range or clearing filters."
    },
    {
      q: "How can I set up alerts for spikes or drops?",
      a: "Open the widget menu → “Create alert”. Choose a metric, a threshold or anomaly detection, delivery channel (email/Slack), and a schedule."
    },
    {
      q: "Which roles can access this dashboard?",
      a: "Viewers can read and export. Editors can modify widgets and save shared views. Admins can manage permissions and data connections."
    },
    {
      q: "Why are totals different from the sum of segments?",
      a: "Totals may use distinct aggregation (e.g., unique users) while segments sum raw counts, or filters at the total level differ from segment-level ones."
    },
    {
      q: "How can I improve performance with heavy filters?",
      a: "Limit high-cardinality dimensions, reduce date range, prefer indexed fields, and avoid too many simultaneous group-bys in a single widget."
    },
    {
      q: "Where do I change my personal preferences?",
      a: "Open the profile menu → Preferences. There you can set time zone, default landing view, language, and notification settings."
    },
    {
      q: "Can I schedule reports to email/Slack?",
      a: "Yes. Click “Schedule report”, pick a view, frequency, recipients, and format. The report runs with the view’s saved filters and time zone."
    },
    {
      q: "What should I do if a metric looks wrong?",
      a: "Use “Report an issue” from the header. Include a screenshot, the view link, and the expected value. The data team will review the pipeline."
    },
    {
      q: "How do I search for a specific metric or chart?",
      a: "Use the global search box to find widgets, metrics, or saved views by name or field. Search respects your permissions."
    },
    {
      q: "Is there a mobile-friendly layout?",
      a: "Yes. The layout is responsive; cards stack vertically on narrow screens. Some dense tables switch to a compact view with horizontal scroll."
    },
    {
      q: "Why do I get a permissions error on drilldown?",
      a: "You may not have access to the underlying table or fields. Ask an admin to grant access or to publish a summarized view you can open."
    },
    {
      q: "Do dashboards auto-refresh?",
      a: "If enabled by an admin, they refresh at a set interval (e.g., every 5 minutes). You can also click the refresh button to fetch the latest data."
    }
  ];

  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      <style>{`
        .summarySingle {
          display: block;
          width: 100%;
          min-width: 0;
          overflow-wrap: anywhere; 
        }
      `}</style>

      {qa.map((item, idx) => (
        <Accordion key={idx} defaultExpanded={idx === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`q${idx}-content`}
            id={`q${idx}-header`}
          >
            <Typography className="summarySingle" component="span" fontWeight={600}>
              {idx + 1}. {item.q}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">{item.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
