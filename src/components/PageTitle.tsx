import { Helmet } from "react-helmet-async";

interface IPageTitleProps {
  title: string;
}

const PageTitle = (props: IPageTitleProps) => {
  return <Helmet>{props.title} | Instaclone</Helmet>;
};

export default PageTitle;
