import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { isLoggedInVar, logUserOut } from '../apollo';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ME_QUERY = gql`
  query me {
    me {
      id
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

  useEffect(() => {
    if (data?.me === null) {
      logUserOut(histroy);
    }
  }, [data, loading]);

  return { data };
};

export default useUser;
