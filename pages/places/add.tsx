import { GetServerSideProps, NextApiRequest } from "next";
import { useRouter } from "next/router";
import { loadIdToken } from "src/auth/firebaseAdmin";
import PlaceForm from "src/components/PlaceForm";

const Add = () => {
  const router = useRouter();
  return (
    <div
      className="mx-auto overflow-y-scroll p-8"
      style={{ maxWidth: "780px", height: "calc(100vh - 75px)" }}
    >
      <PlaceForm
        onSubmitted={(id) => {
          router.push(`/places/${id}`);
        }}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (!uid) {
    res.setHeader("location", "/auth");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};

Add.title = "Add a new place | Places to see";
Add.withMapView = true;

export default Add;
