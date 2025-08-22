import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar">
			<div className="container justify-content-end">
				<div className="">
					<Link to="/add-contact">
						<button className="btn btn-success">Add new contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};