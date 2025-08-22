import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { Contacts } from "../components/Contacts.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<Contacts />
	);
}; 