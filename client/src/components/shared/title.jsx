/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";
const Title = ({
  title = "Chat App",
  description = "This is Chat App called NexChat",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
