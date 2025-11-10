import { useGetSingleUserCourseQuery } from "@/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import Loader from "../Common/Loader/Loader";
import PageHead from "../Common/PageHead";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";

const CourseDetailsPage = ({ id }: any) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetSingleUserCourseQuery(id);

  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    if (config?.publishablekey) {
      const publishablekey = config.publishablekey;
      const loadStripeData = loadStripe(publishablekey);
      setStripePromise(loadStripeData);
    }
  }, [config]);

  useEffect(() => {
    if (data && data.course && data.course.price > 0) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [data, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <PageHead
            title={data?.course?.name + " - Ilmo"}
            description={
              "ELearning is an interactive E-Learning platform where all students can learn and grow together"
            }
            keywords={data?.course?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            route={route}
            setRoute={setRoute}
          />
          <CourseDetails
            data={data?.course}
            stripePromise={stripePromise}
            clientSecret={clientSecret}
            setRoute={setRoute}
            setOpen={setOpen}
          />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
