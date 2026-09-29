import Stories from "../components/Stories";
import Share from "../components/Share";
import Posts from "../components/Posts";

function HomePage() {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
}

export default HomePage;
