import {
  CreateSpiritusCTA,
  SearchSpiritusCTA,
} from "../components/stories/CTAs";
import { TopStory } from "../components/stories/TopStory";
import { Discover } from "../components/stories/Discover";
import Layout from "../components/layout/Layout";
import { PaginatePopularSpiritus } from "../service/http/spiritus";

export default function Home({ top, popular }) {
  return (
    <Layout>
      <CreateSpiritusCTA />
      <TopStory id={top.id} name={top.name} surname={top.surname} images={top.images} />
      <Discover popular={popular} />
      <SearchSpiritusCTA />
    </Layout>
  );
}

// fetch top 10 popular spirituses
export async function getServerSideProps() {
  const popular = await PaginatePopularSpiritus(0, 10);
  return {
    props: {
      top: popular.data.content[0],
      popular: popular.data.content.slice(1, 9),
    },
  };
}
