import { RouteObject } from "react-router";
import Home from "../pages/Home";
import Layout from "../layout";
import TermsAndConditions from "../pages/TermsAndConditions";
import CookiePolicy from "../pages/CookiePolicy";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <Home />,
			},
		],
	},
	{
		path: "/terms-and-conditions",
		element: <TermsAndConditions />,
	},
	{
		path: "/cookie-policy",
		element: <CookiePolicy />,
	},
	{
		path: "*",
		element: <div>Not Found</div>,
	},
];

export default routes;