import { Helmet } from "react-helmet-async";

interface IPageTitleProps {
  title: string;
}

const PageTitle = (props: IPageTitleProps) => {
  return (
    <Helmet>
      <title>{props.title} | Instaclone</title>
    </Helmet>
  );
};

export default PageTitle;
