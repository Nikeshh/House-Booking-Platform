import { CalendarOutline, PersonOutline } from "react-ionicons";
import postImage from "../../assets/images/01.jpg";
import postImage2 from "../../assets/images/02.jpg";
import postImage3 from "../../assets/images/03.jpg";

const Blog = () => {
	const posts = [
		{
			key: 1,
			image: postImage,
			author: "Amin Najva",
			date: "Nov 15, 2023",
			title: "Top Luxury Villas to Book in 2024",
			description: "Discover the best luxury villas you can book for your next vacation in 2024. From stunning locations to top-notch amenities, find your perfect getaway.",
		},
		{
			key: 2,
			image: postImage2,
			author: "Amin Najva",
			date: "Nov 10, 2023",
			title: "Tips for Booking Your Dream House",
			description: "Booking your dream house can be overwhelming. Here are some tips to make the process easier and ensure you find the perfect place for your stay.",
		},
		{
			key: 3,
			image: postImage3,
			author: "Amin Najva",
			date: "Nov 5, 2023",
			title: "The Benefits of Vacation Rentals",
			description: "Vacation rentals offer a range of benefits over traditional hotels. Learn why more travelers are choosing rental homes for their vacations.",
		},
	];

	return (
		<div className="flex w-full pb-20 md:px-[200px] px-8 flex-col gap-16 justify-center items-center">
			<div className="flex flex-col w-full items-center">
				<span className="font-semibold text-blue-500">Our Blog</span>
				<span className="font-semibold text-slate-700 text-3xl mt-1">Our Latest Posts</span>
				<p className="max-w-[400px] text-center mt-4">
					Stay updated with the latest trends, tips, and insights in the world of luxury house bookings and vacation rentals.
				</p>
			</div>
			<div className="flex w-full items-center justify-center md:flex-row flex-col gap-8">
				{posts.map((post) => {
					return (
						<div
							key={post.key}
							className="bg-white p-[10px] rounded-[10px]"
							style={{ boxShadow: "0 0 40px 5px rgb(0 0 0 / 5%)" }}
						>
							<img
								src={post.image}
								className="w-[400px] h-[270px] rounded-[10px]"
								alt={post.title}
							/>
							<div className="flex w-full items-center gap-10 mt-3 px-4">
								<div className="flex items-center gap-2">
									<PersonOutline color="#60a5fa" />
									<span className="text-slate-900 text-[15.5px]">{post.author}</span>
								</div>
								<div className="flex items-center gap-2">
									<CalendarOutline color="#60a5fa" />
									<span className="text-slate-900 text-[15.5px]">{post.date}</span>
								</div>
							</div>
							<div className="px-4 py-5 text-[20px] font-semibold text-slate-800">
								{post.title}
							</div>
							<div className="px-4 leading-7 text-slate-700 max-w-[400px]">
								{post.description}
							</div>
							<div className="font-medium text-blue-600 px-4 py-3 cursor-pointer">
								Read More
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Blog;
