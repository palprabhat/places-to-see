import { GetServerSideProps, NextApiRequest } from "next";
import FirebaseAuth from "src/components/FirebaseAuth";
import { loadIdToken } from "src/auth/firebaseAdmin";
import Layout from "src/components/Layout";

const Auth = () => {
  return (
    <Layout>
      <div className="mt-16 flex justify-center">
        <FirebaseAuth />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (uid) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};

Auth.title = "Auth | Places to see";

export default Auth;
