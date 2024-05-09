// react router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages import
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import ProfilePage from "./pages/profilePage/ProfilePage";

const App = () => {
	return (
		<div className='app'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LoginPage />}></Route>
					<Route path='/home' element={<HomePage />}></Route>
					<Route
						path='/profile/:userId'
						element={<ProfilePage />}
					></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
export default App;
