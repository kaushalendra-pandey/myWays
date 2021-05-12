import {BrowserRouter,Route,Switch} from "react-router-dom"
import BlogCreate from "./components/BlogCreate/BlogCreate"
import BlogUpdate from "./components/BlogUpdate/BlogUpdate"
import BlogView from "./components/BlogView/BlogView"
import ErrorPage from "./components/ErrorPage/ErrorPage"
import Home from "./components/Home/Home"
import Signin from "./components/Signin/Signin"
import Signup from "./components/Signup/Signup"
import AdminRoutes from "./utilities/AdminRoutes"


const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/blog/:blogId" component={BlogView}/>
            <AdminRoutes exact path="/create" component={BlogCreate}/>
            <AdminRoutes exact path="/update/:blogId" component={BlogUpdate}/>
            <Route path="*" component={ErrorPage}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes