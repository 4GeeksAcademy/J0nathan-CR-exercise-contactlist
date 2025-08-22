import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { Contact } from "../components/Contact.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<Contact />
	);
}; 