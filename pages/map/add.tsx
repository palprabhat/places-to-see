import React from "react";
import { GetServerSideProps } from "next";
import { loadIdToken } from "../../src/auth/firebaseAdmin";
import { Form } from "../../src/components/ui/Form";
import { InputField } from "src/components/ui";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Please provide the name"),
});

const Add = () => {
  return (
    <Form
      onSubmit={() => console.log("submitted")}
      validationSchema={validationSchema}
      className="mx-auto flex flex-col items-center"
      style={{ maxWidth: "480px" }}
    >
      <div>Add a new place</div>
      <InputField name="name" />
      <button>Submit</button>
    </Form>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req.cookies?.token);

  if (!uid) {
    res.setHeader("location", "/auth");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};

export default Add;
