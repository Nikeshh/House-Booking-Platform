import { CheckmarkCircleOutline } from "react-ionicons";
import mask from "../../assets/images/mask.png";

const About = () => {
	return (
		<div className="w-full md:px-[200px] px-8 flex md:flex-row flex-col items-center justify-between py-10 md:gap-0 gap-16">
			<div
				className="md:w-[700px] md:h-[700px] w-[350px] h-[350px] bg-no-repeat bg-cover relative plane-mask"
				style={{ backgroundImage: `url(${mask})` }}
			/>
			<div className="flex flex-col md:w-[48%] w-full md:px-0 px-8">
				<span className="text-[15px] text-blue-600 font-semibold">ABOUT US</span>
				<span className="text-[30px] font-medium text-gray-700 mt-1">
					We Bring You the Ultimate <br /> Comfort and Luxury
				</span>
				<p className="max-w-[650px] text-gray-600 leading-7 mt-5">
					At our house booking platform, we prioritize your comfort and satisfaction. Our
					handpicked selection of luxurious homes ensures you have a memorable stay, whether
					you're looking for a cozy retreat or a grand villa.
				</p>
				<div className="flex flex-col gap-3 mt-5">
					<div className="flex items-center gap-3">
						<CheckmarkCircleOutline color="#60a5fa" />
						<span>Handpicked, premium properties for a luxurious stay.</span>
					</div>
					<div className="flex items-center gap-3">
						<CheckmarkCircleOutline color="#60a5fa" />
						<span>Secure and easy booking process.</span>
					</div>
					<div className="flex items-center gap-3">
						<CheckmarkCircleOutline color="#60a5fa" />
						<span>Dedicated customer support for your convenience.</span>
					</div>
				</div>
				<button className="bg-blue-400 px-6 py-3 text-white font-semibold rounded-full w-[200px] mt-12 shadow-md">
					Discover More
				</button>
			</div>
		</div>
	);
};

export default About;
