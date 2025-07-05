import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("events", "routes/events.tsx"),
  route("about", "routes/about-us.tsx"),
  route("workshop/:workshopId", "routes/workshop-details.tsx"),
] satisfies RouteConfig;
