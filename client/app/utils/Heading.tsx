import Head from "next/head";

interface HeadingProps {
  title: string;
  description: string;
  keywords: string;
}

const Heading = ({ title, description, keywords }: HeadingProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>
  );
};

export default Heading;
