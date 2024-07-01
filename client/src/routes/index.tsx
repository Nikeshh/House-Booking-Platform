import { RouteObject } from "react-router";
import Home from "../pages/Home";
import Layout from "../layouts/index.tsx";
import AdminLayout from "../layouts/admin.tsx";
import TermsAndConditions from "../pages/TermsAndConditions";
import CookiePolicy from "../pages/CookiePolicy";
import Login from "../pages/Login.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Users from "../pages/Users.tsx";
import Houses from "../pages/Houses.tsx";
import Bookings from "../pages/Bookings.tsx";
import Register from "../pages/Register.tsx";

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
		path: "/admin/login",
		element: <Login />,
	},
	{
		path: "/admin/register",
		element: <Register />,
	},
	{
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{
				path: "",
				element: <Dashboard />,
			},
			{
				path: "users",
				element: <Users />,
			},
			{
				path: "houses",
				element: <Houses />,
			},
			{
				path: "bookings",
				element: <Bookings />,
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