import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("events", "routes/events.tsx"),
  route("about", "routes/about-us.tsx"),
  route("workshop/:workshopId", "routes/workshop-details.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("dashboard/create-event", "routes/create-event.tsx"),
] satisfies RouteConfig;
