import { AppComponentType } from "beyond/core";

const Person: AppComponentType = () => {
  return <h3>person</h3>;
};

Person.getServerSideProps = async () => {
  return {
    props: {
      data: 1,
    },
  };
};

export default Person;
