import { ShieldCheckmarkOutline, EarthOutline, BedOutline } from "react-ionicons";

const Features = () => {
	const featuresList = [
		{
			icon: (
				<BedOutline
					color="#60a5fa"
					style={{ width: 60, height: 60 }}
				/>
			),
			title: "Comfortable Stays",
			description:
				"Enjoy a luxurious and comfortable stay in our well-appointed homes, tailored to meet all your needs for a perfect getaway.",
		},
		{
			icon: (
				<ShieldCheckmarkOutline
					color="#60a5fa"
					style={{ width: 60, height: 60 }}
				/>
			),
			title: "Secure Bookings",
			description:
				"Book with confidence knowing that your transactions are safe and your personal information is protected at all times.",
		},
		{
			icon: (
				<EarthOutline
					color="#60a5fa"
					style={{ width: 60, height: 60 }}
				/>
			),
			title: "Global Reach",
			description:
				"Our platform offers a wide range of properties across the globe, ensuring you find the perfect home no matter where you travel.",
		},
	];
	return (
		<div className="flex w-full py-20 md:px-[200px] px-8 flex-col gap-16 justify-center items-center">
			<div className="flex flex-col w-full items-center">
				<span className="font-semibold text-blue-500">Our Features</span>
				<span className="font-semibold text-slate-700 text-3xl mt-1">
					What We Offer
				</span>
				<p className="max-w-[400px] text-center mt-4">
					Discover the exclusive features that make our platform the best choice for booking your next home away from home.
				</p>
			</div>
			<div className="flex md:flex-row flex-col w-full items-center justify-between md:gap-0 gap-5">
				{featuresList.map((feature) => {
					return (
						<div
							className="bg-white py-5 px-12 flex flex-col items-center justify-center gap-5 rounded-[10px] transition-all duration-300 cursor-pointer hover:scale-[1.05]"
							style={{ boxShadow: "0 0 40px 5px rgb(0 0 0 / 5%)" }}
							key={feature.title}
						>
							{feature.icon}
							<span className="font-semibold text-gray-700 text-[21px]">
								{feature.title}
							</span>
							<span className="max-w-[360px] text-center leading-7">
								{feature.description}
							</span>{" "}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Features;
