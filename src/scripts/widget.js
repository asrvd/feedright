import React from "react";
import ReactDOM from "react-dom";
import FeedbackWidget from "../components/Widget";

// get widget id and placement from the script tag
const payload = document.querySelector("[data-widget-id]");
const { widgetId, placement } = payload.dataset;

if (!widgetId) {
  console.error("Widget ID is required");
}

console.log("widgetId", widgetId);

const feedbackWidgetContainer = document.createElement("div");
document.body.appendChild(feedbackWidgetContainer);
ReactDOM.render(
  <FeedbackWidget widgetID={widgetId} />,
  feedbackWidgetContainer
);
