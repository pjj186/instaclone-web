import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { isLoggedInVar, logUserOut } from '../apollo';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

const useUser = () => {
  const histroy = useHistory();
  const hasToken = useReactiveVar(isLoggedInVar);

  const { data, error, loading } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  console.log(data);

  useEffect(() => {
    if (data?.me === null) {
      logUserOut(histroy);
    }
  }, [data, loading]);

  return;
};

export default useUser;
