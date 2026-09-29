import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Posts from "../components/Posts";
import Stories from "../components/Stories";
import Share from "../components/Share";

function HomePage(){
    return(
        <div>
            <Stories/>
            <Share/>
            <Posts/>
        </div>
    )
}

export default HomePage;