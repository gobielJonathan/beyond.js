import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { styButton } from "./style";
import style from "./index.css";

export default function Home({ data = [] }) {
  const history = useHistory();

  return (
    <>
      <Helmet>
        <title>home</title>
      </Helmet>
      <h1 className={style.title}>testing from home</h1>
      {data?.map((d, idx) => (
        <p key={idx}>{d}</p>
      ))}
      <button className={styButton} onClick={() => history.push("/person")}>
        redirect to person
      </button>
    </>
  );
}

Home.getServerSideProps = async (ctx) => {
  const data = await Promise.resolve([1, 2, 3]);
  return {
    props: {
      data,
    },
  };
};
