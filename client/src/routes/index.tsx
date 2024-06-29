import { RouteObject } from "react-router";
import Home from "../pages/Home";
import Admin from "../Admin";
import Layout from "../layout";
import TermsAndConditions from "../pages/TermsAndConditions";
import CookiePolicy from "../pages/CookiePolicy";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Users from "../components/Users";
import Houses from "../components/Houses";
import Bookings from "../components/Bookings";
import Register from "../components/Register";

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
		path: "/admin",
		element: <Admin />,
	},
	{
		path: "/admin/login",
		element: <Login />,
	},
	{
		path: "/admin/register",
		element: <Register />,
	},
	{
		path: "/admin/dashboard",
		element: <Dashboard />,
	},
	{
		path: "/admin/users",
		element: <Users />,
	},
	{
		path: "/admin/houses",
		element: <Houses />,
	},
	{
		path: "/admin/bookings",
		element: <Bookings />,
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