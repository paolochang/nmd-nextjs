import Seo from "../../components/Seo";

export default function MovieDetail({ params }) {
  const [title, id] = params || [];
  return (
    <div>
      <Seo title={params} />
      <h4>{title}</h4>
    </div>
  );
}

export async function getServerSideProps({ params: { params } }) {
  return { props: { params } };
}
