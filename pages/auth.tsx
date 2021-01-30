import { GetServerSideProps } from "next";
import FirebaseAuth from "../src/components/FirebaseAuth";
import { loadIdToken } from "../src/auth/firebaseAdmin";

const Auth = () => {
  return (
    <div className="mt-16 flex justify-center">
      <FirebaseAuth />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req.cookies?.token);

  if (uid) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};

export default Auth;
